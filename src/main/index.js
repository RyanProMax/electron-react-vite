import { app, BrowserWindow } from 'electron';
import path from 'path';
import registerIpcEvent from './ipcEvent';
import AppStore from './store';
import { parsePageUrl } from './utils';

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs')
    }
  });
  mainWindow.loadURL(parsePageUrl('home'));
  mainWindow.webContents.openDevTools();

  mainWindow.on('close', () => app.quit());

  return mainWindow;
};

(async () => {
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  await app.whenReady();
  const mainWindow = await createWindow();

  app.on('second-instance', () => {
    if (mainWindow) {
      // Focus on the main window if the user tried to open another
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      createWindow();
    }
  });

  // init store
  const appStore = AppStore.getInstance();
  appStore.init();
  appStore.windowStore.set('mainWindow', mainWindow);

  // register ipc event
  registerIpcEvent();
})();
