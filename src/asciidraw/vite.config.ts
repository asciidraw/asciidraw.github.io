import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

import MarkdownPlugin from 'unplugin-vue-markdown/vite';
import MarkdownItPrism from 'markdown-it-prism';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import { execSync } from "node:child_process";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __GIT_REPOSITORY_OWNER__: JSON.stringify(getGitRepositoryOwner()),
    __GIT_REPOSITORY_NAME__: JSON.stringify(getGitRepositoryName()),
    __GIT_BRANCH__: JSON.stringify(getGitBranch()),
    __GIT_COMMIT_HASH__: JSON.stringify(getGitCommitHash()),
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    VueI18nPlugin({
      include: resolve(__dirname, './src/locales/**'),
      runtimeOnly: false,
    }),
    MarkdownPlugin({
      markdownItSetup(md) {
        md.use(MarkdownItPrism);
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.linkInsideHeader()
        });
        md.use(MarkdownItGitHubAlerts);

        md.renderer.rules.link_open = (tokens, idx) => {
          const href = tokens[idx].attrGet('href')?.replace(/index\.(?:md|html)$/g, '');
          return `<docs-link to="${href}">`;
        };
        md.renderer.rules.link_close = () => {
          return '</docs-link>';
        };
      },
      transforms: {
        extraScripts: () => {
          return [
            "import DocsLink from '@/docs/components/DocsLink.vue';",
          ];
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});


function _execCmd(cmd: string): string {
  try {
    return execSync(cmd).toString().trim();
  } catch (error) {
    console.error(error);
    return '';
  }
}
function getGitRepositoryOwner(): string {
  return _execCmd("git config --get remote.origin.url | sed -n 's/.*github.com[:/]\\([^/]*\\).*/\\1/p'\n");
}
function getGitRepositoryName(): string {
  return _execCmd("basename -s .git `git config --get remote.origin.url`");
}
function getGitBranch(): string {
  return _execCmd('git branch --show-current');
}
function getGitCommitHash(): string {
  return _execCmd('git rev-parse HEAD');
}
