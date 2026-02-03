import { getDb, closeDb, postDb, tagDb, categoryDb } from '../src/server/db/index.js'

async function initDatabase() {
  console.log('Initializing database...')

  const db = getDb()

  // Check if already initialized
  const postCount = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number }
  if (postCount.count > 0) {
    console.log('Database already initialized with posts')
    closeDb()
    return
  }

  console.log('Database initialized successfully')
  console.log('Default admin user: admin / admin123')
  console.log('Run `npm run seed-db` to populate with sample posts')

  closeDb()
}

initDatabase().catch(console.error)
