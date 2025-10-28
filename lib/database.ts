import bcrypt from 'bcryptjs';

// Detect environment and use appropriate database
const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production';

let db: any;
let sql: any;

if (isProduction) {
  // Use Neon Postgres in production (compatible with @vercel/postgres)
  const { neon } = require('@neondatabase/serverless');
  sql = neon(process.env.DATABASE_URL!);
} else {
  // Use SQLite for local development
  const Database = require('better-sqlite3');
  db = new Database('expnse.db');
}

// Initialize database tables
export async function initDatabase() {
  try {
    if (isProduction) {
      // Vercel Postgres schema
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

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

      await sql`
        CREATE TABLE IF NOT EXISTS user_settings (
          user_id INTEGER PRIMARY KEY,
          currency_code TEXT NOT NULL DEFAULT 'USD',
          currency_symbol TEXT NOT NULL DEFAULT '$',
          currency_name TEXT NOT NULL DEFAULT 'US Dollar',
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `;
    } else {
      // SQLite schema
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
          id TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          description TEXT NOT NULL,
          category TEXT NOT NULL,
          date TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          color TEXT NOT NULL,
          icon TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS user_settings (
          user_id INTEGER PRIMARY KEY,
          currency_code TEXT NOT NULL DEFAULT 'USD',
          currency_symbol TEXT NOT NULL DEFAULT '$',
          currency_name TEXT NOT NULL DEFAULT 'US Dollar',
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// User operations
export const userDb = {
  create: async (username: string, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    if (isProduction) {
      const result = await sql`
        INSERT INTO users (username, password) 
        VALUES (${username}, ${hashedPassword}) 
        RETURNING id
      `;
      return result[0].id;
    } else {
      const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
      const info = stmt.run(username, hashedPassword);
      return info.lastInsertRowid;
    }
  },

  findByUsername: async (username: string) => {
    if (isProduction) {
      const result = await sql`
        SELECT * FROM users WHERE username = ${username}
      `;
      return result[0] as { id: number; username: string; password: string } | undefined;
    } else {
      const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
      return stmt.get(username) as { id: number; username: string; password: string } | undefined;
    }
  },

  findById: async (userId: number) => {
    if (isProduction) {
      const result = await sql`
        SELECT * FROM users WHERE id = ${userId}
      `;
      return result[0] as { id: number; username: string; password: string } | undefined;
    } else {
      const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
      return stmt.get(userId) as { id: number; username: string; password: string } | undefined;
    }
  },

  updatePassword: async (userId: number, newPassword: string) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    
    if (isProduction) {
      await sql`
        UPDATE users SET password = ${hashedPassword} WHERE id = ${userId}
      `;
    } else {
      const stmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
      stmt.run(hashedPassword, userId);
    }
  },

  verifyPassword: (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};

// Expense operations
export const expenseDb = {
  getAll: async (userId: number) => {
    if (isProduction) {
      const result = await sql`
        SELECT * FROM expenses WHERE user_id = ${userId} ORDER BY date DESC
      `;
      return result;
    } else {
      const stmt = db.prepare('SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC');
      return stmt.all(userId);
    }
  },

  create: async (userId: number, expense: any) => {
    if (isProduction) {
      await sql`
        INSERT INTO expenses (id, user_id, amount, description, category, date, created_at)
        VALUES (${expense.id}, ${userId}, ${expense.amount}, ${expense.description}, 
                ${expense.category}, ${expense.date}, ${expense.createdAt})
      `;
    } else {
      const stmt = db.prepare(
        'INSERT INTO expenses (id, user_id, amount, description, category, date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      );
      stmt.run(expense.id, userId, expense.amount, expense.description, expense.category, expense.date, expense.createdAt);
    }
  },

  delete: async (userId: number, expenseId: string) => {
    if (isProduction) {
      await sql`
        DELETE FROM expenses WHERE id = ${expenseId} AND user_id = ${userId}
      `;
    } else {
      const stmt = db.prepare('DELETE FROM expenses WHERE id = ? AND user_id = ?');
      stmt.run(expenseId, userId);
    }
  },
};

// Category operations
export const categoryDb = {
  getAll: async (userId: number) => {
    if (isProduction) {
      const result = await sql`
        SELECT * FROM categories WHERE user_id = ${userId}
      `;
      return result;
    } else {
      const stmt = db.prepare('SELECT * FROM categories WHERE user_id = ?');
      return stmt.all(userId);
    }
  },

  create: async (userId: number, category: any) => {
    if (isProduction) {
      await sql`
        INSERT INTO categories (id, user_id, name, color, icon)
        VALUES (${category.id}, ${userId}, ${category.name}, ${category.color}, ${category.icon})
      `;
    } else {
      const stmt = db.prepare('INSERT INTO categories (id, user_id, name, color, icon) VALUES (?, ?, ?, ?, ?)');
      stmt.run(category.id, userId, category.name, category.color, category.icon);
    }
  },

  delete: async (userId: number, categoryId: string) => {
    if (isProduction) {
      await sql`
        DELETE FROM categories WHERE id = ${categoryId} AND user_id = ${userId}
      `;
    } else {
      const stmt = db.prepare('DELETE FROM categories WHERE id = ? AND user_id = ?');
      stmt.run(categoryId, userId);
    }
  },
};

// Settings operations
export const settingsDb = {
  get: async (userId: number) => {
    if (isProduction) {
      const result = await sql`
        SELECT * FROM user_settings WHERE user_id = ${userId}
      `;
      return result[0];
    } else {
      const stmt = db.prepare('SELECT * FROM user_settings WHERE user_id = ?');
      return stmt.get(userId);
    }
  },

  set: async (userId: number, currency: any) => {
    if (isProduction) {
      await sql`
        INSERT INTO user_settings (user_id, currency_code, currency_symbol, currency_name)
        VALUES (${userId}, ${currency.code}, ${currency.symbol}, ${currency.name})
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          currency_code = ${currency.code},
          currency_symbol = ${currency.symbol},
          currency_name = ${currency.name}
      `;
    } else {
      const stmt = db.prepare(`
        INSERT INTO user_settings (user_id, currency_code, currency_symbol, currency_name)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          currency_code = excluded.currency_code,
          currency_symbol = excluded.currency_symbol,
          currency_name = excluded.currency_name
      `);
      stmt.run(userId, currency.code, currency.symbol, currency.name);
    }
  },
};
