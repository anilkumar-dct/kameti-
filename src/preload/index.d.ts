import { ElectronAPI } from '@electron-toolkit/preload'
import { TodoInput } from '../main/todo/todo.schema'
import { Todo } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    todo:{
      create: (todoInput: TodoInput) => Promise<Todo>
      getAll: () => Promise<Todo[]>
    }
  }
}
