import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import 'dotenv/config'

const runMigrate = async () => {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 })
  const db = drizzle(connection)

  console.log('Running migrations...')
  
  await migrate(db, { migrationsFolder: 'drizzle' })
  
  console.log('Migrations complete!')
  
  await connection.end()
  process.exit(0)
}

runMigrate().catch((err) => {
  console.error('Migration failed!')
  console.error(err)
  process.exit(1)
}) 