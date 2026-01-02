import z from 'zod'

export const adminCreateDto = z.object({
  full_name: z.string().min(3, 'Full name must be at least 3 characters long'),
  email: z.string().refine((val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
    message: 'Invalid email format'
  }),
  profile_picture: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        return /^\+91[- ]?\d{3}\d{3}\d{4}$/.test(val)
      },
      {
        message: 'Phone number must be in the format +91 XXXXXXXXXX'
      }
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
})

export type AdminCreateDto = z.infer<typeof adminCreateDto>
