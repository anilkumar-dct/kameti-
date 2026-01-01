import z from 'zod'

/**
 * Zod validation schema for creating a new Kameti.
 * Ensures data integrity before reaching the database.
 */
export const kametiCreateDto = z.object({
  /** Unique name/title of the Kameti */
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),

  /** Total pool/budget amount for the Kameti */
  budget: z.number().min(1, 'Budget must be greater than 0'),

  /** Total duration in months */
  months: z.number().min(1, 'Months must be greater than 0'),

  /** Fixed monthly contribution amount from each participant */
  installment: z.number().min(1, 'Installment must be greater than 0'),

  /** Current lifecycle status of the Kameti */
  status: z.enum(['ACTIVE', 'INACTIVE', 'COMPLETED'])
})

/** TypeScript type inferred from the Creation Zod schema */
export type KametiCreateDto = z.infer<typeof kametiCreateDto>
