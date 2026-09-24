import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { findCategory } from "@/data/categories";
import { Arrow } from "./icons";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return <article className="product-card">
    <Link href={`/products/${product.slug}`} className="product-card-link">
      <div className="product-card-image">
        <Image loading={eager ? "eager" : "lazy"} src={product.image} alt={product.imageAlt} width={product.imageWidth} height={product.imageHeight} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 60vw, 400px" />
      </div>
      <div className="product-card-copy">
        <p className="eyebrow">{product.brand} / {findCategory(product.category)?.name}</p>
        <h2>{product.model}</h2>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <span className="text-link">제품 자세히 보기 <Arrow />
        </span>
      </div>
    </Link>
  </article>;
}
