import Image from "next/image";
import { createElement, type ReactNode } from "react";
import type { ContentNode } from "@/data/product-content";

const allowedTags = new Set(["p", "div", "span", "strong", "b", "em", "i", "u", "sub", "sup", "ul", "ol", "li", "h2", "h3", "h4", "h5", "h6", "table", "thead", "tbody", "tfoot", "tr", "td", "th", "br", "hr"]);

export function ProductContent({ nodes, model }: { nodes: ContentNode[]; model: string }) {
  function render(node: ContentNode, index: number): ReactNode {
    if (node.text !== undefined) return node.text;
    if (node.tag === "img" && node.src) return <Image key={index} src={node.src} width={node.width} height={node.height} alt={node.alt || `${model} 제품 상세정보`} unoptimized sizes="(max-width: 900px) 100vw, 1100px" />;
    if (!node.tag || !allowedTags.has(node.tag)) return null;
    const children = node.children?.map(render);
    const element = createElement(node.tag, { key: index, colSpan: node.colspan, rowSpan: node.rowspan }, ...(["br", "hr"].includes(node.tag) ? [] : [children]));
    return node.tag === "table" ? <div className="product-content-table" role="region" aria-label={`${model} 사양표`} tabIndex={0} key={index}>{element}</div> : element;
  }
  return <div className="product-content">{nodes.map(render)}</div>;
}
