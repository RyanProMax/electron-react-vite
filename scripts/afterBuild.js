const fse = require('fs-extra');
const { resolve } = require('path');

const root = resolve(process.cwd(), 'build/app.content');
const htmlDir = resolve(root, 'src/app/pages');
const htmlFiles = fse.readdirSync(htmlDir);
if (htmlFiles && htmlFiles.length) {
  htmlFiles.forEach((file) => fse.copyFileSync(resolve(htmlDir, file), resolve(root, file)));
}
fse.rmSync(resolve(root, 'src'), { recursive: true });
