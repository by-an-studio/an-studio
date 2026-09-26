import { Resend } from "resend";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "../_utils/rateLimit";
import { verifyTurnstileToken } from "../_utils/turnstile";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Honeypot: si un bot rellena este campo oculto, respondemos "ok" sin enviar nada.
    if (data.company) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);

    const validCaptcha = await verifyTurnstileToken(data.turnstileToken, ip);
    if (!validCaptcha) {
      return NextResponse.json({ error: "Failed captcha verification" }, { status: 400 });
    }

    const { allowed } = await checkRateLimit(`client-application:${ip}`, 4, 30 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      companyName,
      projectBrief,
      projectType,
      jobPosition,
      website,
      website2,
      budget,
      budgetReady,
      commit,
    } = data;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !country ||
      !companyName ||
      !projectBrief ||
      !projectType ||
      !jobPosition ||
      !budget ||
      !budgetReady ||
      commit !== "yes"
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "An Studio Applications <onboarding@resend.dev>",
      to: "donthillhere@gmail.com",
      replyTo: email,
      subject: `New Client Application — ${companyName}`,
      text: `First name: ${firstName}
Last name: ${lastName}
Email: ${email}
Phone: ${phone}
Country: ${country}
Company name: ${companyName}
Project brief: ${projectBrief}
Project type: ${projectType}
Job position: ${jobPosition}
Website: ${website || "-"}
Website (2): ${website2 || "-"}
Budget: ${budget}
Investment range confirmation: ${budgetReady}
Commit: ${commit}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
