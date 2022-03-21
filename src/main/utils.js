import { app } from 'electron';
import path from 'path';

export const isDev = !app.isPackaged;

/**
 * return the correct entry path
 * for example:
 *  - development: http://127.0.0.1:9527/pages/home/index.html
 */
export const parsePageUrl = (entryName) => (isDev
  ? `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}/pages/${entryName}/index.html`
  : path.resolve(__dirname, '..', 'renderer', `${entryName}.html`));
