import z from 'zod'

export const adminLoginDto = z.object({
  email: z.string().min(3, 'Email or full_name must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export type AdminLoginDto = z.infer<typeof adminLoginDto>
