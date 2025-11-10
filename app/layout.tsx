import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "응급실 병상 찾기 - 실시간 응급의료기관 정보",
  description: "전국 응급의료기관의 실시간 병상 정보를 한눈에 확인하세요. 국립중앙의료원 데이터 기반 응급실 가용 병상 현황 서비스입니다.",
  keywords: "응급실, 병상, 병원, 응급의료, 실시간, 가용병상, 응급실현황",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
