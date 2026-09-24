import { NextResponse } from "next/server";
import { writeClient } from "../../../sanity/lib/writeClient";
import { checkRateLimit, getClientIp } from "../_utils/rateLimit";
import { verifyTurnstileToken } from "../_utils/turnstile";

export async function POST(request: Request) {
  try {
    const { email, productName, company, turnstileToken } = await request.json();

    // Honeypot: si un bot rellena este campo oculto, respondemos "ok" sin guardar nada.
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);

    const validCaptcha = await verifyTurnstileToken(turnstileToken, ip);
    if (!validCaptcha) {
      return NextResponse.json({ error: "Failed captcha verification" }, { status: 400 });
    }

    const { allowed } = await checkRateLimit(`shop-waitlist:${ip}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await writeClient.create({
      _type: "shopWaitlistSubscriber",
      email,
      productName: typeof productName === "string" ? productName : undefined,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
