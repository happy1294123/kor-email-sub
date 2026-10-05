import type { Metadata } from "next";
import { Jost, Noto_Sans_TC, Questrial } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "KOR Taipei",
  description:
    "搶先收到 KOR Taipei 最新消息、活動與專屬邀請。Be the first to know about KOR Taipei's latest events, news, and exclusive invitations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${jost.variable} ${questrial.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white">
        {children}
      </body>
    </html>
  );
}
