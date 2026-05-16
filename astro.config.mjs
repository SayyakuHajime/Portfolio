import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sayyakuhajime.github.io',
  base: '/Portfolio',
  output: 'static',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
