import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TodoInput } from '../main/todo/todo.schema'

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

// Expose Todo APIs
contextBridge.exposeInMainWorld('todo', {
  create: (todoInput: TodoInput) => ipcRenderer.invoke('todo:create', todoInput),
  getAll: () => ipcRenderer.invoke('todo:getAll'),
  toggle: (id: number, completed: boolean) => ipcRenderer.invoke('todo:toggle', { id, completed }),
  delete: (id: number) => ipcRenderer.invoke('todo:delete', id)
})
