import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { UserService } from '../services/user.services'
import { UserCreateDto } from '../schema/userCreate.dto'
import { UserUpdateDto } from '../schema/userUpdate.dto'
import { User } from '@prisma/client'
import { ApiResponse } from '../../common/interfaces/IApiResponse'

/**
 * Controller class responsible for handling IPC requests for the User module.
 * Maps IPC channels to specific Service methods.
 */
export class UserController {
  /**
   * Initializes the controller with the required service.
   * @param userService - The business logic service.
   */
  constructor(private userService: UserService) {
    this.registerHandlers()
  }

  /**
   * Registers all IPC handlers for this controller.
   * Should be called once during app initialization.
   */
  private registerHandlers(): void {
    ipcMain.handle('user:findById', this.findById.bind(this))
    ipcMain.handle('user:findOne', this.findOne.bind(this))
    ipcMain.handle('user:create', this.create.bind(this))
    ipcMain.handle('user:update', this.update.bind(this))
    ipcMain.handle('user:delete', this.delete.bind(this))
  }

  // --- Handlers ---

  private async findById(_: IpcMainInvokeEvent, id: number): Promise<ApiResponse<User | null>> {
    return await this.userService.findById(id)
  }

  private async findOne(_: IpcMainInvokeEvent, filter: Partial<User>): Promise<ApiResponse<User>> {
    return await this.userService.findOne(filter)
  }

  private async create(_: IpcMainInvokeEvent, data: UserCreateDto): Promise<ApiResponse<User>> {
    return await this.userService.create(data)
  }

  private async update(
    _: IpcMainInvokeEvent,
    id: number,
    data: UserUpdateDto
  ): Promise<ApiResponse<User>> {
    return await this.userService.update(id, data)
  }

  private async delete(_: IpcMainInvokeEvent, id: number): Promise<ApiResponse<boolean>> {
    return await this.userService.delete(id)
  }
}
