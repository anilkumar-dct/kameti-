export class AdminResponseDto {
  id: number = 0
  full_name: string = ''
  email: string = ''
  phone: string = ''
  profile_picture: string = ''
  created_at: Date = new Date()
  updated_at: Date = new Date()
}
