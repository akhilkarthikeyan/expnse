# 🚀 Deploy to Vercel with Postgres Database

Complete guide to deploy Expnse to Vercel with a free Postgres database.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Expnse code pushed to GitHub

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd /Users/akhilkarthikeyan/Work/Personal/projects/expnse
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Expnse with Vercel Postgres"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/expnse.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Click "Deploy"** (Don't worry about database yet)
5. Wait for initial deployment to complete

## Step 3: Set Up Vercel Postgres Database

### Create Postgres Database

1. **Go to your project on Vercel**
2. **Click "Storage" tab**
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Choose a name**: `expnse-db`
6. **Select region**: Choose closest to you
7. **Click "Create"**

### Connect Database to Project

1. **In the Storage tab**, click on your new database
2. **Go to ".env.local" tab**
3. **Click "Show secret"** - You'll see something like:
   ```
   POSTGRES_URL="postgres://..."
   POSTGRES_PRISMA_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```
4. **These are automatically added to your project!**

### Initialize Database Tables

1. **Go to "Settings" → "Environment Variables"**
2. **Verify all POSTGRES_* variables are there**
3. **Redeploy your app**: Go to "Deployments" → "..." → "Redeploy"
4. The database tables will be created automatically on first API call

## Step 4: Test Your Deployment

1. **Visit your live URL**: `https://your-app.vercel.app`
2. **Create a new account**
3. **Add some expenses**
4. **Verify everything works!**

## 🎉 You're Live!

Your Expnse app is now:
- ✅ Deployed on Vercel
- ✅ Using Postgres database
- ✅ Fully functional
- ✅ Accessible from anywhere

## 🔧 Local Development with Vercel Postgres

### Option 1: Use Local SQLite for Development

Keep using SQLite locally, Postgres in production (easier).

### Option 2: Connect to Vercel Postgres Locally

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Link your project**:
   ```bash
   cd /Users/akhilkarthikeyan/Work/Personal/projects/expnse
   vercel link
   ```

3. **Pull environment variables**:
   ```bash
   vercel env pull .env.local
   ```

4. **Restart dev server**:
   ```bash
   npm run dev
   ```

Now your local development uses the same Vercel Postgres database!

## 📊 Database Management

### View Database in Vercel

1. Go to your project → "Storage" → Your database
2. Click "Data" tab
3. You can run SQL queries here:

```sql
-- View all users
SELECT * FROM users;

-- View all expenses
SELECT * FROM expenses;

-- Count expenses per user
SELECT u.username, COUNT(e.id) as expense_count
FROM users u
LEFT JOIN expenses e ON u.id = e.user_id
GROUP BY u.username;
```

### Backup Database

```bash
# Install Vercel CLI
npm i -g vercel

# Export database
vercel postgres dump expnse-db > backup.sql
```

### Restore Database

```bash
vercel postgres import expnse-db < backup.sql
```

## 🔒 Security Best Practices

1. **Environment Variables** - All sensitive data in environment variables
2. **No hardcoded secrets** - Database credentials managed by Vercel
3. **HTTPS** - Enabled by default
4. **Password hashing** - Using bcrypt
5. **SQL injection protection** - Using parameterized queries

## 💰 Cost Information

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### Vercel Postgres Free Tier:
- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ Enough for thousands of expense records!

**Perfect for personal use!**

## 🚀 Custom Domain Setup

1. **Buy a domain** (Namecheap, GoDaddy, etc.)
2. **In Vercel**: Go to "Settings" → "Domains"
3. **Add your domain**: `expnse.com`
4. **Update DNS** at your domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. **Wait for DNS** to propagate (up to 48 hours)

## 🔄 Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically detects the push
2. Builds your app
3. Runs tests
4. Deploys to production
5. Sends you a notification

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel deploys automatically! 🚀
```

## 📱 Features

Your deployed app has:
- ✅ User registration & login
- ✅ Secure password storage
- ✅ Multi-user support
- ✅ Persistent database
- ✅ Real-time updates
- ✅ Mobile responsive
- ✅ Fast global CDN
- ✅ Automatic SSL

## 🆘 Troubleshooting

### "Database connection failed"
- Check environment variables in Vercel
- Ensure POSTGRES_URL is set
- Redeploy the app

### "Table does not exist"
- Database tables created on first use
- Try creating a user account
- Check Vercel logs for errors

### "Cannot find module '@vercel/postgres'"
- Ensure package is in package.json
- Redeploy from Vercel dashboard

### Check Logs
```bash
# View real-time logs
vercel logs --follow

# Or in Vercel dashboard:
# Go to your deployment → "Logs" tab
```

## 📈 Monitoring

### In Vercel Dashboard:
- **Analytics** - Visitor statistics
- **Logs** - Real-time application logs
- **Speed Insights** - Performance metrics
- **Deployments** - Deployment history

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up Postgres database
3. ✅ Test registration & login
4. ✅ Add expenses and verify they persist
5. ✅ Share your app URL with others!
6. Optional: Set up custom domain
7. Optional: Enable Vercel Analytics

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Support**: support@vercel.com

---

**Your Expnse app is production-ready! 🎉**

Deploy now and start tracking expenses online! 🚀
