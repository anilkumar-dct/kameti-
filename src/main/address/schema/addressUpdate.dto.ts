import { z } from 'zod'

/**
 * Zod validation schema for updating an Address.
 * All fields are optional because updates are partial.
 */
export const addressUpdateDto = z.object({
  /** House / Flat number (optional) */
  house_no: z
    .string()
    .min(1, 'House number cannot be empty')
    .max(50, 'House number must be at most 50 characters')
    .optional(),

  /** Locality / Area name (optional) */
  locality: z
    .string()
    .min(2, 'Locality must be at least 2 characters long')
    .max(100, 'Locality must be at most 100 characters')
    .optional(),

  /** City name (optional) */
  city: z
    .string()
    .min(2, 'City must be at least 2 characters long')
    .max(100, 'City must be at most 100 characters')
    .optional(),

  /** State name (optional) */
  state: z
    .string()
    .min(2, 'State must be at least 2 characters long')
    .max(100, 'State must be at most 100 characters')
    .optional(),

  /** Postal PIN code (optional, Indian format) */
  pin_code: z
    .string()
    .regex(/^\d{6}$/, 'PIN code must be a valid 6-digit Indian PIN')
    .optional()
})

/** TypeScript type inferred from the Zod schema */
export type AddressUpdateDto = z.infer<typeof addressUpdateDto>
