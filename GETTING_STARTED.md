# 🎯 Getting Started with Expnse

Your expense tracking website is ready! Follow these steps to get started.

## 📋 What You Have

A complete Next.js 14 expense tracking application with:
- ✅ Expense tracking with custom categories
- ✅ Multi-currency support (10+ currencies)
- ✅ Beautiful charts and analytics
- ✅ Search and filter functionality
- ✅ Export to CSV
- ✅ Fully responsive design
- ✅ Ready for Vercel deployment

## 🚀 Option 1: Run Locally (Start Now!)

### Step 1: Install Dependencies

```bash
cd /Users/akhilkarthikeyan/Work/Personal/projects/expnse
npm install
```

This will install all required packages (~1-2 minutes).

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Visit: **http://localhost:3000**

That's it! Your expense tracker is running! 🎉

## 🌐 Option 2: Deploy to Vercel (Go Live!)

### Method A: Using Vercel Dashboard (Easiest)

1. **Push to GitHub:**
```bash
cd /Users/akhilkarthikeyan/Work/Personal/projects/expnse
git add .
git commit -m "Initial commit: Expnse expense tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/expnse.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your `expnse` repository
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! Your app is live! 🚀

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/akhilkarthikeyan/Work/Personal/projects/expnse
vercel

# Deploy to production
vercel --prod
```

## 📱 How to Use Expnse

### First Time Setup

1. **Set Your Currency**
   - Click "Settings" tab
   - Choose your preferred currency (e.g., USD, EUR, INR)

2. **Review Categories**
   - 8 default categories are provided
   - Add custom categories if needed

3. **Add Your First Expense**
   - Click "Expenses" tab
   - Fill in amount, description, category, and date
   - Click "Add Expense"

4. **View Dashboard**
   - Click "Dashboard" tab
   - See your spending visualized with charts

### Daily Usage

**Add an Expense:**
1. Go to Expenses tab
2. Enter amount (e.g., 25.50)
3. Add description (e.g., "Lunch at cafe")
4. Select category (e.g., Food & Dining)
5. Choose date (defaults to today)
6. Click "Add Expense"

**View Analytics:**
1. Go to Dashboard tab
2. See total expenses
3. Compare with last month
4. View category breakdown in pie chart
5. Check 30-day spending trend

**Search & Filter:**
1. Go to Expenses tab
2. Use search bar for specific expenses
3. Filter by category dropdown
4. View filtered totals

**Export Data:**
1. Go to Dashboard
2. Click "Export to CSV"
3. Save file for spreadsheet analysis

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📁 Project Structure

```
expnse/
├── app/                    # Next.js pages
│   ├── page.tsx           # Main application
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Dashboard.tsx      # Analytics & charts
│   ├── ExpenseForm.tsx    # Add expense form
│   ├── ExpenseList.tsx    # List with filters
│   ├── CategoryManager.tsx # Category management
│   └── CurrencySelector.tsx # Currency selection
├── lib/                   # Utilities
│   └── storage.ts         # LocalStorage service
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── public/               # Static files
    └── favicon.svg       # App icon
```

## 🎨 Customization

### Add More Currencies

Edit `/types/index.ts` and add to the `CURRENCIES` array:

```typescript
{ code: 'BRL', symbol: 'R$', name: 'Brazilian Real' }
```

### Add More Categories

Edit `/types/index.ts` and add to `DEFAULT_CATEGORIES`:

```typescript
{ id: '9', name: 'Fitness', color: '#10b981', icon: '💪' }
```

### Change Theme Colors

Edit `/tailwind.config.ts` to modify the color scheme.

## 📚 Documentation Files

- **README.md** - Complete project overview
- **QUICKSTART.md** - Quick start guide
- **DEPLOYMENT.md** - Detailed deployment instructions
- **CONTRIBUTING.md** - How to contribute
- **FEATURES.md** - Complete feature list
- **PROJECT_SUMMARY.md** - Technical summary

## 🐛 Troubleshooting

### Port Already in Use?
```bash
npm run dev -- -p 3001
# Use port 3001 instead
```

### Module Not Found Errors?
```bash
rm -rf node_modules
npm install
```

### Build Errors?
```bash
npm run build
# Check for TypeScript errors
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## ✅ Verify Installation

After running `npm install`, verify these files exist:
- [ ] node_modules/ folder created
- [ ] package-lock.json created
- [ ] No error messages in terminal

After running `npm run dev`, verify:
- [ ] Server starts on http://localhost:3000
- [ ] No compilation errors
- [ ] Page loads in browser
- [ ] Can add expenses

## 🎯 Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Run locally (`npm run dev`)
3. ✅ Test all features
4. ✅ Customize as needed
5. ✅ Deploy to Vercel
6. ✅ Share with others!

## 💡 Tips

- **Data Privacy**: All data stays in your browser (LocalStorage)
- **No Backend**: Works completely offline after initial load
- **Mobile Friendly**: Use on any device
- **Export Data**: Regular backups via CSV export
- **Categories**: Customize to match your spending patterns

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/en-US/)

## 📞 Need Help?

- Check documentation files in the project
- Review error messages carefully
- Ensure Node.js 18+ is installed
- Check browser console for errors

## 🎉 You're Ready!

Everything is set up and ready to go. Just run:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and start tracking your expenses!

Happy expense tracking! 💰✨

---

**Built with Next.js 14 • TypeScript • Tailwind CSS • Recharts**
