import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { addressService } from '../services/address.services'
import { AddressCreateDto } from '../schema/addressCreate.dto'
import { AddressResponseDto } from '../schema/addressResponse.dto'
import { AddressUpdateDto } from '../schema/addressUpdate.dto'
import { PaginatedResponse } from '../../common/interfaces/IPaginatedResponse'
import { ApiResponse } from '../../common/interfaces/IApiResponse'

export class AddressController {
  /**
   * Initializes the controller with the required service.
   * @param addressService - The business logic service.
   */
  constructor(private addressService: addressService) {
    this.registerHandlers()
  }

  private registerHandlers(): void {
    ipcMain.handle('address:create', this.create.bind(this))
    ipcMain.handle('address:findByUserId', this.findByUserId.bind(this))
    ipcMain.handle('address:update', this.update.bind(this))
    // ipcMain.handle('address:delete', this.delete.bind(this))
    ipcMain.handle('address:findAll', this.findAll.bind(this))
  }

  private async create(
    _: IpcMainInvokeEvent,
    data: AddressCreateDto
  ): Promise<ApiResponse<AddressResponseDto>> {
    return await this.addressService.create(data)
  }
  private async findByUserId(
    _: IpcMainInvokeEvent,
    userId: number
  ): Promise<ApiResponse<AddressResponseDto[]>> {
    return await this.addressService.findByUserId(userId)
  }
  private async update(
    _: IpcMainInvokeEvent,
    id: number,
    data: AddressUpdateDto
  ): Promise<ApiResponse<AddressResponseDto>> {
    return await this.addressService.update(id, data)
  }
  // private async delete(id: number): Promise<ApiResponse<null>> {
  //   return await this.addressService.delete(id)
  // }
  private async findAll(): Promise<ApiResponse<PaginatedResponse<AddressResponseDto>>> {
    return await this.addressService.findAll()
  }
}
