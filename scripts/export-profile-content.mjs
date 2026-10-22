// Export the existing typed content for the PDF generator without a second data source.
import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import sharp from 'sharp';
const source = readFileSync('src/content/es.ts', 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace("getGalleryItems('es')", '[]');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context = {exports:{}};
runInNewContext(compiled, context);
mkdirSync('tmp/pdfs', {recursive:true});
await sharp('public/images/profile.jpg').resize(360).jpeg({quality:83}).toFile('tmp/pdfs/portrait.jpg');
writeFileSync('tmp/pdfs/profile-content.json', JSON.stringify(context.exports.es, null, 2));
console.log('Exported executive profile data.');
