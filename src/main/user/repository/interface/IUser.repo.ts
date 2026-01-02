import { User } from '@prisma/client'
import { ICommonRepo } from '../../../common/interfaces/ICommon.Repo'
import { UserCreateDto } from '../../schema/userCreate.dto'
import { UserUpdateDto } from '../../schema/userUpdate.dto'

export interface IUserRepo extends ICommonRepo<User, UserCreateDto> {
  /** Finds a single record matching specific scalar filters (e.g. phone_no, email). */
  findOne(filter: Partial<User>): Promise<User | null>
  /** Updates an existing User record. */
  update(id: number, data: Partial<UserUpdateDto>): Promise<User>
  /** Deletes a User record. */
  delete(id: number): Promise<boolean>
}
