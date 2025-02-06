import { sql } from 'drizzle-orm'
import { client, db } from '.'
import { migrations } from './migrations'

const runMigrations = async () => {
  try {
    console.log('Running migrations...')
    for (const migration of migrations) {
      console.log(`Running migration: ${migration.name}`)
      await db.execute(migration.up)
    }
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
  process.exit(0)
}

runMigrations() 