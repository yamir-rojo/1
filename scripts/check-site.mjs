import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML ids');
for (const anchor of anchors) assert(ids.includes(anchor), `Missing section: #${anchor}`);
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'The page must have one primary heading');
assert(!/militar|ej[eé]rcito|\barmy\b|armed forces/i.test(html), 'Excluded content in page');
const manifest = JSON.parse(readFileSync('src/content/gallery.manifest.json', 'utf8'));
assert(manifest.length > 0, 'Empty gallery');
for (const item of manifest) {
  for (const path of [item.src, item.thumbSrc]) assert(existsSync(`public${path}`), `Missing gallery asset: ${path}`);
  assert(item.captionEs && item.alt, `Missing caption: ${item.id}`);
}
const assets = [...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)"/g)].map(match => match[1]);
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
for (const path of assets) {
  const localPath = basePath && path.startsWith(`${basePath}/`) ? path.slice(basePath.length) : path;
  assert(existsSync(`dist${localPath}`), `Missing built asset: ${path}`);
}
assert.deepEqual(readdirSync('dist/documents'), ['yamir-rojo-perfil-ejecutivo.pdf']);
console.log(`Site integrity OK: ${anchors.length} section links, ${manifest.length} gallery entries, ${assets.length} built asset references, one executive PDF.`);
