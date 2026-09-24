import Link from "next/link";

export default function NotFound() {
  return <section className="container section empty-state">
    <p className="eyebrow">404 / PAGE NOT FOUND</p>
    <h1>페이지를 찾을 수 없습니다.</h1>
    <p>주소를 확인하거나 제품 목록에서 다시 찾아주세요.</p>
    <Link className="button primary" href="/products">제품 목록으로 이동 →</Link>
  </section>;
}
