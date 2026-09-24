import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { products, filterProducts, findProduct } from "../data/products.ts";
import { categories } from "../data/categories.ts";

test("model search accepts case, spacing, and slash variations", () => {
  for (const query of ["gp10", "GP20", "gp10/gp20", "GP10 GP20", "디지털 레코더"]) {
    assert.equal(filterProducts({ query })[0]?.slug, "gp10-gp20");
  }
});

test("brand, category and keyword filters are combined", () => {
  assert.equal(filterProducts({ brand: "YOKOGAWA", category: "recorders", query: "GP10" }).length, 1);
  assert.equal(filterProducts({ brand: "GRAPHTEC", query: "GP10" }).length, 0);
  assert.equal(filterProducts({ category: "oscilloscopes", query: "GP10" }).length, 0);
  assert.equal(filterProducts({ query: "not-a-real-model" }).length, 0);
  assert.equal(filterProducts({ category: "unknown" }).length, 0);
  assert.equal(findProduct("unknown"), undefined);
});

test("published catalog has real images, category references and complete model columns", () => {
  assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
  for (const product of products) {
    assert.ok(categories.some((category) => category.slug === product.category));
    if (product.image.startsWith("/")) assert.ok(existsSync(new URL(`../public${product.image}`, import.meta.url)), product.image);
    else assert.equal(new URL(product.image).hostname, "cdn.imweb.me");
    assert.ok(product.sources.length > 0);
    for (const row of product.specifications) assert.equal(row.values.length, product.specificationModels.length);
    for (const document of product.documents) assert.equal(new URL(document.url).protocol, "https:");
  }
});
