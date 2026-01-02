import { AdminResponseDto } from '../../schema/adminResponse.dto'
import { AdminUpdateDto } from '../../schema/adminUpdate.dto'
import { AdminRegisterDto } from '../../schema/adminRegister.dto'
import { ICommonRepo } from '../../../common/interfaces/ICommon.Repo'
import { Admin } from '@prisma/client'

export interface IAdminRepo extends ICommonRepo<Admin, AdminRegisterDto> {
  update(id: number, data: AdminUpdateDto): Promise<AdminResponseDto>
}
