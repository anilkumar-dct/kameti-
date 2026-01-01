import { PrismaClient } from '@prisma/client'
import { KametiRepo } from './kameti/repository/implementation/Kameti.Repo'
import { KametiService } from './kameti/service/KametiService'
import { KametiController } from './kameti/controller/kameti.controller'

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

// 3. Initialize Services (Inject dependencies)
const kametiService = new KametiService(kametiRepo)

// 4. Initialize Controllers (Sets up IPC listeners automatically)
export const kametiController = new KametiController(kametiService)
