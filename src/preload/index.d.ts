import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from '../main/common/interfaces/IApiResponse'
import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { Kameti } from '@prisma/client'
import { KametiQueryDto } from '../main/kameti/schema/kametiQuery.dto'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      kameti: {
        findAll: (query?: KametiQueryDto) => Promise<ApiResponse<Kameti[]>>
        findById: (id: number) => Promise<ApiResponse<Kameti>>
        findOne: (filter: Partial<Kameti>) => Promise<ApiResponse<Kameti>>
        create: (data: KametiCreateDto) => Promise<ApiResponse<Kameti>>
        update: (id: number, data: KametiUpdateDto) => Promise<ApiResponse<Kameti>>
        delete: (id: number) => Promise<ApiResponse<Kameti>>
      }
    }
  }
}
