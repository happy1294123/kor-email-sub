import { NextResponse } from "next/server";
import { listSubscribers } from "@/lib/db";

function toCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const subscribers = await listSubscribers();
  const header = "email,subscribed_at";
  const rows = subscribers.map(
    (s) => `${toCsvField(s.email)},${toCsvField(s.created_at)}`,
  );
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kor-taipei-subscribers.csv"`,
    },
  });
}
