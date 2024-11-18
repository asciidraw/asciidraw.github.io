import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    }
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(__dirname, './src/locales/**'),
      runtimeOnly: false,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
