import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/data/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "가온시스템 | 계측기 공급 · 기술지원", template: "%s | 가온시스템" },
  description: "가온시스템의 계측기 제품정보와 기술자료를 확인하세요. YOKOGAWA GP10/GP20 디지털 레코더와 제품·검교정 상담을 안내합니다.",
  openGraph: { type: "website", locale: "ko_KR", siteName: "가온시스템", title: "가온시스템 | 계측기 공급 · 기술지원", description: "측정의 시작부터, 가온시스템. 계측기 제품정보와 상담 안내.", images: [{ url: "/images/products/gp-series.jpg", width: 850, height: 558, alt: "YOKOGAWA GP10/GP20 디지털 레코더" }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko" data-scroll-behavior="smooth">
    <body>
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </body>
  </html>;
}
