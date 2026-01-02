/**
 * Data Transfer Object representing an Address record returned from the database.
 * Formats the raw Prisma model for safe transmission to the Renderer process.
 */
export class AddressResponseDto {
  /** Numerical ID of the address */
  id: number = 0

  /** House / Flat number (optional) */
  house_no?: string

  /** Locality / Area name (optional) */
  locality?: string

  /** City name */
  city: string = ''

  /** State name */
  state: string = ''

  /** Postal PIN code */
  pin_code: string = ''

  /** Related user ID (one-to-one relationship) */
  userId: number = 0

  /** Optional related user (if included via Prisma) */
  user?: {
    id: number
    name: string
  }

  created_at?: Date

  updated_at?: Date
}
