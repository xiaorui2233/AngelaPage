import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xiaorui2233.github.io',
  base: '/AngelaPage',
  output: 'static',
  build: {
    format: 'file'
  }
});
