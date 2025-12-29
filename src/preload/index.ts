import { contextBridge, ipcRenderer } from 'electron'
import { TodoInput } from '../main/todo/todo.schema'

contextBridge.exposeInMainWorld('todo', {
  create: (todoInput: TodoInput) => ipcRenderer.invoke('todo:create', todoInput),
  getAll: () => ipcRenderer.invoke('todo:getAll')
})
