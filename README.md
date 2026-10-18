# Karla Muller — Pedagoga e Professora

Portfólio profissional em português, com apresentação, consultoria, pesquisa, espaços para artigos e projetos e contato pelo WhatsApp. Visual em bege, terracota e rosé. A página principal é autônoma: estilos, fontes, imagem e script estão incorporados ao próprio HTML.

## Desenvolvimento

Requer Node.js 24 (ou versão compatível com `package.json`) e npm.

```bash
cd /workspace/KARLAAA-SITE-2
npm ci --cache /workspace/.cache/karla-npm
npm run dev -- --port 5173 --strictPort
```

O servidor de desenvolvimento atende na porta 5173. Não são necessários banco de dados, credenciais ou variáveis de ambiente.

## Versão de produção

```bash
npm run build
npm run preview -- --port 4173 --strictPort
```

O diretório `dist/` pode ser publicado em uma hospedagem de sites estáticos. A publicação não é feita automaticamente. O site não envia mensagens por conta própria: os links abrem o WhatsApp com uma mensagem sugerida que o visitante pode editar e enviar.

O HTML não precisa buscar recursos visuais externos. Isso permite publicar o conteúdo de `dist/` tanto na raiz de um domínio quanto em uma subpasta, como `/KARLAAA-SITE-2/`.

## Abrir o site sem instalar nada

A nova versão de teste é **`site-karla-muller.html`**, na raiz do projeto. Ela mantém o visual claro e todos os conteúdos do modelo, com fontes para português e imagem otimizadas e incorporadas. É um HTML independente, sem imports, links de folhas de estilo ou imagens externas. Para recriá-la, execute `npm run build:site`; a cópia também é incluída em `dist/site-karla-muller.html` durante o build.

O **`index.html` da raiz** já contém a página completa, com CSS, fontes, imagem e menu incorporados. Ele pode ser aberto por uma prévia que renderiza apenas o arquivo HTML, sem resolver módulos JavaScript ou dependências npm. O layout também funciona quando a prévia bloqueia JavaScript; nesse caso, os links de navegação ficam visíveis no celular.

Depois de `npm run build`, **`dist/index.html`** e **`dist/karla-muller.html`** oferecem a mesma versão autônoma. Não dependem de Node, servidor ou internet para exibir o conteúdo; o contato pelo WhatsApp continua precisando de conexão.

Para hospedagem, publique os arquivos da pasta `dist/`. Para editar, continue usando os fontes e gere uma nova versão com `npm run build`.

## Problemas de visualização

- O `index.html` da raiz e os HTMLs de `dist/` são autônomos. Não há imports npm ou requisições de CSS, fontes e imagens para resolver na prévia.
- Não abra `src/page.html`: ele é um template de edição, com marcadores substituídos pelo gerador.
- Depois de editar os fontes, execute `npm run prepare:page` ou `npm run build`. O servidor de desenvolvimento acompanha as alterações de `src/` e `public/` e atualiza a entrada automaticamente.
- Capturas e caminhos internos como `/tmp/...` ou `/workspace/...` não são endereços públicos do site.
- Se um proxy de desenvolvimento exibir `Blocked request. This host is not allowed`, é necessário identificar o hostname real e permiti-lo explicitamente com a configuração suportada pelo Vite (`__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`), reiniciando o servidor. Não libere todos os hosts.

## Conteúdo

Veja [o guia de atualização](docs/CONTEUDO.md). Não há painel administrativo. Os dados são editados nos arquivos do projeto.

- `src/page.html`: textos, seções, metadados e links de contato. Este é o template editável.
- `index.html`: página autônoma gerada; não editar diretamente, pois será recriada.
- `src/styles.css`: cores, tipografia e layout.
- `src/main.js`: comportamento do menu móvel, incorporado no fim do HTML.
- `public/images/`: imagens do site.
- `scripts/build-page.mjs`: incorpora estilos, fontes, imagens e script na página principal.
- `vite.config.js`: atualização automática dos fontes no desenvolvimento.
- `scripts/create-standalone.mjs`: valida a autonomia do build e cria a cópia para baixar.
- `public/preview/`: fontes com caracteres para português, licenças e imagem otimizada para a versão de teste. Os fontes originais permanecem em suas dependências e em `public/images/`.

As experiências detalhadas, o retrato, o título oficial do TCC e os artigos/projetos aguardam os materiais reais. A imagem de livros é uma ilustração gerada para o site, não um registro do trabalho da Karla.
