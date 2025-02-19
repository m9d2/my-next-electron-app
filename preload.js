const { contextBridge, ipcRenderer, getCurrentWindow } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showMessageBox: () => ipcRenderer.invoke('show-message-box'),
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  runScript: (scriptPath) => ipcRenderer.invoke('run-script', scriptPath),
  enableWindowDragging: () => {
    const titlebar = document.getElementById('titlebar');
    if (titlebar) {
      titlebar.addEventListener('mousedown', (event) => {
        console.log('mousedown', event);
        const { x, y } = event;
        const win = getCurrentWindow(); // 获取当前窗口对象
        win.setBounds({ x: x, y: y }); // 更新窗口位置
        win.setResizable(true);  // 使窗口可以重新调整大小
      });
    }
  },
});