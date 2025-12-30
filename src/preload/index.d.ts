import { ElectronAPI } from '@electron-toolkit/preload'
import { TodoInput } from '../main/todo/todo.schema'
import { Todo } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    todo: {
      create: (todoInput: TodoInput) => Promise<Todo>
      getAll: () => Promise<Todo[]>
      toggle: (id: number, completed: boolean) => Promise<Todo>
      delete: (id: number) => Promise<void>
    }
  }
}
