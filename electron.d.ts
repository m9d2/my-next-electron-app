// electron.d.ts
declare global {
    interface Window {
      electronAPI: {
        showMessageBox: () => Promise<any>;
        showOpenDialog: () => Promise<string[]>;
        runScript: (scriptPath: string) => Promise<string>;
        enableWindowDragging: () => void;
      };
    }
  }
  
  export {};
  