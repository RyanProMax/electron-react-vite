import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// A vite plugin for import ui library component style automatic.
// https://github.com/onebay/vite-plugin-imp
import vitePluginImp from 'vite-plugin-imp';
/**
 * move entry files to the renderer root directory.
 * e.g: 'build/renderer/pages/home/index.html' -> 'build/renderer/home.html'
 * https://github.com/RyanProMax/vite-plugin-transfer-mpa
 */
import mpa from '@ryanpromax/vite-plugin-transfer-mpa';
import pkg from '../../package.json';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [react(), vitePluginImp(), mpa()],
  base: './',
  build: {
    sourcemap: true,
    outDir: '../../build/renderer',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'pages/home/index.html'),
        about: resolve(__dirname, 'pages/about/index.html')
      }
    }
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT
  }
});
