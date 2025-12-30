import { ipcMain } from 'electron'
import { prisma } from '../db'

ipcMain.handle('todo:create', async (_, todoInput) => {
  const todo = await prisma.todo.create({
    data: todoInput
  })
  return todo
})

ipcMain.handle('todo:getAll', async () => {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
})

ipcMain.handle('todo:toggle', async (_, { id, completed }) => {
  return await prisma.todo.update({
    where: { id },
    data: { completed }
  })
})

ipcMain.handle('todo:delete', async (_, id) => {
  return await prisma.todo.delete({
    where: { id }
  })
})
