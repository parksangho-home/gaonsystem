import { ProductContent } from "@/components/product-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, findProduct } from "@/data/products";
import { findCategory } from "@/data/categories";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryCTA } from "@/components/inquiry-cta";
import { Arrow } from "@/components/icons";
import { siteUrl } from "@/data/company";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "제품을 찾을 수 없습니다", robots: { index: false } };
  return { title: `${product.model} ${product.name}`, description: product.shortDescription, alternates: { canonical: `/products/${slug}` }, openGraph: { title: `${product.model} | 가온시스템`, description: product.shortDescription, url: `/products/${slug}`, images: [{ url: product.image, width: product.imageWidth, height: product.imageHeight, alt: product.model }] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const category = findCategory(product.category);
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: `${product.model} ${product.name}`, description: product.shortDescription, image: product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`, brand: { "@type": "Brand", name: product.brand }, category: category?.name, url: `${siteUrl}/products/${product.slug}` };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <div className="container">
      <Breadcrumbs items={[{ label: "제품정보", href: "/products" }, { label: category?.name || "제품", href: `/products?category=${product.category}` }, { label: product.model }]} />
    </div>
    <section className="container product-hero">
      <div className="detail-image">
        <span className="small-label">{product.brand} / {product.series}</span>
        <Image src={product.image} alt={product.imageAlt} width={product.imageWidth} height={product.imageHeight} sizes="(max-width: 900px) 90vw, 50vw" priority />
      </div>
      <div className="detail-copy">
        <p className="eyebrow">{product.brand} · {category?.name}</p>
        <h1>{product.model}</h1>
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
        <div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="button-row">
          <Link href={`/contact?product=${product.slug}`} className="button primary">제품·견적 문의<Arrow />
          </Link>
          <a className="button secondary" href={product.content ? (product.content.detail.length ? "#product-images" : "#overview") : "#specifications"}>{product.legacyUrl ? "상세 설명 보기" : "주요 사양 보기"}</a>
        </div>
        <p className="fine-print">{product.legacyUrl ? "제품 구성·가격·납기는 상담 시 확인해 주세요." : "측정 대상과 채널 수에 맞는 구성을 상담해 드립니다."}</p>
      </div>
    </section>
    {product.content ? <>
      <section className="container section" id="overview">
        <p className="eyebrow">PRODUCT OVERVIEW</p>
        <h2>{product.overviewTitle}</h2>
        <ProductContent nodes={product.content.summary} model={product.model} />
      </section>
      {product.content.detail.length > 0 && <section className="feature-section" id="product-images">
        <div className="container section">
          <div className="section-heading"><div><p className="eyebrow">PRODUCT DETAILS</p><h2>상세 설명</h2></div></div>
          <ProductContent nodes={product.content.detail} model={product.model} />
          <p className="fine-print">제품 구성과 최신 사양은 문의 시 확인해 주세요.</p>
        </div>
      </section>}
    </> : <>
    <nav className="detail-nav" aria-label="제품 상세 목차">
      <div className="container">
        <a href="#overview">제품 개요</a>
        <a href="#features">주요 특징</a>
        <a href="#specifications">주요 사양</a>
        <a href="#documents">기술자료</a>
      </div>
    </nav>
    <section className="container section overview-grid" id="overview">
      <div>
        <p className="eyebrow">OVERVIEW</p>
        <h2>{product.overviewTitle}</h2>
      </div>
      <p className="large-copy">{product.description}</p>
    </section>
    <section className="feature-section" id="features">
      <div className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">KEY FEATURES</p>
            <h2>{product.featuresTitle}</h2>
          </div>
        </div>
        <div className="detail-features">{product.features.map((feature, index) => <article key={feature.title}>
          <span className="feature-index">0{index + 1}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>)}</div>
      </div>
    </section>
    <section className="container section" id="specifications">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SPECIFICATIONS</p>
          <h2>{product.specificationsTitle}</h2>
        </div>
      </div>
      <div className="spec-table-wrap">
        <table className="spec-table">
          <caption className="sr-only">{product.model} 모델별 주요 사양</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>{product.specificationModels.map((model) => <th scope="col" key={model}>{model}</th>)}</tr>
          </thead>
          <tbody>{product.specifications.map((spec) => <tr key={spec.label}>
            <th scope="row">{spec.label}</th>{spec.values.map((value, index) => <td key={product.specificationModels[index]}>{value}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="spec-note">{product.specificationsNote}</p>
    </section>
    <section className="documents-section" id="documents">
      <div className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DOCUMENTS & RESOURCES</p>
            <h2>더 자세한 제품정보.</h2>
            <p>{product.brand} 공식 자료에서 사양과 사용 정보를 확인하세요.</p>
          </div>
        </div>
        <div className="document-list">{product.documents.map((document) => <a href={document.url} key={document.url}>
          <span className="document-icon">↗</span>
          <div>
            <h3>{document.title}</h3>
            <p>{document.type}</p>
          </div>
          <Arrow diagonal />
        </a>)}</div>
        <p className="fine-print">자료 링크는 제조사 사이트로 연결됩니다. 본 페이지는 기존 가온시스템 제품정보와 제조사 공식 자료를 대조하여 작성했습니다. 확인일: {product.sources[0]?.checkedAt}.</p>
      </div>
    </section>
    </>}
    <InquiryCTA product={product} />
  </>;
}
