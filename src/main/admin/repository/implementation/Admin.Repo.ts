import { Admin } from '@prisma/client'
import { CommonRepo } from '../../../common/CommonRepo/Common.Repo'
import { AdminUpdateDto } from '../../schema/adminUpdate.dto'
import { AdminRegisterDto } from '../../schema/adminRegister.dto'
import { IAdminRepo } from '../interface/IAdmin.Repo'
import { PrismaClient } from '@prisma/client'

export class AdminRepo extends CommonRepo<Admin, AdminRegisterDto> implements IAdminRepo {
  constructor(private prisma: PrismaClient) {
    super(prisma.admin)
  }

  async update(id: number, data: AdminUpdateDto): Promise<Admin> {
    const result = await this.prisma.admin.update({ where: { id }, data })
    return result
  }
}
