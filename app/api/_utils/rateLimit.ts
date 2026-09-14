import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// En memoria: solo sirve como fallback para desarrollo local o si no hay
// credenciales de Upstash configuradas. En Vercel (serverless) cada
// invocación puede caer en una instancia distinta, así que este Map no es
// fiable en producción — de ahí el uso de Upstash Redis cuando está disponible.
type Entry = { count: number; resetAt: number };
const memoryHits = new Map<string, Entry>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = memoryHits.get(key);

  if (!entry || now > entry.resetAt) {
    memoryHits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return { allowed: false };
  }

  entry.count += 1;
  return { allowed: true };
}

const hasUpstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Un limitador de Upstash por cada combinación (límite, ventana) que usemos,
// para no crear uno nuevo en cada petición.
const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number) {
  const cacheKey = `${limit}:${windowMs}`;
  let limiter = upstashLimiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      analytics: false,
    });
    upstashLimiters.set(cacheKey, limiter);
  }
  return limiter;
}

export async function checkRateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  if (redis) {
    try {
      const { success } = await getUpstashLimiter(limit, windowMs).limit(key);
      return { allowed: success };
    } catch (err) {
      // Si Upstash falla (red, credenciales, etc.) no bloqueamos el formulario:
      // hacemos fallback silencioso al límite en memoria.
      console.error("Upstash rate limit error, falling back to in-memory:", err);
      return memoryRateLimit(key, limit, windowMs);
    }
  }
  return memoryRateLimit(key, limit, windowMs);
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
