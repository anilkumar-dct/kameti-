import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { AdminService } from '../service/AdminService'
import { AdminRegisterDto } from '../schema/adminRegister.dto'
import { AdminUpdateDto } from '../schema/adminUpdate.dto'
import { ApiResponse } from '../../common/interfaces/IApiResponse'
import { AdminResponseDto } from '../schema/adminResponse.dto'

export class AdminController {
  constructor(private adminService: AdminService) {
    this.registerHandler()
  }

  private registerHandler(): void {
    ipcMain.handle('admin:register', this.register.bind(this))
    ipcMain.handle('admin:update', this.update.bind(this))
  }

  private async register(
    _: IpcMainInvokeEvent,
    data: AdminRegisterDto
  ): Promise<ApiResponse<AdminResponseDto>> {
    return await this.adminService.register(data)
  }

  private async update(
    _: IpcMainInvokeEvent,
    id: number,
    data: AdminUpdateDto
  ): Promise<ApiResponse<AdminResponseDto>> {
    return await this.adminService.update(id, data)
  }
}
