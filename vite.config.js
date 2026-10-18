import { defineConfig } from 'vite';
import { relative } from 'node:path';
import { buildPage } from './scripts/build-page.mjs';

export default defineConfig({
  // Mantém imagens, fontes e bundles dentro da pasta em que o site é publicado.
  base: './',
  plugins: [{
    name: 'karla-page-source',
    configureServer(server) {
      server.watcher.add(['src', 'public']);
      server.watcher.on('change', file => {
        const path = relative(server.config.root, file).replaceAll('\\', '/');
        if (path.startsWith('src/') || path.startsWith('public/')) {
          try {
            buildPage();
            buildPage({ compact: true });
            server.ws.send({ type: 'full-reload' });
          } catch (error) {
            // Uma gravação incompleta não deve encerrar o servidor nem apagar a última página válida.
            server.config.logger.error(`Não foi possível atualizar a página: ${error.message}`);
            server.ws.send({
              type: 'error',
              err: { message: error.message, stack: error.stack ?? '' },
            });
          }
        }
      });
    },
  }],
  build: {
    // A versão autônoma incorpora o script, sem dependências de módulos externos.
    modulePreload: false,
  },
});
