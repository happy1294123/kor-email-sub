"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/kortaipei-admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="border border-kor-light-gray/40 text-kor-light-gray text-xs tracking-[0.15em] uppercase px-4 py-2 transition-colors hover:border-kor-gold hover:text-kor-gold disabled:opacity-50"
    >
      {loading ? "登出中... / Signing out..." : "登出 / Sign Out"}
    </button>
  );
}
