import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from '../main/common/interfaces/IApiResponse'
import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { Kameti } from '@prisma/client'
import { KametiQueryDto } from '../main/kameti/schema/kametiQuery.dto'
import { AdminRegisterDto } from '../main/admin/schema/adminRegister.dto'
import { AdminUpdateDto } from '../main/admin/schema/adminUpdate.dto'
import { AdminResponseDto } from '../main/admin/schema/adminResponse.dto'

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
      admin: {
        register: (data: AdminRegisterDto) => Promise<ApiResponse<AdminResponseDto>>
        update: (id: number, data: AdminUpdateDto) => Promise<ApiResponse<AdminResponseDto>>
      }
    }
  }
}
