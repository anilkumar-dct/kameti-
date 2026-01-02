import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from '../main/common/interfaces/IApiResponse'
import { PaginatedResponse } from '../main/common/interfaces/IPaginatedResponse'

import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { Kameti } from '@prisma/client'
import { KametiQueryDto } from '../main/kameti/schema/kametiQuery.dto'

import { User } from '@prisma/client'
import { UserCreateDto } from '../main/user/schema/userCreate.dto'
import { UserUpdateDto } from '../main/user/schema/userUpdate.dto'
import { UserResponseDto } from '../main/user/schema/UserResponse.dto'
import { AdminRegisterDto } from '../main/admin/schema/adminRegister.dto'
import { AdminUpdateDto } from '../main/admin/schema/adminUpdate.dto'
import { AdminResponseDto } from '../main/admin/schema/adminResponse.dto'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      kameti: {
        findAll: (query?: KametiQueryDto) => Promise<ApiResponse<PaginatedResponse<Kameti>>>
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
      user: {
        findAll: () => Promise<ApiResponse<PaginatedResponse<UserResponseDto>>>
        findById: (id: number) => Promise<ApiResponse<UserResponseDto | null>>
        findOne: (filter: Partial<User>) => Promise<ApiResponse<UserResponseDto | null>>
        create: (data: UserCreateDto) => Promise<ApiResponse<UserResponseDto>>
        update: (id: number, data: UserUpdateDto) => Promise<ApiResponse<UserResponseDto>>
        delete: (id: number) => Promise<ApiResponse<UserResponseDto>>
      }
    }
  }
}
