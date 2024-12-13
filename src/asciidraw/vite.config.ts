import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path';

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import MarkdownPlugin from 'unplugin-vue-markdown/vite'
import MarkdownItPrism from 'markdown-it-prism'
import MarkdownItAnchor from 'markdown-it-anchor'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    VueI18nPlugin({
      include: resolve(__dirname, './src/locales/**'),
      runtimeOnly: false,
    }),
    MarkdownPlugin({
      markdownItSetup(md) {
        md.use(MarkdownItPrism);
        md.use(MarkdownItAnchor, { permalink: MarkdownItAnchor.permalink.linkInsideHeader() });
        md.renderer.rules.link_open = (tokens, idx) => {
          const href = tokens[idx].attrGet('href');
          return `<docs-link to="${href}">`;
        };
        md.renderer.rules.link_close = () => {
          return '</docs-link>';
        };
      },
      transforms: {
        extraScripts: () => {
          return [
            "import DocsLink from '@/docs/components/DocsLink.vue';"
          ];
        },
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
