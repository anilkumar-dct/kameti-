import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from '../main/common/ApiResponse/IApiResponse'
import { KametiResponseDto } from '../main/kameti/schema/kametiRespone.dto'
import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { Kameti } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      kameti: {
        findAll: () => Promise<ApiResponse<KametiResponseDto[]>>
        findById: (id: number) => Promise<ApiResponse<KametiResponseDto>>
        findOne: (filter: Partial<Kameti>) => Promise<ApiResponse<KametiResponseDto>>
        create: (data: KametiCreateDto) => Promise<ApiResponse<KametiResponseDto>>
        update: (id: number, data: KametiUpdateDto) => Promise<ApiResponse<KametiResponseDto>>
        delete: (id: number) => Promise<ApiResponse<KametiResponseDto>>
      }
    }
  }
}
