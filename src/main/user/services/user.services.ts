import { imageUploadService } from '../../../utils/imageUpload'
import { userRepository } from '../repository/user.repository'

export class UserService {
 

  async createUser(data: any) {
    if (!data.phone_no && !data.reference) {
      throw new Error('Phone number is required when user is not created via reference')
    }

    const findUserById = await userRepository.findById(data.reference)

    if (!findUserById) {
      throw new Error('Reference user not found')
    }

    let profileImagePath: string | null = null

    if (data.profile_image) {
      try {
        if (!imageUploadService.isValidImage(data.profile_image)) {
          throw new Error('Invalid image format')
        }

        const { filepath } = imageUploadService.uploadImage(
          'profiles',
          data.name,
          data.profile_image,
          '.jpg'
        )
        profileImagePath = filepath
      } catch (error) {
        console.error('Error uploading profile image:', error)
        throw new Error(`Image upload failed: ${error}`)
      }
    }

    const userData: any = {
      name: data.name,
      father_name: data.father_name,
      phone_no: data.phone_no,
      profile_image: profileImagePath,
      status: data.status,
      aadhaar_number: data.aadhaar_number,
      reference: data.reference
    }

    return userRepository.create(userData)
  }

  async deleteUser(id: number) {
    await imageUploadService.deleteUserImages('profiles', id)
    return await userRepository.delete(id)
  }
  
  async updateUser(id: number, data: any) {
    const existingUser = await userRepository.findById(id)
    if (!existingUser) {
      throw new Error('User not found')
    }
    const updatedData: any = { ...data }

    if (data.profile_image) {
      try {
        if (!imageUploadService.isValidImage(data.profile_image)) {
          throw new Error('Invalid image format')
        }
        imageUploadService.deleteImage('profiles', existingUser.profile_image || '')
        const { filepath } = imageUploadService.uploadImage(
          'profiles',
          data.name || existingUser.name,
          data.profile_image,

          '.jpg'
        )
        updatedData.profile_image = filepath
      } catch (error) {
        console.error('Error uploading profile image:', error)
        throw new Error(`Image upload failed: ${error}`)
      }
    }
    return userRepository.update(id, updatedData)
  }
}

export const userServices = new UserService()
