# Projeto da Karla Muller para o Sites

Baixe **[karla-muller-site.zip](karla-muller-site.zip)** desta pasta. No GitHub, abra o arquivo ZIP e use o botão **Download raw file** (ícone de download).

O pacote contém o projeto completo: `index.html` na raiz, fontes de edição, imagens, estilos, scripts, dependências declaradas, licenças e orientações. Não inclui `.git`, `node_modules`, caches ou arquivos de ambiente.

## Enviar ao Sites

1. Baixe o ZIP e anexe-o ao Sites, se a interface oferecer envio desse formato.
2. Copie o pedido de [INSTRUCOES-PARA-O-SITES.md](INSTRUCOES-PARA-O-SITES.md).
3. Peça para usar o HTML e o visual fornecidos como base do site.
4. Confira a prévia antes de publicar, especialmente celular, imagem, navegação e WhatsApp.

Se o aplicativo não aceitar ZIP, extraia o pacote e envie o `index.html`. Ele já contém estilos, fontes e imagem, sem precisar instalar dependências para exibir o site. Para editar ou reconstruir o projeto, os fontes também estão no pacote.

O envio deste ZIP ao GitHub não faz o upload para o Sites nem publica um endereço público. As opções de importação e publicação dependem da interface disponibilizada pelo Sites.

## Atualizar o pacote

Depois de atualizar o projeto, execute `npm run build`, adicione os novos arquivos ao Git e execute `npm run package:sites`. O empacotamento usa Python 3, inclui os arquivos versionados do projeto e valida o ZIP gerado. A pasta `para-sites/` fica fora do conteúdo para evitar arquivos ZIP dentro de outros ZIPs; as instruções para o Sites são acrescentadas na raiz do pacote.
