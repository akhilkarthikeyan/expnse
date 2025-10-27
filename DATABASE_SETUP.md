# 🗄️ Database Authentication Setup Guide

Your Expnse app now has a complete user registration and login system with a local SQLite database!

## ✅ What's Been Set Up

### 1. **SQLite Database**
- Local database file: `expnse.db`
- Stores user accounts, expenses, categories, and settings
- Each user has their own separate data
- Password security with bcrypt hashing

### 2. **User Registration & Login**
- Create new accounts with username/password
- Secure password hashing (bcrypt)
- Session-based authentication
- Login/Register toggle

### 3. **API Endpoints**
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login
- `GET/POST/DELETE /api/expenses` - Manage expenses
- `GET/POST/DELETE /api/categories` - Manage categories
- `GET/POST /api/settings` - User settings

### 4. **Database Tables**
- **users** - User accounts (id, username, hashed password)
- **expenses** - User expenses (linked to user_id)
- **categories** - User categories (linked to user_id)
- **user_settings** - Currency preferences per user

## 🚀 How It Works

### First Time User
1. Visit the app
2. Click "Don't have an account? Register"
3. Enter username and password
4. Automatically logged in
5. Start adding expenses!

### Returning User
1. Visit the app
2. Enter username and password
3. Click "Login"
4. Access your data

## 🔐 Security Features

✅ **Password Hashing** - Passwords are hashed with bcrypt (never stored plain text)  
✅ **Session Management** - Login persists during browser session  
✅ **User Isolation** - Each user can only access their own data  
✅ **SQL Injection Protection** - Parameterized queries  
✅ **Foreign Key Constraints** - Data integrity maintained  

## 📁 Files Created/Modified

### New Files:
- `lib/database.ts` - Database setup and operations
- `lib/storageDb.ts` - API-based storage service
- `app/api/auth/register/route.ts` - Registration endpoint
- `app/api/auth/login/route.ts` - Login endpoint
- `app/api/expenses/route.ts` - Expenses CRUD
- `app/api/categories/route.ts` - Categories CRUD
- `app/api/settings/route.ts` - Settings management

### Modified Files:
- `components/AuthWrapper.tsx` - Now has registration form
- `app/page.tsx` - Uses async data loading
- `.gitignore` - Excludes database files

## 💾 Database Location

The database file is created at:
```
/Users/akhilkarthikeyan/Work/Personal/projects/expnse/expnse.db
```

**Important:** 
- ✅ Database is in `.gitignore` (won't be committed to Git)
- ✅ Each deployment needs its own database
- ✅ Backup the `.db` file to preserve user data

## 🔄 Data Migration

If you had data in localStorage before, it won't automatically transfer. Options:

1. **Export to CSV** (from old version)
2. **Import manually** (in new version)
3. Or just start fresh!

## 🎯 Usage Examples

### Creating a New Account
```
Username: john
Password: mypassword123
Confirm: mypassword123
[Click Create Account]
```

### Logging In
```
Username: john
Password: mypassword123
[Click Login]
```

### Multiple Users
Each user gets:
- ✅ Separate expense data
- ✅ Own categories
- ✅ Own currency settings
- ✅ Complete data isolation

## 🔧 Advanced Configuration

### Change Database Location
Edit `lib/database.ts`:
```typescript
const dbPath = path.join(process.cwd(), 'expnse.db');
// Change to:
const dbPath = '/custom/path/expnse.db';
```

### View Database Contents
Install SQLite browser:
```bash
# macOS
brew install --cask db-browser-for-sqlite

# Then open expnse.db
```

### Backup Database
```bash
# Simple copy
cp expnse.db expnse-backup-$(date +%Y%m%d).db

# Or use SQLite
sqlite3 expnse.db ".backup expnse-backup.db"
```

## 🚀 Deployment Considerations

### For Vercel/Serverless:
⚠️ **Important:** SQLite doesn't work well on serverless platforms like Vercel because:
- Files are ephemeral (reset on each deployment)
- Read-only filesystem in production

**Solutions for Production:**
1. **Use Vercel Postgres** (recommended)
2. **Use Supabase** (PostgreSQL + Auth)
3. **Use PlanetScale** (MySQL)
4. **Use MongoDB Atlas**

Would you like me to set up any of these cloud databases instead?

### For VPS/Traditional Hosting:
✅ SQLite works perfectly!
- Deploy to DigitalOcean, AWS EC2, etc.
- Database persists between restarts
- Easy to backup

## 📊 Database Schema

```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- bcrypt hashed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Settings table
CREATE TABLE user_settings (
  user_id INTEGER PRIMARY KEY,
  currency_code TEXT NOT NULL DEFAULT 'USD',
  currency_symbol TEXT NOT NULL DEFAULT '$',
  currency_name TEXT NOT NULL DEFAULT 'US Dollar',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🧪 Testing

1. **Create a test account:**
   - Username: test123
   - Password: test123

2. **Add some expenses**

3. **Logout** (close browser)

4. **Login again** - Data should still be there!

5. **Create another account** - Completely separate data

## 🔍 Troubleshooting

### "Database is locked"
```bash
# Close all connections
rm expnse.db-shm expnse.db-wal
```

### Reset Everything
```bash
# Delete database
rm expnse.db
# Restart server - new database created automatically
```

### Can't Login
1. Username is case-sensitive
2. Password must match exactly
3. Try creating a new account

### Lost Password
Unfortunately, no password recovery yet. You can:
1. Create a new account, or
2. Delete database and start fresh

## 🎉 You're All Set!

Restart your dev server if needed:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

Now you have:
- ✅ User registration
- ✅ Secure login
- ✅ Database storage
- ✅ Multi-user support
- ✅ Data isolation per user

**Try it now!** Refresh your browser and you'll see the new registration/login screen! 🚀
