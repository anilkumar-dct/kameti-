import { z } from 'zod'

/**
 * Zod validation schema for creating a new Address.
 * Ensures data integrity before reaching the database.
 */
export const addressCreateDto = z.object({
  /** House / Flat number (optional) */
  house_no: z
    .string()
    .min(1, 'House number cannot be empty')
    .max(50, 'House number must be at most 50 characters long')
    .optional(),

  /** Locality / Area name (optional) */
  locality: z
    .string()
    .min(2, 'Locality must be at least 2 characters long')
    .max(100, 'Locality must be at most 100 characters long')
    .optional(),

  /** City name */
  city: z
    .string()
    .min(2, 'City must be at least 2 characters long')
    .max(100, 'City must be at most 100 characters long'),

  /** State name */
  state: z
    .string()
    .min(2, 'State must be at least 2 characters long')
    .max(100, 'State must be at most 100 characters long'),

  /** Indian PIN code (6 digits) */
  pin_code: z.string().regex(/^\d{6}$/, 'Pin code must be exactly 6 digits'),

  /** Related User ID (one-to-one relationship) */
  userId: z.number().int().positive()
})

/** TypeScript type inferred from the Zod schema */
export type AddressCreateDto = z.infer<typeof addressCreateDto>
