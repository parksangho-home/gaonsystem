import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { InquiryCTA } from "@/components/inquiry-cta";
import { Arrow } from "@/components/icons";
import { products } from "@/data/products";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const product = products.find((item) => item.featured)!;
  return <>
    <section className="home-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">PRECISION IN EVERY MEASUREMENT</p>
          <h1>정확한 측정,<br />더 나은 가능성.</h1>
          <p className="hero-description">계측기 선택에서 기술지원까지.<br />가온시스템이 현장에 필요한 측정 솔루션을 함께합니다.</p>
          <div className="button-row">
            <Link className="button primary" href="/products">제품 살펴보기<Arrow />
            </Link>
            <Link className="button text" href="/contact">상담 및 견적 문의<Arrow />
            </Link>
          </div>
          <div className="hero-footnote">
            <span />계측기 공급 · 기술지원 · KOLAS 검교정 상담</div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-label">
            <span>PRODUCT SPOTLIGHT</span>
            <span>YOKOGAWA</span>
          </div>
          <Link href={`/products/${product.slug}`} aria-label="GP10/GP20 제품 상세 보기">
            <Image src={product.image} alt="YOKOGAWA GP10과 GP20 터치스크린 디지털 레코더" width={850} height={558} sizes="(max-width: 900px) 90vw, 52vw" priority />
          </Link>
          <div className="hero-product-label">
            <div>
              <span>SMARTDAC+ / DIGITAL RECORDER</span>
              <h2>GP10 / GP20</h2>
            </div>
            <Link href={`/products/${product.slug}`} className="round-link" aria-label="GP10/GP20 자세히 보기">
              <Arrow diagonal />
            </Link>
          </div>
        </div>
      </div>
    </section>
    <div className="brand-strip">
      <div className="container brand-strip-inner">
        <span>측정 현장을 연결하는 파트너</span>
        <div>
          <Link href="/products?brand=YOKOGAWA">YOKOGAWA</Link>
          <Link href="/products?brand=GRAPHTEC">GRAPHTEC</Link>
        </div>
        <span className="brand-strip-note">계측기 · 기술지원 · 제품 상담</span>
      </div>
    </div>
    <section className="section container" id="categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PRODUCT CATEGORIES</p>
          <h2>어떤 측정이 필요하신가요?</h2>
          <p>제품군에서 시작해, 현장에 맞는 장비를 찾아보세요.</p>
        </div>
        <Link className="text-link" href="/products">전체 제품 탐색<Arrow />
        </Link>
      </div>
      <CategoryGrid />
    </section>
    <section className="feature-section">
      <div className="container feature-grid">
        <div className="feature-image">
          <span className="small-label">YOKOGAWA · SMARTDAC+</span>
          <Image src="/images/products/gp10-portable.jpg" alt="손잡이를 이용해 이동할 수 있는 YOKOGAWA GP10 레코더" width={850} height={808} sizes="(max-width: 900px) 90vw, 40vw" />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">MEASUREMENT, MADE CLEAR</p>
          <h2>현장의 신호를<br />명확한 데이터로.</h2>
          <p className="feature-model">GP10 / GP20 디지털 레코더</p>
          <p>터치스크린으로 측정의 흐름을 확인하고,<br className="desktop-break" /> 필요한 입력 모듈로 나만의 측정 환경을 구성하세요.</p>
          <div className="feature-facts">
            <div>
              <strong>30<span>채널</span>
              </strong>
              <span>GP10 본체 최대 입력</span>
            </div>
            <div>
              <strong>100<span>채널</span>
              </strong>
              <span>GP20 본체 최대 입력</span>
            </div>
          </div>
          <p className="fine-print">아날로그 입력 기준. 장착 모듈 구성에 따라 달라집니다.</p>
          <Link className="button primary" href="/products/gp10-gp20">제품 상세 보기<Arrow />
          </Link>
        </div>
      </div>
    </section>
    <section className="section container about-section" id="about">
      <div>
        <p className="eyebrow">ABOUT GAON SYSTEM</p>
        <h2>측정의 시작부터,<br />가온시스템.</h2>
      </div>
      <div className="about-body">
        <p className="large-copy">장비를 넘어, 현장에 알맞은<br />솔루션을 생각합니다.</p>
        <p>가온시스템은 국내외 계측장비에 대한 경험과 네트워크를 바탕으로 계측기 공급과 기술지원, A/S를 제공합니다. 제품 선택부터 사용 중 궁금한 점까지 편안하게 상담해 주세요.</p>
        <Link className="text-link" href="/contact">가온시스템에 문의하기<Arrow />
        </Link>
      </div>
    </section>
    <section className="support-section" id="support">
      <div className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TECHNICAL SUPPORT</p>
            <h2>필요한 정보를, 더 가까이.</h2>
          </div>
          <p>제품을 알아보는 순간부터 사용 이후까지.</p>
        </div>
        <div className="support-grid">
          <Link href="/products/gp10-gp20#documents">
            <span className="support-number">01 / DOCUMENTS</span>
            <h3>제품 기술자료</h3>
            <p>GP10/GP20 공식 제품정보와<br />사양서, 매뉴얼을 확인하세요.</p>
            <span className="text-link">자료 확인<Arrow />
            </span>
          </Link>
          <Link href="/contact?topic=calibration">
            <span className="support-number">02 / CALIBRATION</span>
            <h3>KOLAS 검교정 상담</h3>
            <p>검교정이 필요한 장비의 모델과<br />요청 내용을 알려주세요.</p>
            <span className="text-link">검교정 문의<Arrow />
            </span>
          </Link>
          <Link href="/contact?topic=support">
            <span className="support-number">03 / CONSULTATION</span>
            <h3>기술지원 및 A/S 문의</h3>
            <p>사용 중인 제품과 증상을 바탕으로<br />필요한 내용을 상담하세요.</p>
            <span className="text-link">기술지원 문의<Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
    <InquiryCTA />
  </>;
}
