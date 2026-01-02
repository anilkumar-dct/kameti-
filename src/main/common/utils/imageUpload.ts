import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

/**
 * Image Upload Service
 * Handles image uploads, storage, retrieval and deletion
 * Can be used for profiles, documents, and other image storage needs
 */
class ImageUploadService {
  private storageDir: string
  private imageDir: string

  constructor() {
    try {
      this.storageDir = app ? app.getPath('userData') : path.join(process.cwd(), 'storage')
    } catch {
      this.storageDir = path.join(process.cwd(), 'storage')
    }

    this.imageDir = path.join(this.storageDir, 'images')
    this.ensureDirectoryExists(this.imageDir)
  }

  /**
   * Ensure directory exists
   */
  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * Upload image file
   * @param category - Folder category (e.g., 'profiles', 'documents')
   * @param userId - User ID or identifier
   * @param imageBuffer - Image file buffer
   * @param extension - File extension (default: .jpg)
   * @returns File path and filename
   */
  uploadImage(
    category: string,
    userId: string | number,
    imageBuffer: Buffer,
    extension: string = '.jpg'
  ): { filepath: string; filename: string } {
    const categoryDir = path.join(this.imageDir, category)
    this.ensureDirectoryExists(categoryDir)

    const filename = `${userId}_${Date.now()}${extension}`
    const filepath = path.join(categoryDir, filename)

    fs.writeFileSync(filepath, imageBuffer)

    return {
      filepath,
      filename
    }
  }

  /**
   * Get image file path
   */
  getImagePath(category: string, filename: string): string {
    return path.join(this.imageDir, category, filename)
  }

  /**
   * Read image file
   */
  readImage(category: string, filename: string): Buffer {
    const filepath = this.getImagePath(category, filename)

    if (!fs.existsSync(filepath)) {
      throw new Error(`Image not found: ${filepath}`)
    }

    return fs.readFileSync(filepath)
  }

  /**
   * Check if image exists
   */
  imageExists(category: string, filename: string): boolean {
    const filepath = this.getImagePath(category, filename)
    return fs.existsSync(filepath)
  }

  /**
   * Delete image file
   */
  deleteImage(category: string, filename: string): boolean {
    const filepath = this.getImagePath(category, filename)

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
      return true
    }

    return false
  }

  /**
   * Delete all images for a user in a category
   */
  deleteUserImages(category: string, userId: string | number): boolean {
    try {
      const categoryDir = path.join(this.imageDir, category)

      if (!fs.existsSync(categoryDir)) {
        return false
      }

      const files = fs.readdirSync(categoryDir)
      const userIdStr = String(userId)

      for (const file of files) {
        if (file.startsWith(`${userIdStr}_`)) {
          fs.unlinkSync(path.join(categoryDir, file))
        }
      }

      return true
    } catch (error) {
      console.error('Error deleting user images:', error)
      return false
    }
  }

  /**
   * Get all images in a category
   */
  listImages(category: string): string[] {
    const categoryDir = path.join(this.imageDir, category)

    if (!fs.existsSync(categoryDir)) {
      return []
    }

    return fs.readdirSync(categoryDir)
  }

  /**
   * Get all images for a specific user
   */
  getUserImages(category: string, userId: string | number): string[] {
    const categoryDir = path.join(this.imageDir, category)

    if (!fs.existsSync(categoryDir)) {
      return []
    }

    const files = fs.readdirSync(categoryDir)
    const userIdStr = String(userId)

    return files.filter((file) => file.startsWith(`${userIdStr}_`))
  }

  /**
   * Get image file size
   */
  getImageSize(category: string, filename: string): number {
    const filepath = this.getImagePath(category, filename)

    if (!fs.existsSync(filepath)) {
      return 0
    }

    const stats = fs.statSync(filepath)
    return stats.size
  }

  /**
   * Validate image file (check if it's a valid image)
   */
  isValidImage(imageBuffer: Buffer): boolean {
    // Check for common image formats
    const jpegSignature = [0xff, 0xd8, 0xff]
    const pngSignature = [0x89, 0x50, 0x4e, 0x47]

    const bufferArray = Array.from(imageBuffer.slice(0, 4))

    // Check JPEG
    if (
      bufferArray[0] === jpegSignature[0] &&
      bufferArray[1] === jpegSignature[1] &&
      bufferArray[2] === jpegSignature[2]
    ) {
      return true
    }

    // Check PNG
    if (
      bufferArray[0] === pngSignature[0] &&
      bufferArray[1] === pngSignature[1] &&
      bufferArray[2] === pngSignature[2] &&
      bufferArray[3] === pngSignature[3]
    ) {
      return true
    }

    return false
  }
}

export const imageUploadService = new ImageUploadService()
export default imageUploadService
