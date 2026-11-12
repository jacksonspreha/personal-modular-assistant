// Runs before the page loads, with access to both Node and the page.
// Later, use contextBridge here to safely expose features to the UI, e.g.:
//
// const { contextBridge, ipcRenderer } = require('electron');
// contextBridge.exposeInMainWorld('api', {
//   readFile: (p) => ipcRenderer.invoke('read-file', p),
// });
