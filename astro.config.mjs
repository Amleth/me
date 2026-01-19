// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://amleth.github.io',
  base: '/me',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});