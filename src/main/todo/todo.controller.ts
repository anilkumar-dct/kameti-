import { ipcMain } from 'electron'
import { prisma } from '../db'

ipcMain.handle('todo:create', async (_, todoInput) => {
  const todo = await prisma.todo.create({
    data: todoInput
  })
  return todo
})
