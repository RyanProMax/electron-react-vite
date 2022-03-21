import { build } from 'vite';
import { resolve } from 'path';
import fse from 'fs-extra';

const BUILD_DIR = resolve(process.cwd(), 'build');
const RENDERER_BUILD_DIR = resolve(BUILD_DIR, 'renderer');
const PRELOAD_BUILD_DIR = resolve(BUILD_DIR, 'preload');
const MAIN_BUILD_DIR = resolve(BUILD_DIR, 'main');

/**
 * move entry files to the renderer root directory.
 * for example: 'build/renderer/pages/home/index.html' -> 'build/renderer/home.html'
 */
function handleMoveEntry() {
  const entryDir = resolve(RENDERER_BUILD_DIR, 'pages');
  const entryNames = fse.readdirSync(entryDir);
  entryNames.forEach((entryName) => fse.moveSync(resolve(entryDir, entryName, 'index.html'), resolve(RENDERER_BUILD_DIR, `${entryName}.html`)));
  fse.removeSync(entryDir);
}

(async () => {
  // build renderer
  fse.emptyDirSync(RENDERER_BUILD_DIR);
  await build({ configFile: 'src/renderer/vite.config.js' });
  handleMoveEntry();

  // build preload
  fse.emptyDirSync(PRELOAD_BUILD_DIR);
  await build({ configFile: 'src/preload/vite.config.js' });

  // build main
  fse.emptyDirSync(MAIN_BUILD_DIR);
  await build({ configFile: 'src/main/vite.config.js' });
})();
