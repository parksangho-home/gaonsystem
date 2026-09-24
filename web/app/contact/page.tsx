import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { findProduct } from "@/data/products";
import { findCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = { title: "상담 및 견적 문의", description: "가온시스템 제품 구성·견적·기술지원·검교정 전화 상담. 평일 09:00–18:00, 070-7954-9954.", alternates: { canonical: "/contact" }, openGraph: { title: "상담 및 견적 문의 | 가온시스템", url: "/contact" } };
type Query = { product?: string; category?: string; topic?: string };
export default async function ContactPage({ searchParams }: { searchParams: Promise<Query> }) {
  const params = await searchParams;
  const product = findProduct(params.product || "");
  const category = findCategory(params.category || "");
  const topic = params.topic === "calibration" ? "KOLAS 검교정 상담" : params.topic === "support" ? "기술지원 및 A/S 문의" : "제품 및 견적 상담";
  return <>
    <section className="page-intro">
      <div className="container">
        <Breadcrumbs items={[{ label: "상담 및 견적 문의" }]} />
        <p className="eyebrow">CONTACT GAON SYSTEM</p>
        <h1>측정에 대한 고민,<br />함께 이야기해 주세요.</h1>
        <p>제품 선택부터 구성과 견적까지, 가온시스템이 상담해 드립니다.</p>
      </div>
    </section>
    <section className="container section contact-grid">
      <div className="contact-card">
        <p className="eyebrow">{topic}</p>
        <h2>{product ? product.model : category ? category.name : "무엇을 도와드릴까요?"}</h2>{product && <p>{product.name}에 대해 문의하실 수 있습니다.</p>}<p>아래 번호로 전화해 문의 내용을 말씀해 주세요.</p>
        <a className="contact-number" href={company.phoneHref}>{company.phone}<Arrow diagonal />
        </a>
        <p>{company.hours}<br />
          <span className="muted">{company.closed}</span>
        </p>
        <a className="button primary" href={company.phoneHref}>전화로 상담하기<Arrow />
        </a>
        <p className="fine-print">전화 연결은 사용 중인 기기의 통화 기능을 이용합니다.<br />이 페이지에서는 온라인 문의를 접수하지 않습니다.</p>
      </div>
      <div className="contact-guide">
        <h2>상담 전, 알려주시면 좋습니다.</h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>제품 또는 장비 모델</h3>
              <p>{product ? `${product.model}의 모델과 필요한 옵션을 알려주세요.` : "관심 제품이나 사용 중인 장비의 모델명을 알려주세요."}</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>{params.topic === "calibration" ? "검교정 요청 내용" : "측정 대상과 사용 환경"}</h3>
              <p>{params.topic === "calibration" ? "장비 정보와 필요한 검교정 내용을 바탕으로 상담해 주세요. 가능 범위와 진행 방식은 상담 시 확인합니다." : "입력 신호, 필요한 채널 수, 사용 목적을 알려주세요."}</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>수량과 희망 일정</h3>
              <p>필요한 수량과 일정을 함께 알려주시면 상담에 도움이 됩니다.</p>
            </div>
          </li>
        </ol>{product && <Link className="text-link" href={`/products/${product.slug}`}>제품정보 다시 보기<Arrow />
        </Link>}</div>
    </section>
    <section className="location-section">
      <div className="container location-inner">
        <div>
          <p className="eyebrow">GAON SYSTEM</p>
          <h2>가온시스템 연락처</h2>
        </div>
        <div>
          <h3>주소</h3>
          <address>{company.address}</address>
        </div>
        <div>
          <h3>운영시간</h3>
          <p>{company.hours}<br />{company.closed}</p>
        </div>
      </div>
    </section>
  </>;
}
