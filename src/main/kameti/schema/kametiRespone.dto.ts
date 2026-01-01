import { KametiStatus } from '@prisma/client'
import { KametiMonthlyWithdrawalResponseDto } from './kametiMonthlyWithdrawalResponse.dto'

/**
 * Data Transfer Object representing a Kameti record returned from the database.
 * Formats the raw Prisma model for safe transmission to the Renderer process.
 */
export class KametiResponseDto {
  /** Numerical ID of the Kameti */
  id: number = 0

  /** Unique name/title */
  title: string = ''

  /** Total pool amount */
  budget: number = 0

  /** Total duration in months */
  months: number = 0

  /** Monthly contribution amount */
  installment: number = 0

  /** Current status based on KametiStatus enum */
  status: KametiStatus = KametiStatus.ACTIVE

  /** Record creation timestamp */
  createdAt: Date = new Date()

  /** Last update timestamp */
  updatedAt: Date = new Date()

  /** Optional list of monthly withdrawals associated with this Kameti */
  monthlyWithdrawals?: KametiMonthlyWithdrawalResponseDto[]
}
