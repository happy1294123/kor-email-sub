import { listSubscribers } from "@/lib/db";
import CopyEmailsButton from "./copy-emails-button";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const subscribers = await listSubscribers();

  return (
    <main className="flex-1 px-6 py-12 sm:py-16 max-w-4xl mx-auto w-full flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-xl sm:text-2xl tracking-[0.15em] uppercase text-kor-gold">
            KOR Taipei — 訂閱者清單 / Subscribers
          </h1>
          <p className="text-kor-light-gray text-sm mt-1">
            共 {subscribers.length} 位訂閱者 / {subscribers.length} total subscribers
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <CopyEmailsButton emails={subscribers.map((s) => s.email)} />
          <a
            href="/api/admin/export"
            className="border border-kor-gold text-kor-gold text-xs tracking-[0.15em] uppercase px-4 py-2 transition-colors hover:bg-kor-gold hover:text-black"
          >
            匯出 CSV / Export CSV
          </a>
          <LogoutButton />
        </div>
      </div>

      <div className="border border-kor-light-gray/20 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-kor-light-gray/20 text-kor-light-gray uppercase text-xs tracking-wider">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">訂閱時間 / Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-kor-dark-gray">
                  尚無訂閱者 / No subscribers yet
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-kor-light-gray/10">
                  <td className="px-4 py-3 text-white">{subscriber.email}</td>
                  <td className="px-4 py-3 text-kor-light-gray">{subscriber.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
