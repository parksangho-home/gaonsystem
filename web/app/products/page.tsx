import type { Metadata } from "next";
import Link from "next/link";
import { categories, brands, findCategory } from "@/data/categories";
import { filterProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryCTA } from "@/components/inquiry-cta";
import { SearchIcon, Arrow } from "@/components/icons";

type Params = { category?: string | string[]; brand?: string | string[]; q?: string | string[] };
const single = (value: string | string[] | undefined) => typeof value === "string" ? value.trim().slice(0, 120) : "";
export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const params = await searchParams;
  return { title: "제품정보", description: "제품군, 브랜드, 모델명으로 가온시스템의 계측기 제품정보를 찾아보세요.", alternates: { canonical: "/products" }, robots: Object.values(params).some(Boolean) ? { index: false, follow: true } : undefined, openGraph: { title: "제품정보 | 가온시스템", url: "/products" } };
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const category = single(params.category);
  const brand = single(params.brand);
  const query = single(params.q);
  const selectedCategory = findCategory(category);
  const results = filterProducts({ category, brand, query });
  function categoryUrl(slug: string) {
    const next = new URLSearchParams();
    if (slug) next.set("category", slug);
    if (brand) next.set("brand", brand);
    if (query) next.set("q", query);
    return `/products${next.size ? `?${next}` : ""}`;
  }
  return <>
    <section className="page-intro">
      <div className="container">
        <Breadcrumbs items={[{ label: "제품정보" }]} />
        <p className="eyebrow">PRODUCT EXPLORER</p>
        <h1>측정 목적에 맞는 제품을 찾으세요.</h1>
        <p>제품군과 브랜드로 살펴보거나, 모델명으로 검색해 보세요.</p>
      </div>
    </section>
    <section className="container catalog-section">
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h2>제품 카테고리</h2>
          <nav aria-label="제품 카테고리">
            <Link href={categoryUrl("")} aria-current={!category ? "page" : undefined}>전체 제품<span>→</span>
            </Link>{categories.map((item) => <Link key={item.slug} href={categoryUrl(item.slug)} aria-current={category === item.slug ? "page" : undefined}>{item.name}<span>→</span>
            </Link>)}</nav>
          <div className="sidebar-help">
            <p>찾으시는 장비가 없나요?</p>
            <Link href="/contact">제품 상담하기<Arrow />
            </Link>
          </div>
        </aside>
        <div className="catalog-main">
          <form action="/products" className="catalog-search" id="search" key={`${category}/${brand}/${query}`}>
            <label className="sr-only" htmlFor="product-query">제품명 또는 모델명 검색</label>
            <div className="search-input-wrap">
              <SearchIcon />
              <input id="product-query" name="q" type="search" defaultValue={query} placeholder="제품명 또는 모델명 검색" maxLength={120} />
            </div>
            <label className="sr-only" htmlFor="brand">브랜드</label>
            <select id="brand" name="brand" defaultValue={brands.some((item) => item === brand) ? brand : ""}>
              <option value="">전체 브랜드</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>{category && <input type="hidden" name="category" value={category} />}<button type="submit" className="button primary">검색</button>
          </form>
          <div className="results-heading">
            <div>
              <p className="eyebrow">{brand || "ALL BRANDS"}</p>
              <h2>{selectedCategory?.name || (category ? "카테고리 검색 결과" : "전체 제품")} <span>{results.length}</span>
              </h2>
            </div>{(category || brand || query) && <Link href="/products" className="reset-link">필터 초기화 ↺</Link>}</div>
          {query && <p className="search-summary">“{query}” 검색 결과</p>}
          {results.length ? <div className="catalog-products">{results.map((product, index) => <ProductCard key={product.id} product={product} eager={index < 2} />)}</div> : <div className="empty-state">
            <SearchIcon />
            <h2>{query ? "검색 결과가 없습니다." : "등록된 제품 상세정보가 없습니다."}</h2>
            <p>{query ? "모델명이나 검색어를 변경해 보세요." : "찾으시는 모델과 측정 조건을 알려주시면 제품 상담을 도와드립니다."}</p>
            <p className="fine-print">목록에 없는 제품의 공급 가능 여부는 상담을 통해 확인해 주세요.</p>
            <Link className="button primary" href={selectedCategory ? `/contact?category=${selectedCategory.slug}` : "/contact"}>제품 문의하기<Arrow />
            </Link>
          </div>}
          <p className="catalog-note">제품의 구성·가격·납기는 상담을 통해 안내해 드립니다.</p>
        </div>
      </div>
    </section>
    <InquiryCTA />
  </>;
}
