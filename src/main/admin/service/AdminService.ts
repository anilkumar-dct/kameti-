import { IAdminRepo } from '../repository/interface/IAdmin.Repo'
import { ApiResponse } from '../../common/interfaces/IApiResponse'
import { ResponseFactory } from '../../common/ApiResponse/Response.Factory'
import { AdminResponseDto } from '../schema/adminResponse.dto'
import { adminUpdateDto, AdminUpdateDto } from '../schema/adminUpdate.dto'
import { adminRegisterDto, AdminRegisterDto } from '../schema/adminRegister.dto'
import { ValidationUtils } from '../../common/utils/ValidationUtils'
import { MapperUtils } from '../../common/utils/MapperUtils'

/**
 * Service class for handling Admin-related business logic.
 */
export class AdminService {
  constructor(private adminRepo: IAdminRepo) {}

  /**
   * Creates a new Admin record.
   * @param data - The admin registration data.
   * @returns The created admin record or validation error.
   */
  async register(data: AdminRegisterDto): Promise<ApiResponse<AdminResponseDto>> {
    try {
      const validatedData = ValidationUtils.validate(adminRegisterDto, data)
      if (!validatedData.success) return validatedData.error

      const admin = await this.adminRepo.create(validatedData.data)
      const adminDto = MapperUtils.toDto(admin, AdminResponseDto)

      return ResponseFactory.success(adminDto, 'CREATED', 'Admin Created Successfully')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Authenticates an admin.
   * @param data - Login credentials.
   * @returns Student record if successful.
   */
  async update(id: number, data: AdminUpdateDto): Promise<ApiResponse<AdminResponseDto>> {
    try {
      const validatedData = ValidationUtils.validate(adminUpdateDto, data)
      if (!validatedData.success) return validatedData.error

      const admin = await this.adminRepo.update(id, validatedData.data)
      return ResponseFactory.success(admin, 'OK', 'Admin Updated Successfully')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }
}
