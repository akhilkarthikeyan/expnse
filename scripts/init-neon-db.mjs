// Script to initialize Neon database tables
// Run with: node scripts/init-neon-db.mjs

import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load environment variables from .env.development.local
dotenv.config({ path: '.env.development.local' });

const sql = neon(process.env.DATABASE_URL);

async function initDatabase() {
  try {
    console.log('🔄 Connecting to Neon database...');
    
    // Test connection
    const result = await sql`SELECT version()`;
    console.log('✅ Connected to Neon Postgres:', result[0].version.split(' ')[1]);
    
    console.log('\n🔄 Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Users table created');
    
    console.log('🔄 Creating expenses table...');
    await sql`
      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    console.log('✅ Expenses table created');
    
    console.log('🔄 Creating categories table...');
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    console.log('✅ Categories table created');
    
    console.log('🔄 Creating user_settings table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_settings (
        user_id INTEGER PRIMARY KEY,
        currency_code TEXT NOT NULL DEFAULT 'USD',
        currency_symbol TEXT NOT NULL DEFAULT '$',
        currency_name TEXT NOT NULL DEFAULT 'US Dollar',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    console.log('✅ User settings table created');
    
    // Verify tables
    console.log('\n🔄 Verifying tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log('✅ Tables in database:');
    tables.forEach(t => console.log(`   - ${t.table_name}`));
    
    console.log('\n✅ Database initialization complete!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
