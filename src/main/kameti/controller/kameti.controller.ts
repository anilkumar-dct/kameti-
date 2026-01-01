import { IpcMainInvokeEvent, ipcMain } from 'electron'
import { KametiService } from '../service/KametiService'
import { ApiResponse } from '../../common/ApiResponse/IApiResponse'
import { KametiResponseDto } from '../schema/kametiRespone.dto'
import { Kameti } from '@prisma/client'
import { KametiCreateDto } from '../schema/kametiCreate.dto'
import { KametiUpdateDto } from '../schema/kametiUpdate.dto'

/**
 * Controller class responsible for handling IPC requests for the Kameti module.
 * Maps IPC channels to specific Service methods.
 */
export class KametiController {
  /**
   * Initializes the controller with the required service.
   * @param kametiService - The business logic service.
   */
  constructor(private kametiService: KametiService) {
    this.registerHandlers()
  }

  /**
   * Registers all IPC handlers for this controller.
   * Should be called once during app initialization.
   */
  private registerHandlers(): void {
    ipcMain.handle('kameti:findAll', this.findAll.bind(this))
    ipcMain.handle('kameti:findById', this.findById.bind(this))
    ipcMain.handle('kameti:findOne', this.findOne.bind(this))
    ipcMain.handle('kameti:create', this.create.bind(this))
    ipcMain.handle('kameti:update', this.update.bind(this))
    ipcMain.handle('kameti:delete', this.delete.bind(this))
  }

  // --- Handlers ---

  private async findAll(): Promise<ApiResponse<KametiResponseDto[]>> {
    return await this.kametiService.findAll()
  }

  private async findById(
    _: IpcMainInvokeEvent,
    id: number
  ): Promise<ApiResponse<KametiResponseDto | null>> {
    return await this.kametiService.findById(id)
  }

  private async findOne(
    _: IpcMainInvokeEvent,
    filter: Partial<Kameti>
  ): Promise<ApiResponse<KametiResponseDto>> {
    return await this.kametiService.findOne(filter)
  }

  private async create(
    _: IpcMainInvokeEvent,
    data: KametiCreateDto
  ): Promise<ApiResponse<KametiResponseDto>> {
    return await this.kametiService.create(data)
  }

  private async update(
    _: IpcMainInvokeEvent,
    id: number,
    data: KametiUpdateDto
  ): Promise<ApiResponse<KametiResponseDto>> {
    return await this.kametiService.update(id, data)
  }

  private async delete(_: IpcMainInvokeEvent, id: number): Promise<ApiResponse<boolean>> {
    return await this.kametiService.delete(id)
  }
}
