# Neon Postgres Setup Guide

This guide will help you set up Neon Postgres for your Expnse app on Vercel.

## Prerequisites

- A Vercel project deployed
- Access to the Neon Console (via Vercel Storage tab)

## Step 1: Create Neon Database

1. Go to your Vercel Dashboard
2. Navigate to your **expnse** project
3. Click on the **Storage** tab
4. Click **Create Database** → Select **Neon**
5. Name it `expnse-db` and click **Create**
6. Vercel will automatically add the `DATABASE_URL` environment variable to your project

## Step 2: Initialize Database Schema

1. From the Vercel Storage tab, click **Open in Neon Console**
2. Navigate to the **SQL Editor**
3. Run the following SQL commands to create all required tables:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id INTEGER PRIMARY KEY,
  currency_code TEXT NOT NULL DEFAULT 'USD',
  currency_symbol TEXT NOT NULL DEFAULT '$',
  currency_name TEXT NOT NULL DEFAULT 'US Dollar',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Step 3: Verify Environment Variables

Your `DATABASE_URL` should be automatically set by Vercel. To verify locally:

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.development.local
   ```

4. Your `.env.development.local` should now contain:
   ```
   DATABASE_URL="postgresql://..."
   ```

## Step 4: Deploy

The app is already configured to use Neon in production. Simply deploy:

```bash
git add .
git commit -m "Configure Neon Postgres integration"
git push origin main
```

Vercel will automatically deploy with the Neon database connected.

## Step 5: Test Registration

1. Visit your deployed app on Vercel
2. Try registering a new user
3. The user should be created in your Neon database
4. Verify by running this query in the Neon SQL Editor:
   ```sql
   SELECT * FROM users;
   ```

## Troubleshooting

### Registration Error: "Registration failed"

**Cause**: Database tables not created or DATABASE_URL not set

**Solution**:
1. Verify DATABASE_URL exists in Vercel project settings
2. Ensure all tables are created (run Step 2 SQL commands)
3. Redeploy the application

### Connection Timeout

**Cause**: Neon database may be in sleep mode (free tier)

**Solution**:
1. Run a simple query in Neon SQL Editor to wake it up
2. Free tier databases sleep after inactivity - consider upgrading for production

### Local Development

For local development, the app uses SQLite automatically. Your local `expnse.db` file remains separate from production Neon database.

To test with Neon locally:
1. Pull env vars: `vercel env pull .env.development.local`
2. Set `VERCEL=true` or `NODE_ENV=production` in your local environment
3. Run: `npm run dev`

## Migration from Local SQLite to Neon

If you have existing data in local SQLite that you want to migrate:

1. Export data from SQLite
2. Use the Neon SQL Editor or a migration script to import
3. See `MIGRATION.md` for detailed steps (to be created)

## Key Differences: Neon vs Vercel Postgres

- **Neon driver**: Returns results as arrays directly (e.g., `result[0]`)
- **@vercel/postgres**: Returns results wrapped in `.rows` property (e.g., `result.rows[0]`)

The app has been updated to handle Neon's response format correctly.

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Neon + Next.js Guide](https://neon.tech/docs/guides/nextjs)
- [Vercel Storage Documentation](https://vercel.com/docs/storage)
