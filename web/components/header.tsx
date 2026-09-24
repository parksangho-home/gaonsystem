"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow, SearchIcon } from "./icons";

const navigation = [
  { href: "/#about", label: "회사소개" },
  { href: "/products", label: "제품정보" },
  { href: "/products/gp10-gp20#documents", label: "기술자료" },
  { href: "/#support", label: "고객지원" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutside); desktop.removeEventListener("change", closeOnDesktop); };
  }, [open]);
  return <header className="site-header" ref={headerRef} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <div className="container header-row">
      <Link href="/" className="logo" aria-label="가온시스템 홈" onClick={() => setOpen(false)}>
        <Image src="/images/brand/gaon-logo.jpg" alt="GAON SYSTEM 가온시스템" width={223} height={48} priority />
      </Link>
      <nav className="desktop-nav" aria-label="주 메뉴">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={item.href === "/products" && pathname.startsWith("/products") ? "page" : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <Link href="/products#search" className="search-link" aria-label="제품 검색">
          <SearchIcon />
        </Link>
        <Link href="/contact" className="header-contact">제품 문의 <Arrow />
        </Link>
        <button className="menu-toggle" ref={toggleRef} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setOpen(!open)}>
          <span className={open ? "menu-lines is-open" : "menu-lines"} />
        </button>
      </div>
    </div>
    {open && <nav className="mobile-nav" id="mobile-menu" aria-label="모바일 메뉴">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Arrow />
    </Link>)}<Link href="/contact" onClick={() => setOpen(false)}>제품 문의<Arrow />
      </Link>
    </nav>}
  </header>;
}
