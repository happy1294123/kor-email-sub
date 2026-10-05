const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const LOGO_PATH = "/logo/kor_logo.png";

function buildHtml(logoUrl: string): string {
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<title>KOR Taipei</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#000000;">
        <tr>
          <td align="center" style="padding:0 0 8px;">
            <img src="${logoUrl}" alt="KOR" width="200" style="display:block;width:200px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px;">
            <div style="height:1px;background:#b2a477;line-height:1px;font-size:1px;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:36px 24px 8px;font-family:'Helvetica Neue',Arial,'PingFang TC','Noto Sans TC','Microsoft JhengHei',sans-serif;color:#ffffff;">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.4;font-weight:500;letter-spacing:1px;color:#b2a477;">感謝您的訂閱</h1>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#ffffff;">
              您已成功訂閱 KOR Taipei 的最新消息。<br />
              我們將第一時間通知您最新活動、消息與專屬邀請。
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 24px;">
            <div style="height:1px;background:#58595b;line-height:1px;font-size:1px;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 24px 8px;font-family:'Helvetica Neue',Arial,sans-serif;color:#ffffff;">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.4;font-weight:500;letter-spacing:1px;color:#b2a477;">Thank You for Subscribing</h1>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#ffffff;">
              You&rsquo;re now subscribed to KOR Taipei updates.<br />
              You&rsquo;ll be the first to know about our latest events, news, and exclusive invitations.
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:40px 24px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.6;color:#a7a9ac;">
            KOR Taipei<br />
            此信件為系統自動發送，請勿直接回覆。<br />
            This is an automated message. Please do not reply.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const TEXT = `感謝您的訂閱

您已成功訂閱 KOR Taipei 的最新消息。我們將第一時間通知您最新活動、消息與專屬邀請。

---

Thank You for Subscribing

You're now subscribed to KOR Taipei updates. You'll be the first to know about our latest events, news, and exclusive invitations.

KOR Taipei`;

/**
 * Sends the bilingual welcome email via Brevo. Never throws: a failed email
 * must not fail the subscription itself.
 */
export async function sendWelcomeEmail(to: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    console.error(
      "Welcome email skipped: BREVO_API_KEY, BREVO_SENDER_EMAIL and NEXT_PUBLIC_SITE_URL must be set",
    );
    return false;
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || "KOR Taipei", email: senderEmail },
        to: [{ email: to }],
        subject: "感謝您的訂閱 | Thank you for subscribing to KOR Taipei",
        htmlContent: buildHtml(`https://qrcode-system-img.kor-asia.com/logo/kor_logo.png`),
        textContent: TEXT,
      }),
    });

    if (!response.ok) {
      console.error("Brevo send failed:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Brevo send error:", error);
    return false;
  }
}
