import { UserStatus } from '@prisma/client'

/**
 * Data Transfer Object representing a User record returned from the database.
 * Formats the raw Prisma model for safe transmission to the Renderer process.
 */
export class UserResponseDto {
  /** Numerical ID of the user */
  id: number = 0

  /** Full name of the user */
  name: string = ''

  /** Father's name (optional) */
  father_name?: string

  /** Phone number (optional, unique) */
  phone_no?: string

  /** Profile image path (optional) */
  profile_image?: string

  status?: UserStatus

  /** Aadhaar number (optional) */
  aadhaar_number?: string

  /** Reference user ID (self-referencing) */
  reference?: number

  /** Record creation timestamp */
  created_at: Date = new Date()

  /** Last update timestamp */
  updated_at: Date = new Date()

  /** Optional referrer user (self relation) */
  referrer?: UserResponseDto

  /** Optional list of referred users */
  referrals?: UserResponseDto[]
}
