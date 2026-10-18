import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(root, 'public');
const mimeTypes = {
  '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
};

function dataUrl(file, type) {
  return `data:${type};base64,${readFileSync(file).toString('base64')}`;
}

function embeddedFont(packageName, fileName, family, style, weight, compact) {
  const file = compact
    ? resolve(publicRoot, 'preview/fonts', fileName)
    : resolve(root, 'node_modules', '@fontsource-variable', packageName, 'files', fileName);
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url('${dataUrl(file, 'font/woff2')}') format('woff2');}`;
}

export function buildPage({ compact = false } = {}) {
  const fonts = [
    embeddedFont('cormorant-garamond', 'cormorant-garamond-latin-wght-normal.woff2', 'Cormorant Garamond Variable', 'normal', '300 700', compact),
    embeddedFont('cormorant-garamond', 'cormorant-garamond-latin-wght-italic.woff2', 'Cormorant Garamond Variable', 'italic', '300 700', compact),
    embeddedFont('manrope', 'manrope-latin-wght-normal.woff2', 'Manrope Variable', 'normal', '200 800', compact),
  ].join('\n');
  const styles = fonts + '\n' + readFileSync(resolve(root, 'src/styles.css'), 'utf8');
  const script = '(() => {\n' + readFileSync(resolve(root, 'src/main.js'), 'utf8') + '\n})();';
  new Script(script, { filename: 'src/main.js' });
  if (/<\/style/i.test(styles) || /<\/script/i.test(script)) {
    throw new Error('Os fontes contêm uma tag de fechamento incompatível com HTML incorporado.');
  }

  let html = readFileSync(resolve(root, 'src/page.html'), 'utf8')
    .replace('{{STYLES}}', () => styles)
    .replace('{{SCRIPT}}', () => script)
    .replace('{{FAVICON}}', () => dataUrl(resolve(publicRoot, 'favicon.svg'), 'image/svg+xml'));

  html = html.replace(/<img\b[^>]*>/g, tag => tag.replace(/\bsrc="([^"]+)"/, (attribute, src) => {
    if (!src.startsWith('./images/')) throw new Error('As imagens devem estar em public/images/.');
    const file = compact && src === './images/educacao-pesquisa.webp'
      ? resolve(publicRoot, 'preview/educacao-pesquisa.webp')
      : resolve(publicRoot, src);
    const path = relative(publicRoot, file);
    if (path.startsWith('..') || isAbsolute(path)) throw new Error('Imagem fora de public/.');
    const type = mimeTypes[extname(file)];
    if (!type) throw new Error('Formato de imagem sem suporte.');
    return `src="${dataUrl(file, type)}"`;
  }));

  if (/\{\{(?:STYLES|SCRIPT|FAVICON)\}\}/.test(html)) throw new Error('Marcador não resolvido no template.');
  if (/<script[^>]*\bsrc=|<link[^>]*rel="stylesheet"|type="module"/.test(html)) {
    throw new Error('A página principal não pode depender de módulos ou folhas de estilo externos.');
  }
  const output = html.replace('<!doctype html>', '<!doctype html>\n<!-- Gerado de src/page.html. Edite os fontes em src/. -->');
  const outputFile = resolve(root, compact ? 'site-karla-muller.html' : 'index.html');
  if (readExisting(outputFile) !== output) writeFileSync(outputFile, output);
  return outputFile;
}

function readExisting(file) {
  try { return readFileSync(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return ''; throw error; }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const compact = process.argv.includes('--compact');
  const file = buildPage({ compact });
  console.log(`${file} gerado com estilos, fontes, imagem e menu incorporados.`);
}
