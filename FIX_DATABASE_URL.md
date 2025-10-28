# Fix: Missing DATABASE_URL in Vercel

## The Problem

Your deployment is failing with:
```
VercelPostgresError - 'missing_connection_string': You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.
```

This means the `DATABASE_URL` environment variable is not set in your Vercel project.

## Quick Fix (5 minutes)

### Option 1: Connect Neon via Vercel Marketplace (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your `expnse` project**
3. **Go to Storage tab**
4. **Click "Create Database"** or **"Connect Store"**
5. **Select "Neon"** from the marketplace
6. **Click "Continue"** → **"Create"**
7. **Choose your project** (`expnse`) to connect
8. Vercel will automatically:
   - Create a Neon database
   - Add `DATABASE_URL` to your environment variables
   - Redeploy your app

### Option 2: Add Existing Neon Database URL Manually

If you already created a Neon database separately:

1. **Get your Neon connection string**:
   - Go to Neon Console: https://console.neon.tech
   - Select your database
   - Click "Connection Details"
   - Copy the connection string (looks like: `postgresql://user:password@host/database`)

2. **Add to Vercel**:
   - Go to Vercel Dashboard → Your `expnse` project
   - Settings → Environment Variables
   - Click "Add New"
   - **Key**: `DATABASE_URL`
   - **Value**: Paste your Neon connection string
   - **Environments**: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy**:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## Verify It's Fixed

After adding the environment variable and redeploying:

1. Check the deployment logs - should not see connection errors
2. Visit your app and try to register
3. Should work! ✅

## Create Database Tables

Once the connection is working, create the tables in Neon SQL Editor:

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

## Common Issues

### "Cannot find module @neondatabase/serverless"
- Push the latest code (already done - includes Neon driver in package.json)
- Vercel will install it automatically on next deploy

### Tables don't exist
- Run the SQL above in Neon SQL Editor
- Access it via Vercel Storage tab → "Open in Neon Console" → SQL Editor

### Still getting connection errors
- Double-check DATABASE_URL is set in **all environments** (Production, Preview, Development)
- Make sure the connection string is complete and starts with `postgresql://`
- Redeploy after adding environment variables

## Quick Checklist

- [ ] Add DATABASE_URL to Vercel environment variables (via Marketplace or manually)
- [ ] Redeploy the application
- [ ] Create tables in Neon SQL Editor
- [ ] Test registration on deployed app

The fix should take less than 5 minutes! 🚀
