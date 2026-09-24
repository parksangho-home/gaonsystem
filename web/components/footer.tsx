import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

export function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-top">
        <Link href="/" aria-label="가온시스템 홈">
          <Image src="/images/brand/gaon-logo.jpg" alt="GAON SYSTEM" width={205} height={44} />
        </Link>
        <nav aria-label="푸터 메뉴">
          <Link href="/products">제품정보</Link>
          <Link href="/products/gp10-gp20#documents">기술자료</Link>
          <Link href="/contact">상담 및 견적 문의</Link>
        </nav>
      </div>
      <div className="footer-details">
        <div>
          <p>{company.name} <span className="divider">|</span> 대표 {company.representative} <span className="divider">|</span> 사업자등록번호 {company.registration}</p>
          <address>{company.address}</address>
          <p>{company.hours} · {company.closed}</p>
        </div>
        <a className="footer-phone" href={company.phoneHref}>
          <span>상담 및 견적 문의</span>{company.phone}</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GAON SYSTEM. All rights reserved.</span>
        <span>측정의 시작부터, 가온시스템</span>
      </div>
    </div>
  </footer>;
}
