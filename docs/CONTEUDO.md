# Atualizar o conteúdo

Edite o template `src/page.html`, os estilos em `src/styles.css` e o comportamento em `src/main.js`. Execute `npm run prepare:page` para recriar o `index.html` principal ou `npm run build` para atualizar também `dist/`. O `index.html` é uma saída gerada; não o edite diretamente.

## Dados confirmados

- Nome: Karla Muller.
- Formação: Pedagogia pela Univel, sem ano informado.
- Experiência em escolas, sem instituições, funções ou períodos detalhados.
- Cascavel, Paraná, com consultoria também online.
- Consultoria: orientação de professores e planejamento pedagógico.
- TCC com foco na ressocialização de pessoas privadas de liberdade. O título oficial ainda não foi informado; “Educação e ressocialização” descreve o tema.
- WhatsApp: +55 (45) 99921-8148.
- Apresentação em terceira pessoa, identidade educacional e acolhedora.

## Retrato

Salve a foto autorizada como `public/images/karla-muller.jpg`. Dentro de `.portrait-frame` em `src/page.html`, substitua o bloco `.portrait-placeholder` por:

```html
<img class="portrait-image" src="./images/karla-muller.jpg"
  alt="Karla Muller, pedagoga e professora"
  width="800" height="1100" fetchpriority="high" />
```

Ajuste as dimensões para as dimensões reais da imagem. A classe existente aplica o recorte em arco. O gerador incorpora as imagens locais do template ao HTML. Prefira uma foto vertical e confira o enquadramento no celular.

## Trajetória

A seção `#sobre` tem um comentário indicando onde adicionar escolas, funções e períodos. Inclua apenas dados confirmados. Não invente datas, cargos, depoimentos, certificações ou resultados.

## TCC, artigos e projetos

O destaque do TCC está em `#trabalhos`. Troque o texto provisório pelo título oficial e a apresentação quando fornecidos. O livro é uma imagem ilustrativa, gerada para compor o visual.

As linhas “Artigos” e “Projetos pedagógicos” são avisos de conteúdo futuro, sem links fictícios. Quando houver material real, podemos criar páginas HTML individuais e adicionar links a essas páginas, PDFs ou publicações externas. Cada trabalho deve ter título, resumo, autoria, data quando conhecida e material autorizado. Não exponha dados ou imagens identificáveis de crianças sem a autorização adequada.

## WhatsApp

Há dois links `https://wa.me/5545999218148` em `src/page.html`: um para consultoria e outro para contato geral. Se o número mudar, atualize ambos. O parâmetro `text` é a mensagem sugerida, codificada para URL. Nenhuma mensagem é enviada automaticamente.

## Cores e publicação

Os tokens estão no início de `src/styles.css`. Depois de editar, execute `npm run build` e confira o site em desktop e celular. Para colocar no ar, publique `dist/` em uma hospedagem estática e configure o domínio escolhido. Quando o endereço público estiver definido, podemos adicionar URL canônica e metadados de compartilhamento com esse domínio.
