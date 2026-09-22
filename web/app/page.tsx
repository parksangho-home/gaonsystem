"use client";

const products = [
  {
    brand: "YOKOGAWA",
    name: "GP10 / GP20",
    description:
      "터치스크린 기반의 디지털 레코더로 다양한 신호를 안정적으로 기록하고 관리합니다.",
    image: "/images/products/yokogawa-gp10.jpg",
  },
  {
    brand: "YOKOGAWA",
    name: "DL350 ScopeCorder",
    description:
      "전기·전자 및 산업 현장의 다양한 신호를 측정하고 기록하는 휴대형 스코프코더입니다.",
    image: "/images/products/yokogawa-dl350.png",
  },
  {
    brand: "YOKOGAWA",
    name: "CA300 Series",
    description:
      "전압, 전류 및 각종 공정 신호를 현장에서 점검할 수 있는 휴대형 프로세스 캘리브레이터입니다.",
    image: "/images/products/yokogawa-ca300-series.jpg",
  },
  {
    brand: "GRAPHTEC",
    name: "GL260",
    description:
      "다양한 입력 신호를 측정하고 기록할 수 있는 휴대형 데이터로거입니다.",
    image: "/images/products/graphtec-gl260.jpg",
  },
];

const services = [
  {
    icon: "▣",
    title: "계측기 공급",
    description: "국내외 다양한 계측장비를 공급합니다.",
  },
  {
    icon: "◇",
    title: "KOLAS 검교정",
    description: "측정기의 정확도와 신뢰성을 위한 검교정 서비스를 제공합니다.",
  },
  {
    icon: "♧",
    title: "기술지원 및 A/S",
    description: "제품 선택부터 사용까지 필요한 기술을 지원합니다.",
  },
  {
    icon: "◇",
    title: "맞춤형 컨설팅",
    description: "현장에 적합한 계측장비와 솔루션을 제안합니다.",
  },
];

const calibration = [
  "온도",
  "온습도",
  "풍속",
  "풍량",
  "열화상",
  "RPM",
];

const brands = [
  "YOKOGAWA",
  "GRAPHTEC",
];

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="site-header">
        <a href="/" className="logo">
          <span className="logo-mark">A</span>
          <span>가온시스템</span>
        </a>

        <nav className="main-nav">
          <a href="#about" target="_blank" rel="noreferrer">
            회사소개
          </a>

          <a href="#products" target="_blank" rel="noreferrer">
            제품정보
          </a>

          <a href="#kolas" target="_blank" rel="noreferrer">
            KOLAS 검교정
          </a>

          <a href="#contact" target="_blank" rel="noreferrer">
            고객센터
          </a>
        </nav>

        <div className="header-actions">
          <button aria-label="검색">⌕</button>
          <button aria-label="메뉴">☰</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            계측기 전문기업, 가온시스템
          </p>

          <h1>
            <span>정확한 측정의 기준,</span>
            <span>가온시스템이 함께합니다.</span>
          </h1>

          <p className="hero-description">
            <span>계측기 공급부터 KOLAS 검교정까지</span>
            <span>산업 현장에 필요한 측정 솔루션을 제공합니다.</span>
          </p>

          <div className="hero-buttons">
            <a
              href="#products"
              className="button primary"
              target="_blank"
              rel="noreferrer"
            >
              제품 살펴보기 →
            </a>

            <a
              href="#contact"
              className="button secondary"
              target="_blank"
              rel="noreferrer"
            >
              검교정 문의하기 →
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/images/products/yokogawa-dl350.png"
            alt="YOKOGAWA DL350 ScopeCorder"
          />
        </div>

        <div className="hero-dots">
          <span className="active" />
          <span />
          <span />
        </div>
      </section>

      {/* Services */}
      <section className="services">
        {services.map((service) => (
          <article className="service-item" key={service.title}>
            <div className="service-icon">{service.icon}</div>

            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* About */}
      <section id="about" className="about section">
        <div className="about-copy">
          <p className="eyebrow">ABOUT US</p>

          <h2>
            <span>가온시스템은</span>
            <span>계측기 전문기업입니다.</span>
          </h2>

          <p>
            온도, 습도, 가스, 풍속 등 다양한 계측장비를 공급하며
            국내외 계측장비에 대한 경험과 네트워크를 바탕으로
            빠른 납기와 기술지원, A/S 서비스를 제공합니다.
          </p>

          <a
            href="#contact"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            회사소개 보기 →
          </a>
        </div>

        <div className="about-points">
          <div>
            <strong>01</strong>
            <h3>정확한 제품 공급</h3>
            <p>
              신뢰할 수 있는 계측장비를
              제공합니다.
            </p>
          </div>

          <div>
            <strong>02</strong>
            <h3>전문 기술 지원</h3>
            <p>
              제품 선택부터 사용까지
              필요한 기술 상담을 지원합니다.
            </p>
          </div>

          <div>
            <strong>03</strong>
            <h3>KOLAS 검교정 서비스</h3>
            <p>
              측정기의 정확도와 신뢰성을
              유지할 수 있도록 지원합니다.
            </p>
          </div>

          <div>
            <strong>04</strong>
            <h3>지속적인 파트너십</h3>
            <p>
              고객의 현장에 맞는
              계측 솔루션을 함께 고민합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="products section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED PRODUCTS</p>

            <h2>주요 제품</h2>

            <p>
              산업 현장에 필요한
              계측 솔루션을 만나보세요.
            </p>
          </div>

          <a
            href="#contact"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            전체 제품 보기 →
          </a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                />
              </div>

              <div className="product-info">
                <p className="product-brand">
                  {product.brand}
                </p>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <a
                  href="#contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  자세히 보기 →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* KOLAS */}
      <section id="kolas" className="kolas">
        <div className="kolas-copy">
          <p className="eyebrow">KOLAS CALIBRATION</p>

          <h2>
            KOLAS 검교정 서비스
          </h2>

          <p>
            신뢰할 수 있는 검교정으로
            측정기의 정확도를 유지하세요.
          </p>

          <a
            href="#contact"
            className="button outline"
            target="_blank"
            rel="noreferrer"
          >
            검교정 문의하기 →
          </a>
        </div>

        <div className="calibration-area">
          <p>검교정 가능 분야</p>

          <div className="calibration-list">
            {calibration.map((item) => (
              <div key={item}>
                <span>○</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands">
        <p>취급 브랜드</p>

        <div>
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact section">
        <p className="eyebrow">CONTACT</p>

        <h2>
          <span>계측기와 검교정에 대해</span>
          <span>궁금한 점이 있으신가요?</span>
        </h2>

        <p>
          제품 상담부터 검교정까지
          편하게 문의해주세요.
        </p>

        <a
          href="tel:070-7954-9954"
          className="contact-phone"
        >
          070-7954-9954
        </a>

        <p>평일 09:00 ~ 18:00</p>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <a href="/" className="logo footer-logo">
            <span className="logo-mark">A</span>
            <span>가온시스템</span>
          </a>

          <div className="footer-info">
            <p>
              상호 : 가온시스템　대표 : 김은정
            </p>

            <p>
              사업자등록번호 : 560-38-00733
            </p>

            <p>
              서울특별시 구로구 부광로 88,
              SK V1센터 A동 504호
            </p>
          </div>

          <div className="footer-phone">
            <span>문의전화</span>
            <strong>070-7954-9954</strong>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © GAON SYSTEM. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}