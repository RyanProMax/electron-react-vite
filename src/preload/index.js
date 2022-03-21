import fs from 'fs';
import { contextBridge, ipcRenderer } from 'electron';

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs);
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  SUBSCRIBE: (channel, listener) => {
    const subscription = (event, ...args) => listener(...args);
    // subcribe
    ipcRenderer.on(channel, subscription);
    // return unsubcribe function
    return () => ipcRenderer.removeListener(channel, subscription);
  }
});
