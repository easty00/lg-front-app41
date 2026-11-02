import { Suspense } from "react";
import type { Metadata } from "next";
import AuthShell from "@/app/component/providers/AuthShell";
import { Geist, Geist_Mono, Noto_Sans_KR, Do_Hyeon } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 본문용 폰트
const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

// 제목용 폰트
const doHyeon = Do_Hyeon({
  variable: "--font-do-hyeon",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "lg-front41",
  description: "lgcns7thStudy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${doHyeon.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <AuthShell>{children}</AuthShell>
        </Suspense>
      </body>
    </html>
  );
}
