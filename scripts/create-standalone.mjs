import { copyFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const entryFile = resolve(outputRoot, 'index.html');
const html = readFileSync(entryFile, 'utf8');
if (/<script[^>]*\bsrc=|<link[^>]*rel="stylesheet"|type="module"/.test(html)) {
  throw new Error('O build perdeu a página autônoma; verifique a configuração.');
}
copyFileSync(entryFile, resolve(outputRoot, 'karla-muller.html'));
copyFileSync(resolve(outputRoot, '../site-karla-muller.html'), resolve(outputRoot, 'site-karla-muller.html'));
console.log('Versão autônoma disponível em dist/index.html e dist/karla-muller.html.');
