import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import pkg from '../../package.json';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../build/preload',
    lib: {
      entry: 'index.js',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env./* from mode option */NODE_ENV === 'production',
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  }
});
