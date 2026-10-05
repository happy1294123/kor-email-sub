import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const rawEmail = (body as { email?: unknown } | null)?.email;
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "請輸入有效的 Email 地址 / Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const result = await addSubscriber(email);
    if (result === "exists") {
      return NextResponse.json({
        ok: true,
        message: "此 Email 已經訂閱過了，謝謝！\nThis email is already subscribed. Thank you!",
      });
    }
    await sendWelcomeEmail(email);
    return NextResponse.json({
      ok: true,
      message: "訂閱成功，感謝您的加入！\nSubscribed successfully — thank you for joining!",
    });
  } catch (error) {
    console.error("Failed to add subscriber:", error);
    return NextResponse.json(
      { error: "系統發生錯誤，請稍後再試。\nSomething went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
