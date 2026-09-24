import type { NextConfig } from "next";
import { categories } from "./data/categories";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.imweb.me", pathname: "/**" }] },
  async redirects() {
    return [
      ...categories.map((category) => ({ source: category.legacyPath, destination: `/products?category=${category.slug}`, permanent: true })),
      { source: "/shop_view", has: [{ type: "query" as const, key: "idx", value: "190" }], destination: "/products/gp10-gp20", permanent: true },
      { source: "/46", destination: "/products?brand=YOKOGAWA", permanent: true },
      { source: "/74", destination: "/products?brand=GRAPHTEC", permanent: true },
      { source: "/66", destination: "/contact?topic=calibration", permanent: true },
      { source: "/1900790975", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
