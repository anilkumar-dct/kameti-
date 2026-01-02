import { PrismaClient } from '@prisma/client'
import { KametiRepo } from './kameti/repository/implementation/Kameti.Repo'
import { KametiService } from './kameti/service/KametiService'
import { KametiController } from './kameti/controller/kameti.controller'
import { UserRepository } from './user/repository/implementation/user.repository'
import { UserService } from './user/services/user.services'
import { UserController } from './user/controller/user.controller'

/**
 * Composition Root (DI Container)
 *
 * This is the ONLY place in the application where concrete classes
 * are instantiated and their dependencies are wired together.
 */

// 1. Initialize the singleton database client
export const prisma = new PrismaClient()

// 2. Initialize Repositories (Inject dependencies)
const kametiRepo = new KametiRepo(prisma)
const userRepo = new UserRepository(prisma)

// 3. Initialize Services (Inject dependencies)
const kametiService = new KametiService(kametiRepo)
const userService = new UserService(userRepo)

// 4. Initialize Controllers (Sets up IPC listeners automatically)
export const kametiController = new KametiController(kametiService)
export const userController = new UserController(userService)
