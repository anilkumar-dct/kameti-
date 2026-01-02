export class AdminResponseDto {
  id: number = 0
  full_name: string = ''
  email: string = ''
  phone: string | null = null
  profile_picture: string | null = null
  created_at: Date = new Date()
  updated_at: Date = new Date()
}
