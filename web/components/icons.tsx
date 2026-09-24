import type { Category } from "@/data/categories";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
  </svg>;
}
export function SearchIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m16 16 5 5" />
  </svg>;
}
export function CategoryIcon({ symbol }: { symbol: Category["symbol"] }) {
  return <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    {symbol === "handheld" ? <>
      <rect x="13" y="4" width="22" height="40" rx="4" />
      <path d="M18 10h12v10H18z" />
      <circle cx="24" cy="31" r="6" />
      <path d="m24 31 3-3" />
    </> : symbol === "thermal" ? <>
      <rect x="6" y="10" width="36" height="28" rx="3" />
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="4" />
      <path d="M12 10V6h9v4" />
    </> : <>
      <rect x="3" y="8" width="42" height="30" rx="3" />
      <path d="M9 38v4m30-4v4M35 15h4m-4 7h4m-4 8h4" />
      <rect x="8" y="13" width="23" height="19" rx="1" />{symbol === "power" ? <path d="m22 15-8 10h7l-4 6" /> : symbol === "record" ? <path d="M11 27h3v-5h4v3h4V17h5" /> : symbol === "source" ? <path d="M12 22h15m-7-6v12" /> : <path d="m10 23 4-6 6 12 6-12 3 5" />}</>}
  </svg>;
}
