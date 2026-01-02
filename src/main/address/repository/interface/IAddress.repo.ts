import { PaginatedResponse } from '../../../common/interfaces/IPaginatedResponse'
import { AddressCreateDto } from '../../schema/addressCreate.dto'
import { AddressResponseDto } from '../../schema/addressResponse.dto'
import { AddressUpdateDto } from '../../schema/addressUpdate.dto'

export interface IAddressRepo {
  /** Finds all Address records with pagination. */
  findAll(): Promise<PaginatedResponse<AddressResponseDto>>
  /** Finds Address records by User ID. */
  findByUserId(userId: number): Promise<AddressResponseDto[]>
  /** Creates a new Address record. */
  create(data: AddressCreateDto): Promise<AddressResponseDto>
  /** Finds an Address record by its ID. */
  findById(id: number): Promise<AddressResponseDto | null>
  /** Updates an existing Address record. */
  update(id: number, data: Partial<AddressUpdateDto>): Promise<AddressResponseDto>
  /** Deletes an Address record. */
  delete(id: number): Promise<boolean>
}
