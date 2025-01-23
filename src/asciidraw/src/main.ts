import './assets/index.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from '@/router';
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

const app = createApp(App)

function detectLocale() {
  const stored = localStorage.getItem('i18n-locale');
  if (stored) return stored;

  const availableLocales = Object.keys(messages as object);
  for (const language of navigator.languages) {
    if (availableLocales.includes(language)) return language;
  }

  return null;
}

const i18n = createI18n({
  locale: detectLocale() ?? navigator.language,
  fallbackLocale: 'en',
  messages,
});

app.use(i18n);
app.use(router);

app.mount('#app');
