"use client";

import { useState } from "react";

export default function CopyEmailsButton({ emails }: { emails: string[] }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  const label =
    status === "copied"
      ? "已複製 / Copied!"
      : status === "error"
        ? "複製失敗 / Copy failed"
        : "複製所有 Email / Copy Emails";

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={emails.length === 0}
      className="border border-kor-gold text-kor-gold text-xs tracking-[0.15em] uppercase px-4 py-2 transition-colors hover:bg-kor-gold hover:text-black disabled:opacity-50"
    >
      {label}
    </button>
  );
}
