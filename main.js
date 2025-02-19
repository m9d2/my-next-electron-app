// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:3000'); // Next.js 开发服务器地址
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  // 监听渲染进程请求显示消息框
  ipcMain.handle('show-message-box', async () => {
    const result = await dialog.showMessageBox(win, {
      type: 'info',
      title: '信息',
      message: '这是一个消息框。',
      buttons: ['OK']
    });
    return result.response;
  });

  // 监听渲染进程请求打开文件选择框
  ipcMain.handle('show-open-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    return result.filePaths;
  });

   // 监听渲染进程发送的执行命令请求
   ipcMain.handle('run-script', async (event, scriptPath) => {
    return new Promise((resolve, reject) => {
      // 使用 child_process 执行 shell 脚本
      exec(scriptPath, (error, stdout, stderr) => {
        if (error) {
          reject(`执行错误: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        resolve(stdout); // 返回标准输出
      });
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
