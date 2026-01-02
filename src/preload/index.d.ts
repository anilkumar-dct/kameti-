import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from '../main/common/ApiResponse/IApiResponse'
import { PaginatedResponse } from '../main/common/interfaces/IPaginatedResponse'

import { KametiResponseDto } from '../main/kameti/schema/kametiRespone.dto'
import { KametiCreateDto } from '../main/kameti/schema/kametiCreate.dto'
import { KametiUpdateDto } from '../main/kameti/schema/kametiUpdate.dto'
import { Kameti } from '@prisma/client'
import { KametiQueryDto } from '../main/kameti/schema/kametiQuery.dto'

import { User } from '@prisma/client'
import { UserCreateDto } from '../main/user/schema/userCreate.dto'
import { UserUpdateDto } from '../main/user/schema/userUpdate.dto'
import { UserResponseDto } from '../main/user/schema/UserResponse.dto'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      kameti: {
        findAll: (
          query?: KametiQueryDto
        ) => Promise<ApiResponse<PaginatedResponse<KametiResponseDto>>>
        findById: (id: number) => Promise<ApiResponse<KametiResponseDto>>
        findOne: (filter: Partial<Kameti>) => Promise<ApiResponse<KametiResponseDto>>
        create: (data: KametiCreateDto) => Promise<ApiResponse<KametiResponseDto>>
        update: (id: number, data: KametiUpdateDto) => Promise<ApiResponse<KametiResponseDto>>
        delete: (id: number) => Promise<ApiResponse<KametiResponseDto>>
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
