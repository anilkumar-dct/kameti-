import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Expose standard Electron APIs
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (defined in index.d.ts)
  window.electron = electronAPI
}
