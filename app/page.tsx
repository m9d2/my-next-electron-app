'use client';

import React, { useState } from "react";
import { useEffect } from "react";


export default function Home() {
  const [output, setOutput] = useState<string | null>(null);
  useEffect(() => {
    if (!window.electronAPI) {
      console.log("This is not running in Electron");
    }
  }, []);
  const handleShowMessageBox = async () => {
    if (window.electronAPI) {
      const response = await window.electronAPI.showMessageBox();
      console.log('Message box response:', response);
    }
  };

  const handleShowOpenDialog = async () => {
    if (window.electronAPI) {
      const filePaths = await window.electronAPI.showOpenDialog();
      console.log('Selected file paths:', filePaths);
    }
  };
  const handleRunScript = async () => {
    try {
      const result = await window.electronAPI.runScript('ls'); // 替换为你的脚本路径
      setOutput(result);
    } catch (error) {
      console.error('执行脚本失败:', error);
    }
  };
  return (
    <div>
      <select>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>

      <button onClick={handleShowMessageBox}>显示消息框</button>
      <button onClick={handleShowOpenDialog}>选择文件</button>
      <div>
        <button onClick={handleRunScript}>执行脚本</button>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
