import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/products", "/contact", ...products.map((product) => `/products/${product.slug}`)].map((path) => ({ url: `${siteUrl}${path}` }));
}
