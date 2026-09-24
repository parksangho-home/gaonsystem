import crawledProducts from "./crawled-products.json" with { type: "json" };
import contentData from "./imported-product-content.json" with { type: "json" };
import type { ImportedContent } from "./product-content.ts";
const importedContent: Record<string, ImportedContent> = contentData;
import { findCategory } from "./categories.ts";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  category: string;
  model: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  content?: ImportedContent;
  legacyUrl?: string;
  series: string;
  tags: string[];
  overviewTitle: string;
  featuresTitle: string;
  specificationsTitle: string;
  specificationsNote: string;
  featured: boolean;
  features: { title: string; description: string }[];
  specificationModels: string[];
  specifications: { label: string; values: string[] }[];
  documents: { title: string; type: string; url: string }[];
  sources: { title: string; location: string; checkedAt: string }[];
};

export const officialProductUrl = "https://www.yokogawa.com/us/solutions/products-and-services/measurement/data-acquisition-products/portable-data-acquisition/touch-screen-gp10-gp20/";

export const products: Product[] = [{
  id: "190",
  slug: "gp10-gp20",
  brand: "YOKOGAWA",
  category: "recorders",
  model: "GP10 / GP20",
  name: "터치스크린 디지털 레코더",
  shortDescription: "다양한 측정 신호를 한 화면에서 확인하고 기록하는 휴대용 페이퍼리스 레코더.",
  description: "실험실에서 현장까지, 측정 데이터를 화면으로 확인하고 저장하세요. GP10/GP20은 터치스크린과 모듈형 입출력을 갖춘 휴대용 레코더입니다. 측정 대상과 필요한 채널 수에 맞춰 구성을 선택할 수 있습니다.",
  image: "/images/products/gp-series.jpg",
  imageWidth: 850,
  imageHeight: 558,
  imageAlt: "YOKOGAWA GP10(왼쪽)과 GP20(오른쪽) 디지털 레코더",
  series: "SMARTDAC+",
  tags: ["터치스크린", "모듈형 입출력", "휴대용"],
  overviewTitle: "측정하고, 확인하고, 기록하세요.",
  featuresTitle: "측정 환경에 유연하게.",
  specificationsTitle: "GP10과 GP20, 한눈에 비교.",
  specificationsNote: "채널 수는 아날로그 입력 기준이며 장착 모듈에 따라 달라집니다. 확장 입력에는 확장 I/O 등 해당 구성이 필요합니다. 옵션과 상세 조건은 제조사 사양서를 확인하거나 문의해 주세요.",
  featured: true,
  features: [
    { title: "터치로 확인하는 측정 데이터", description: "화면에서 측정값과 추이를 확인하는 터치스크린 인터페이스를 제공합니다." },
    { title: "측정 신호에 맞춘 모듈 구성", description: "DC 전압, 열전대, RTD, 디지털 입력 등 필요한 신호에 맞는 입출력 모듈을 선택합니다." },
    { title: "본체부터 확장 I/O까지", description: "본체 입력과 확장 입력을 조합할 수 있습니다. 지원 채널 수는 모델·메모리형·모듈 구성에 따라 달라집니다." },
    { title: "네트워크를 통한 모니터링", description: "웹 브라우저로 측정 데이터를 확인할 수 있어 장비의 화면과 함께 활용할 수 있습니다." },
  ],
  specificationModels: ["GP10", "GP20"],
  specifications: [
    { label: "구조", values: ["휴대용", "휴대용"] },
    { label: "디스플레이", values: ["5.7형 TFT 컬러 LCD", "12.1형 TFT 컬러 LCD"] },
    { label: "본체 아날로그 입력", values: ["최대 30채널", "최대 100채널"] },
    { label: "확장 I/O 포함 아날로그 입력", values: ["최대 100채널", "표준형 최대 100채널 / 대용량 메모리형 최대 450채널"] },
    { label: "입력 신호", values: ["DC 전압, TC/RTD, DI 등 (선택 모듈에 따름)", "DC 전압, TC/RTD, DI 등 (선택 모듈에 따름)"] },
  ],
  documents: [
    { title: "GP10/GP20 제품정보·매뉴얼", type: "제조사 공식 페이지 · 영문", url: officialProductUrl },
    { title: "GP10/GP20 일반 사양서", type: "PDF · 영문 · YOKOGAWA", url: "https://web-material3.yokogawa.com/GS04L52B01-01EN.pdf" },
  ],
  sources: [
    { title: "가온시스템 기존 제품 상세", location: "product-190.html (shop_view/?idx=190)", checkedAt: "2026-09-24" },
    { title: "YOKOGAWA 공식 제품정보", location: officialProductUrl, checkedAt: "2026-09-24" },
  ],
}];

const importedProducts: Product[] = crawledProducts.map((entry) => {
  const brand = entry.title.startsWith("FLIR") ? "FLIR" : entry.title.startsWith("GRAPHTEC") ? "GRAPHTEC" : "YOKOGAWA";
  const title = entry.title.replace(/^YOKOGAWA\s+|^GRAPHTEC\s+|^FLIR\s+/, "");
  const content = importedContent[entry.id];
  const description = content.description;
  return {
    id: entry.id,
    slug: `legacy-${entry.id}`,
    brand,
    category: entry.category,
    model: title,
    name: findCategory(entry.category)?.name || "계측 장비",
    shortDescription: description ? (description.length > 140 ? `${description.slice(0, 137).trimEnd()}…` : description) : `${entry.title} 제품정보`,
    description: description || `${entry.title} 제품정보`,
    image: content.hero.src,
    imageWidth: content.hero.width,
    imageHeight: content.hero.height,
    imageAlt: entry.title,
    content,
    legacyUrl: entry.url,
    series: "제품정보",
    tags: [],
    overviewTitle: `${title} 제품정보`,
    featuresTitle: "기존 제품 안내",
    specificationsTitle: "제품 사양",
    specificationsNote: "상세 구성과 최신 사양은 문의 시 확인해 주세요.",
    featured: false,
    features: [],
    specificationModels: [],
    specifications: [],
    documents: [],
    sources: [{ title: "가온시스템 기존 제품 상세", location: entry.url, checkedAt: "2026-09-24" }],
  };
});
products.push(...importedProducts);

export const findProduct = (slug: string) => products.find((product) => product.slug === slug);

// Spaces and punctuation should not prevent model searches such as GP10/GP20.
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[\s/\-_.]+/g, "");
export function filterProducts({ category = "", brand = "", query = "" }: { category?: string; brand?: string; query?: string }) {
  return products.filter((product) => (!category || product.category === category)
    && (!brand || product.brand === brand)
    && normalize(`${product.model} ${product.name} ${product.brand} ${product.shortDescription}`).includes(normalize(query)));
}
