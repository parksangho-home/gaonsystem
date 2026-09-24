export type Category = {
  slug: string;
  name: string;
  english: string;
  legacyPath: string;
  symbol: "wave" | "power" | "record" | "handheld" | "source" | "thermal";
};

// Existing navigation from gaonsystem.html; this is not evidence of any individual model.
export const categories: Category[] = [
  { slug: "power-analyzers", name: "전력 분석기", english: "Power Analyzers", legacyPath: "/473049881", symbol: "power" },
  { slug: "oscilloscopes", name: "오실로스코프", english: "Oscilloscopes", legacyPath: "/848037407", symbol: "wave" },
  { slug: "scopecorders", name: "스코프코더", english: "ScopeCorders", legacyPath: "/1477492909", symbol: "wave" },
  { slug: "recorders", name: "레코더", english: "Data Recording", legacyPath: "/1258045133", symbol: "record" },
  { slug: "portable", name: "휴대용 측정기", english: "Portable Instruments", legacyPath: "/1858225101", symbol: "handheld" },
  { slug: "calibrators", name: "캘리브레이터", english: "Calibrators", legacyPath: "/1907536546", symbol: "source" },
  { slug: "generators", name: "펑션 제너레이터", english: "Function Generators", legacyPath: "/536951970", symbol: "wave" },
  { slug: "multimeters", name: "멀티미터", english: "Multimeters", legacyPath: "/1383178391", symbol: "handheld" },
  { slug: "source-meters", name: "소스미터", english: "Source Meters", legacyPath: "/223842316", symbol: "source" },
  { slug: "pressure", name: "압력 측정기", english: "Pressure Measurement", legacyPath: "/2002790562", symbol: "power" },
  { slug: "chart-paper", name: "기록지", english: "Chart Paper", legacyPath: "/76", symbol: "record" },
  { slug: "thermal", name: "열화상 카메라", english: "Thermal Imaging", legacyPath: "/1928554382", symbol: "thermal" },
];

export const brands = ["YOKOGAWA", "GRAPHTEC", "FLIR"] as const;
export const findCategory = (slug: string) => categories.find((category) => category.slug === slug);
