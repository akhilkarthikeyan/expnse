# 🚀 Quick Start Guide

Get Expnse running in 3 minutes!

## Option 1: Run Locally (Fastest)

```bash
# 1. Install dependencies (takes ~1 minute)
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

That's it! Start adding expenses! 🎉

## Option 2: Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com
# - Login with GitHub
# - Import your repository
# - Click Deploy

# 3. Your app is live!
# Visit your-app.vercel.app
```

## First Steps After Running

1. **Set Currency** → Go to Settings tab
2. **Add Categories** → Or use the defaults
3. **Add Expense** → Go to Expenses tab
4. **View Dashboard** → See your analytics

## Features Overview

### Dashboard Tab
- 📊 Total expenses summary
- 📈 Month comparison
- 🥧 Pie chart by category
- 📉 Daily trend line chart
- 📥 Export to CSV

### Expenses Tab
- ➕ Add new expense form
- 📋 Expense list
- 🔍 Search functionality
- 🏷️ Category filter
- 🗑️ Delete expenses

### Settings Tab
- 💱 Currency selector (10+ currencies)
- 🏷️ Category manager (create custom categories)
- 🎨 Icon and color customization

## Troubleshooting

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Port Already in Use?
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript Errors?
The errors shown during development are expected before `npm install` completes. They'll disappear once dependencies are installed.

## Need Help?

- 📖 Read [README.md](README.md) for detailed info
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 📝 View [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for features

## What's Included?

✅ Expense tracking  
✅ Custom categories  
✅ 10+ currencies  
✅ Beautiful charts  
✅ Search & filter  
✅ Export to CSV  
✅ Responsive design  
✅ No backend needed  
✅ Privacy-first (LocalStorage)

Happy expense tracking! 💰✨
