// 실행: node tools/crawl-gaonsystem.mjs (Node.js 18 이상)
// 결과: crawl-output/manifest.json, pages/, images/
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = path.resolve("crawl-output");
const queue = ["https://gaonsystem.kr/", "https://gaonsystem.kr/sitemap.xml", "https://gaonsystem.kr/shop_view/?idx=190"];
const seen = new Set(), products = [], errors = [];
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
const all = (html, regex) => [...html.matchAll(regex)].map((match) => match[1]);
const clean = (value) => String(value || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const hash = (value) => createHash("sha256").update(value).digest("hex").slice(0, 12);
function link(raw, base) {
  try {
    const url = new URL(raw.replace(/&amp;/g, "&"), base);
    if (!["gaonsystem.kr", "www.gaonsystem.kr"].includes(url.hostname)) return null;
    url.protocol = "https:"; url.hostname = "gaonsystem.kr"; url.hash = "";
    for (const key of [...url.searchParams.keys()]) if (!["idx", "page", "category", "cate"].includes(key)) url.searchParams.delete(key);
    return url.href;
  } catch { return null; }
}
const pages = [], downloaded = new Map();
const maxPages = 400, maxProducts = 200;
const isProduct = (url) => new URL(url).pathname.includes("/shop_view") && new URL(url).searchParams.has("idx");
function interesting(url) {
  const { pathname } = new URL(url);
  return !/\.(?:css|js|json|png|jpe?g|webp|gif|svg|ico|pdf|zip|xml|woff2?|map)$/i.test(pathname)
    && !/\/(?:login|logout|join|mypage|cart|checkout|admin|api)(?:\/|$)/i.test(pathname);
}
async function get(url) {
  await sleep();
  const res = await fetch(url, { headers: { "user-agent": "GaonSystemMigration/1.0" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res;
}
function meta(html, name) {
  const tag = (html.match(/<meta\b[^>]*>/gi) || []).find((x) => new RegExp(`(?:name|property)=["']${name}["']`, "i").test(x));
  return clean(tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1]);
}
function structured(html) {
  for (const block of all(html, /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(block);
      const nodes = Array.isArray(data) ? data : data["@graph"] || [data];
      const item = nodes.find((x) => String(x["@type"]).toLowerCase().includes("product"));
      if (item) return item;
    } catch { /* 다음 블록 */ }
  }
  return {};
}
async function saveImage(src) {
  if (downloaded.has(src)) return downloaded.get(src);
  try {
    const res = await get(src), type = (res.headers.get("content-type") || "").split(";")[0];
    const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[type];
    if (!ext || Number(res.headers.get("content-length") || 0) > 20e6) throw new Error("이미지 형식/크기 제한");
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length > 20e6) throw new Error("20MB 초과");
    const file = `images/${hash(src)}.${ext}`;
    await writeFile(path.join(root, file), bytes);
    const saved = { source: src, file };
    downloaded.set(src, saved);
    return saved;
  } catch (e) {
    const failed = { source: src, error: String(e) };
    downloaded.set(src, failed);
    errors.push({ url: src, error: String(e) });
    return failed;
  }
}
function imageLinks(html, url, info) {
  const raw = [
    ...(Array.isArray(info.image) ? info.image : [info.image]),
    meta(html, "og:image"),
    ...all(html, /\b(?:src|data-src|data-original|data-image|data-background-image|href)\s*=\s*["']([^"']+\.(?:png|jpe?g|webp|gif)(?:\?[^"']*)?)["']/gi),
    ...all(html, /(?:background-image\s*:\s*url\(|url\()\s*["']?([^"')]+\.(?:png|jpe?g|webp|gif)(?:\?[^"')]+)?)/gi),
    ...all(html, /\b(?:srcset|data-srcset)\s*=\s*["']([^"']+)["']/gi).flatMap((set) => set.split(",").map((entry) => entry.trim().split(/\s+/)[0])),
  ];
  return [...new Set(raw.map((value) => {
    try { return new URL(String(value).replace(/&amp;/g, "&"), url).href; } catch { return null; }
  }).filter((src) => src && ["gaonsystem.kr", "www.gaonsystem.kr", "cdn.imweb.me"].includes(new URL(src).hostname) &&
    /\.(?:png|jpe?g|webp|gif)(?:\?|$)/i.test(src)))].slice(0, 100);
}
await mkdir(path.join(root, "pages"), { recursive: true });
await mkdir(path.join(root, "images"), { recursive: true });
while (queue.length && seen.size < maxPages && products.length < maxProducts) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  try {
    const res = await get(url), type = res.headers.get("content-type") || "";
    if (!/html|xml|text\/plain/i.test(type)) continue;
    const html = await res.text();
    const found = [
      ...all(html, /\bhref\s*=\s*["']([^"']+)["']/gi),
      ...all(html, /<loc>\s*([^<]+)<\/loc>/gi),
      ...[...html.matchAll(/\/shop_view\/\?idx=\d+/g)].map((x) => x[0]),
    ];
    for (const raw of found) {
      const next = link(raw, url);
      if (next && interesting(next) && !seen.has(next) && !queue.includes(next)) queue.push(next);
    }
    if (!/html/i.test(type)) continue;
    const info = isProduct(url) ? structured(html) : {};
    const title = clean(info.name || meta(html, "og:title") || all(html, /<title[^>]*>([\s\S]*?)<\/title>/gi)[0]);
    const pageFile = `pages/page-${hash(url)}.html`;
    await writeFile(path.join(root, pageFile), html, "utf8");
    const images = [];
    for (const src of imageLinks(html, url, info)) images.push(await saveImage(src));
    pages.push({ url, title, pageFile, images });
    if (isProduct(url)) {
      products.push({ id: new URL(url).searchParams.get("idx"), url, title,
        description: clean(info.description || meta(html, "description")), pageFile, images });
    }
    console.log(`페이지 ${pages.length}: ${title || url}, 이미지 ${images.filter((item) => item.file).length}개`);
  } catch (e) { errors.push({ url, error: String(e) }); console.warn("실패:", url, String(e)); }
}
await writeFile(path.join(root, "manifest.json"), JSON.stringify({
  source: "https://gaonsystem.kr/", collectedAt: new Date().toISOString(),
  pagesVisited: seen.size, pending: queue.length, pages, products, imagesDownloaded: [...downloaded.values()].filter((item) => item.file).length, errors,
}, null, 2));
console.log(`완료: 페이지 ${pages.length}개, 제품 ${products.length}개, 이미지 ${[...downloaded.values()].filter((item) => item.file).length}개 → crawl-output/manifest.json`);
if (products.length <= 1) console.log("상품 목록이 JavaScript로 로드되면 상품 목록/제품 주소를 queue 시작 주소에 추가해야 합니다.");
