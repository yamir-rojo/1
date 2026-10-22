import sharp from 'sharp';
const portrait = await sharp('public/images/profile.jpg').resize(560,630,{fit:'cover',position:'centre'}).jpeg({quality:85}).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><clipPath id="photo"><rect x="660" y="0" width="540" height="630"/></clipPath></defs>
<rect width="1200" height="630" fill="#172c2a"/>
<image href="data:image/jpeg;base64,${portrait.toString('base64')}" x="650" width="560" height="630" clip-path="url(#photo)"/>
<rect x="660" width="540" height="630" fill="#172c2a" opacity=".12"/>
<g font-family="Arial,sans-serif"><rect x="52" y="48" width="49" height="49" fill="none" stroke="#abc5a5"/>
<text x="61" y="81" fill="#c3dfc5" font-size="25" font-weight="bold">YR</text>
<text x="120" y="79" fill="#e7eee2" font-size="20">Yamir Rojo</text>
<text x="52" y="207" fill="#a8c0a2" font-size="12" letter-spacing="2">DIRECCIÓN DE OPERACIONES &amp; SUPPLY CHAIN</text>
<text x="48" y="285" fill="#f7f8f5" font-size="58" letter-spacing="-2">Visión estratégica.</text>
<text x="48" y="353" fill="#f7f8f5" font-size="58" letter-spacing="-2">Resultados</text>
<text x="48" y="421" fill="#c3dfc5" font-size="58" letter-spacing="-2">en terreno.</text>
<path d="M52 493H602" stroke="#ffffff" opacity=".2"/>
<text x="52" y="533" fill="#e7eee2" font-size="17">Yamir Moisés Rojo Andrade</text>
<text x="52" y="563" fill="#a8c0a2" font-size="13">Minería · Logística · Transporte · Chile</text></g></svg>`;
await sharp(Buffer.from(svg)).jpeg({quality:88}).toFile('public/og-image.jpg');
console.log('Built 1200 × 630 social preview.');
