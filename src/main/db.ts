import { execSync } from 'child_process'
import path from 'path'
import { app } from 'electron'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function runMigrations() {
  const dbPath = path.join(app.getPath('userData'), 'kameti.db')
  const dbUrl = `file:${dbPath}`
  
  // Set DATABASE_URL for Prisma Client and Migrator
  process.env.DATABASE_URL = dbUrl

  const isDev = !app.isPackaged
  
  let prismaPath: string
  let schemaPath: string

  if (isDev) {
    prismaPath = path.join(process.cwd(), 'node_modules', 'prisma', 'build', 'index.js')
    schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
  } else {
    const appPath = path.join(process.resourcesPath, 'app.asar.unpacked')
    prismaPath = path.join(appPath, 'node_modules', 'prisma', 'build', 'index.js')
    schemaPath = path.join(appPath, 'prisma', 'schema.prisma')
    
    if (!fs.existsSync(prismaPath)) {
        prismaPath = path.join(process.resourcesPath, 'node_modules', 'prisma', 'build', 'index.js')
    }
  }

  console.log(`[Migration] Starting migrations for: ${dbUrl}`)
  
  const runCommand = (cmd: string) => {
    try {
      return execSync(cmd, {
        env: { ...process.env, DATABASE_URL: dbUrl },
        encoding: 'utf8'
      })
    } catch (e: any) {
      return e.stdout + e.stderr
    }
  }

  const deployCommand = `node "${prismaPath}" migrate deploy --schema "${schemaPath}"`
  const result = runCommand(deployCommand)
  
  if (result.includes('Migrations completed successfully') || result.includes('No pending migrations')) {
    console.log('[Migration] Success: No pending migrations or all applied.')
    return
  }

  if (result.includes('P3018') || result.includes('already exists') || result.includes('failed to apply')) {
    console.log('[Migration] Detected failed or baseline migration. Attempting auto-resolution...')
    
    // Find migrations
    const migrationsDir = path.join(path.dirname(schemaPath), 'migrations')
    if (fs.existsSync(migrationsDir)) {
      const migrations = fs.readdirSync(migrationsDir)
        .filter(f => fs.lstatSync(path.join(migrationsDir, f)).isDirectory())
        .sort()
      
      if (migrations.length > 0) {
        const firstMigration = migrations[0]
        console.log(`[Migration] Attempting to resolve: ${firstMigration}`)
        
        // Resolve as applied
        const resolveCommand = `node "${prismaPath}" migrate resolve --applied "${firstMigration}" --schema "${schemaPath}"`
        const resolveResult = runCommand(resolveCommand)
        console.log('[Migration] Resolve output:', resolveResult)

        // Try deploy again
        const retryResult = runCommand(deployCommand)
        console.log('[Migration] Retry output:', retryResult)
      }
    }
  } else {
    console.log('[Migration] Unexpected output:', result)
  }
}