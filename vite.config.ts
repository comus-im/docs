import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://comus-im.github.io/docs/
export default defineConfig({
  base: '/docs/',
  plugins: [react()],
});
