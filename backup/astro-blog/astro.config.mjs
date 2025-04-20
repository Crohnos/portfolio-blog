import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://crohnos.github.io',
  base: '/portfolio-blog',
  integrations: [
    mdx(), 
    sitemap(),
    react()
  ],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true
    }
  },
  output: 'static',
  build: {
    format: 'file',
    assets: '_assets'
  },
  server: {
    port: 3000,
    host: true
  }
});