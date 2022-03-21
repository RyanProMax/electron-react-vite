import { app, ipcMain } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { CHANNEL_NAME } from '../global/constant';

export default class AppStore {
  constructor() {
    this.storePath = path.resolve(app.getPath('userData'), 'MyAppStore');
    this.model = [
      { name: 'user', schema: { name: { type: 'string', default: '张三' } } },
      { name: 'data' }
    ];
    this.dataStore = new Map();
    this.windowStore = new Map();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppStore();
    }
    return this.instance;
  }

  init() {
    this.model.forEach((storeModel) => {
      this.dataStore.set(storeModel.name, new Store({
        ...storeModel,
        cwd: this.storePath
      }));
    });

    ipcMain.handle(CHANNEL_NAME.ELECTRON_STORE, (event, { name, method, payload }) => {
      const targetStore = this.dataStore.get(name);
      if (targetStore && typeof targetStore[method] === 'function') {
        return targetStore[method](payload);
      }
      return false;
    });
  }
}
