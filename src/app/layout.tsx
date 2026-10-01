import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PracticeNotice } from "@/components/PracticeNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "온결 공방 | 한국 전통 공예 (실습용 프로토타입)",
  description: "한국 전통 공예품 전시·주문 문의와 공방 클래스 신청을 소개하는 실습용 프론트엔드 프로토타입입니다.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          본문 바로가기
        </a>
        <Header />
        <PracticeNotice variant="banner" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
