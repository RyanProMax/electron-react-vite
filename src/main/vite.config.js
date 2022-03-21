import { builtinModules } from 'module';
import { defineConfig } from 'vite';
/**
 * When ES module such as execa, node-fetch used in the Node.js project,
 * we should compile them into CommonJs modules to ensure that they can work.
 * https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/esmodule#readme
 */
import esmodule from 'vite-plugin-esmodule';
import pkg from '../../package.json';

export default defineConfig({
  root: __dirname,
  plugins: [
    esmodule(['electron-store'])
  ],
  build: {
    outDir: '../../build/main',
    lib: {
      entry: 'index.js',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env./* from mode option */NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules, // 不打包node modules
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  }
});
