import { IpcMainInvokeEvent, ipcMain } from 'electron'
import { KametiService } from '../service/KametiService'
import { ApiResponse } from '../../common/interfaces/IApiResponse'
import { Kameti } from '@prisma/client'
import { KametiCreateDto } from '../schema/kametiCreate.dto'
import { KametiUpdateDto } from '../schema/kametiUpdate.dto'
import { KametiQueryDto } from '../schema/kametiQuery.dto'
import { PaginatedResponse } from '../../common/interfaces/IPaginatedResponse'

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

  private async findAll(
    _: IpcMainInvokeEvent,
    query?: KametiQueryDto
  ): Promise<ApiResponse<PaginatedResponse<Kameti>>> {
    return await this.kametiService.findAll(query)
  }

  private async findById(_: IpcMainInvokeEvent, id: number): Promise<ApiResponse<Kameti | null>> {
    return await this.kametiService.findById(id)
  }

  private async findOne(
    _: IpcMainInvokeEvent,
    filter: Partial<Kameti>
  ): Promise<ApiResponse<Kameti>> {
    return await this.kametiService.findOne(filter)
  }

  private async create(_: IpcMainInvokeEvent, data: KametiCreateDto): Promise<ApiResponse<Kameti>> {
    return await this.kametiService.create(data)
  }

  private async update(
    _: IpcMainInvokeEvent,
    id: number,
    data: KametiUpdateDto
  ): Promise<ApiResponse<Kameti>> {
    return await this.kametiService.update(id, data)
  }

  private async delete(_: IpcMainInvokeEvent, id: number): Promise<ApiResponse<boolean>> {
    return await this.kametiService.delete(id)
  }
}
