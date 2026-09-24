import Link from "next/link";
import { Arrow } from "./icons";
import { company } from "@/data/company";

export function InquiryCTA({ product }: { product?: { slug: string; model: string } }) {
  return <section className="inquiry-band">
    <div className="container inquiry-inner">
      <div>
        <p className="eyebrow light">LET’S FIND YOUR SOLUTION</p>
        <h2>{product ? `${product.model}, 구성부터 함께.` : "현장에 맞는 계측기, 함께 찾아드립니다."}</h2>
        <p>측정 대상과 필요한 조건을 알려주세요. 제품 선택과 견적을 상담해 드립니다.</p>
      </div>
      <div className="inquiry-actions">
        <Link className="button white" href={product ? `/contact?product=${product.slug}` : "/contact"}>제품 문의하기<Arrow />
        </Link>
        <a href={company.phoneHref}>{company.phone}</a>
      </div>
    </div>
  </section>;
}
