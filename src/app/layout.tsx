import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const itc = localFont({
  variable: "--font-itc",
  src: [
    { path: "../font-family/ITC Avant Garde Gothic CE Book.otf", weight: "400" },
    { path: "../font-family/ITC Avant Garde Gothic Medium.otf", weight: "500" },
    { path: "../font-family/ITC Avant Garde Gothic Bold.otf", weight: "700" },
  ],
});

const proximaNova = localFont({
  variable: "--font-proxima-nova",
  src: [
    { path: "../font-family/ProximaNova-Light.otf", weight: "300" },
    { path: "../font-family/ProximaNova-Regular.otf", weight: "400" },
    { path: "../font-family/ProximaNova-Bold.otf", weight: "700" },
  ],
});

// Subsetted copies of NotoSansCJKtc (the full OTFs are ~15MB each); regenerate
// with pyftsubset if new Chinese characters are added.
const notoSans = localFont({
  variable: "--font-noto-sans",
  src: [
    { path: "../font-family/web/NotoSansCJKtc-Light.woff", weight: "300" },
    { path: "../font-family/web/NotoSansCJKtc-Medium.woff", weight: "500" },
    { path: "../font-family/web/NotoSansCJKtc-Bold.woff", weight: "700" },
  ],
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
      className={`${itc.variable} ${proximaNova.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white">
        {children}
      </body>
    </html>
  );
}
