import Link from "next/link";
import { categories } from "@/data/categories";
import { Arrow, CategoryIcon } from "./icons";

export function CategoryGrid() {
  return <div className="category-grid">{categories.map((category, index) => <Link className="category-card" key={category.slug} href={`/products?category=${category.slug}`}>
    <div className="category-card-top">
      <CategoryIcon symbol={category.symbol} />
      <span>{String(index + 1).padStart(2, "0")}</span>
    </div>
    <h3>{category.name}</h3>
    <div className="category-card-bottom">
      <span>{category.english}</span>
      <Arrow />
    </div>
  </Link>)}</div>;
}
