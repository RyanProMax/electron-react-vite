import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { CHANNEL_NAME } from '../global/constant';
import AppStore from './store';
import { isDev, parsePageUrl } from './utils';

const appStore = AppStore.getInstance();

export default function registerIpcEvent() {
  ipcMain.handle(CHANNEL_NAME.INIT_SUB_WINDOW, (event, {
    name, page, config, message
  }) => {
    try {
      let subWindow = appStore.windowStore.get(name);
      if (!subWindow) {
        console.log('preload', path.join(__dirname, '../preload/index.cjs'));
        subWindow = new BrowserWindow({
          width: 600,
          height: 450,
          minWidth: 600,
          minHeight: 450,
          webPreferences: {
            preload: path.join(__dirname, '../preload/index.cjs')
          },
          ...config
        });
        subWindow.loadURL(parsePageUrl(page));
        if (isDev) {
          subWindow.webContents.openDevTools();
        }
        appStore.windowStore.set(name, subWindow);
        subWindow.on('close', () => appStore.windowStore.delete(name));

        // 如果创建窗口时携带参数一并发送，节省一次IPC通信
        if (message) {
          subWindow.webContents.on('did-finish-load', () => {
            subWindow.webContents.send(CHANNEL_NAME.RECEIVE_MESSAGE, message);
          });
        }
      } else {
        if (!subWindow.isVisible()) {
          subWindow.show();
        }
        subWindow.focus();
        if (message) {
          subWindow.webContents.send(CHANNEL_NAME.RECEIVE_MESSAGE, message);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  });
}
