import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Kameti } from '@prisma/client'
import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { KametiQueryDto } from '../main/kameti/schema/kametiQuery.dto'

// Custom APIs for renderer
const api = {
  kameti: {
    findAll: (query?: KametiQueryDto) => ipcRenderer.invoke('kameti:findAll', query),
    findById: (id: number) => ipcRenderer.invoke('kameti:findById', id),
    findOne: (filter: Partial<Kameti>) => ipcRenderer.invoke('kameti:findOne', filter),
    create: (data: KametiCreateDto) => ipcRenderer.invoke('kameti:create', data),
    update: (id: number, data: KametiUpdateDto) => ipcRenderer.invoke('kameti:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('kameti:delete', id)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (defined in dts)
  window.electron = electronAPI
  // @ts-ignore (defined in dts)
  window.api = api
}
