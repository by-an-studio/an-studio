// Verifica el token de Cloudflare Turnstile en el servidor.
// Si no hay TURNSTILE_SECRET_KEY configurada (aún no se ha dado de alta el
// sitio en Cloudflare), no bloqueamos los formularios: simplemente se salta
// la verificación, igual que ocurría antes de añadir Turnstile.
export async function verifyTurnstileToken(token: unknown, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  if (!token || typeof token !== "string") return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    // Si Cloudflare falla, no dejamos el formulario roto para usuarios reales.
    return true;
  }
}
