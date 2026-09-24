import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { findProduct } from '../data/products.ts';
const walk = nodes => nodes.flatMap(n => [n, ...walk(n.children || [])]);
test('all published product assets match the verified content baseline', () => {
  const baseline = JSON.parse(readFileSync(new URL('../docs/product-assets.json', import.meta.url), 'utf8'));
  for (const [path, digest] of Object.entries(baseline)) {
    const bytes = readFileSync(new URL(`../${path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), digest, path);
  }
  const audit = JSON.parse(readFileSync(new URL('../docs/product-content-audit.json', import.meta.url), 'utf8'));
  assert.equal(audit.length, 46);
  for (const row of audit) {
    const nodes = walk(findProduct(`legacy-${row.id}`).content.detail);
    assert.equal(nodes.filter(n => n.tag === 'img').length, row.detailImages);
    assert.equal(nodes.filter(n => n.tag === 'table').length, row.tables);
  }
});
test('WT300 includes all six specifications and all three detail images', () => {
  const p = findProduct('legacy-176');
  assert.match(p.description, /100 kHz/);
  assert.match(p.description, /0.5 - 20 A/);
  assert.equal(walk(p.content.detail).filter(n => n.tag === 'img').length, 3);
  assert.equal(walk(p.content.summary).filter(n => n.tag === 'p' && walk(n.children || []).some(c => c.text?.trim())).length, 6);
});
test('rich descriptions retain tables and text; empty original stays empty', () => {
  const gl = walk(findProduct('legacy-217').content.detail);
  assert.equal(gl.filter(n => n.tag === 'table').length, 2);
  assert.ok(gl.filter(n => n.text).map(n => n.text).join('').length > 5000);
  assert.equal(walk(findProduct('legacy-219').content.detail).filter(n => n.tag === 'img').length, 10);
  assert.equal(findProduct('legacy-216').content.detail.length, 0);
});
test('legacy product pages do not send visitors to the former product page', () => {
  const page = readFileSync(new URL('../app/products/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /href=\{product\.legacyUrl\}|기존 제품정보 확인|ORIGINAL SOURCE/);
});
