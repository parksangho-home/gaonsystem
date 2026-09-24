"""Rebuild complete product content from preserved crawl snapshots; --check audits it."""
import json
import hashlib
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHECK = '--check' in sys.argv
VOID = {'img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'area', 'embed', 'col'}
ALLOWED = {'p', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 'sub', 'sup', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'br', 'hr'}

class Parser(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = {'tag': 'root', 'attrs': {}, 'children': []}
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = {'tag': tag, 'attrs': dict(attrs), 'children': []}
        self.stack[-1]['children'].append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i]['tag'] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1]['children'].append({'text': data})

def walk(node):
    yield node
    for child in node.get('children', []):
        yield from walk(child)

def plain(nodes):
    return re.sub(r'\s+', ' ', ' '.join(n['text'] for node in nodes for n in walk(node) if 'text' in n)).strip()

manifest = json.loads((ROOT / 'crawl-output/manifest.json').read_text(encoding='utf-8'))
catalog = json.loads((ROOT / 'web/data/crawled-products.json').read_text(encoding='utf-8'))
sources = {p['id']: p for p in manifest['products']}
files = {i['source']: i['file'] for p in manifest['products'] for i in p['images']}
metadata_script = "const fs=require('fs'),sharp=require('sharp'); Promise.all(JSON.parse(fs.readFileSync(0,'utf8')).map(async p=>{const m=await sharp(p).metadata();return [p,{width:m.width,height:m.height}]})).then(x=>console.log(JSON.stringify(Object.fromEntries(x))));"
paths = sorted({str(ROOT / 'crawl-output' / f) for f in files.values()})
result = subprocess.run(['node', '-e', metadata_script], input=json.dumps(paths), text=True, capture_output=True, cwd=ROOT / 'web', check=True)
dimensions = json.loads(result.stdout)
assets = {}

def image(source, alt=''):
    source = source.split('?')[0]
    if source not in files:
        raise ValueError(f'Missing downloaded source image: {source}')
    original = ROOT / 'crawl-output' / files[source]
    local = '/images/products/legacy/' + original.name
    assets[local] = original
    return {'tag': 'img', 'src': local, 'source': source, 'alt': alt, **dimensions[str(original)]}

def clean(nodes):
    output = []
    for node in nodes:
        if 'text' in node:
            output.append(node)
            continue
        tag, attrs = node['tag'], node['attrs']
        if tag in {'script', 'style'}:
            continue
        if tag == 'img':
            output.append(image(attrs['src'], attrs.get('alt', '')))
            continue
        children = clean(node['children'])
        if tag not in ALLOWED:
            output.extend(children)
            continue
        item = {'tag': tag, 'children': children}
        for key in ('colspan', 'rowspan'):
            if attrs.get(key, '').isdigit():
                item[key] = int(attrs[key])
        output.append(item)
    return output

records, audit = {}, []
for entry in catalog:
    source = sources[entry['id']]
    html = (ROOT / 'crawl-output' / source['pageFile']).read_text(encoding='utf-8')
    tree = Parser(html).root
    summary = next(n for n in walk(tree) if 'goods_summary' in n.get('attrs', {}).get('class', '').split())
    detail = next(n for n in walk(tree) if n.get('attrs', {}).get('id') == 'prodDetailPC')
    mobile = next(n for n in walk(tree) if n.get('attrs', {}).get('id') == 'prodDetailMobile')
    assert detail['children'] == mobile['children'], f"Mobile content differs: {entry['id']}"
    summary_nodes, detail_nodes = clean(summary['children']), clean(detail['children'])
    for original, migrated in [(summary['children'], summary_nodes), (detail['children'], detail_nodes)]:
        assert plain(original) == plain(migrated), f"Text missing: {entry['id']}"
        before = [n['attrs']['src'].split('?')[0] for node in original for n in walk(node) if n.get('tag') == 'img']
        after = [n['source'] for node in migrated for n in walk(node) if n.get('tag') == 'img']
        assert before == after, f"Image order/content missing: {entry['id']}"
    records[entry['id']] = {'summary': summary_nodes, 'detail': detail_nodes, 'description': plain(summary_nodes), 'hero': image(entry['gallery'][0], entry['title'])}
    audit.append({'id': entry['id'], 'sourceFile': source['pageFile'], 'summaryCharacters': len(plain(summary_nodes)), 'detailCharacters': len(plain(detail_nodes)), 'detailImages': sum(n.get('tag') == 'img' for n in walk(detail)), 'tables': sum(n.get('tag') == 'table' for n in walk(detail)), 'status': 'complete' if plain(detail_nodes) or any(n.get('tag') == 'img' for n in walk(detail)) else 'source-detail-empty'})

for local, original in assets.items():
    target = ROOT / 'web/public' / local.lstrip('/')
    if CHECK:
        assert target.exists() and target.read_bytes() == original.read_bytes(), f'Asset mismatch: {local}'
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(original, target)

for relative, data in [('web/data/imported-product-content.json', records), ('web/docs/product-content-audit.json', audit)]:
    target = ROOT / relative
    if CHECK:
        assert json.loads(target.read_text(encoding='utf-8')) == data, f'Stale generated data: {relative}'
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
baseline_paths = [ROOT / 'web/public' / local.lstrip('/') for local in sorted(assets)]
baseline_paths.append(ROOT / 'web/data/imported-product-content.json')
baseline = {path.relative_to(ROOT / 'web').as_posix(): hashlib.sha256(path.read_bytes()).hexdigest() for path in baseline_paths}
baseline_file = ROOT / 'web/docs/product-assets.json'
if CHECK:
    assert json.loads(baseline_file.read_text(encoding='utf-8')) == baseline, 'Stale published asset baseline'
else:
    baseline_file.write_text(json.dumps(baseline, indent=2) + '\n', encoding='utf-8')
print(f"{'Checked' if CHECK else 'Imported'} {len(records)} products; {sum(a['detailImages'] for a in audit)} detail images; {len(assets)} local assets. Text and image order match saved sources.")
