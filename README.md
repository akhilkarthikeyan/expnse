# Expnse - Smart Expense Tracker 💰

A modern, feature-rich expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your expenses effortlessly with beautiful visualizations, custom categories, and multi-currency support.

![Expnse](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

### Core Features
- **Add & Track Expenses** - Easily add expenses with amount, description, category, and date
- **Custom Categories** - Create and manage your own expense categories with custom icons and colors
- **Multi-Currency Support** - Choose from 10+ currencies including USD, EUR, GBP, INR, JPY, and more
- **Smart Search & Filter** - Search expenses by description and filter by category
- **Local Storage** - All data persists locally in your browser

### Analytics & Visualizations
- **Interactive Dashboard** - Real-time overview of your spending habits
- **Pie Charts** - Visual breakdown of expenses by category
- **Bar Charts** - Compare spending across top categories
- **Line Charts** - Track daily spending trends over the last 30 days
- **Monthly Insights** - Compare current month vs last month spending with percentage change

### Additional Features
- **Export to CSV** - Download your expense data for further analysis
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI** - Modern gradient designs with smooth transitions
- **No Backend Required** - 100% client-side, no server or database needed

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akhilkarthikeyan/expnse.git
   cd expnse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

Expnse is optimized for Vercel deployment. Follow these steps:

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your `expnse` repository
   - Click "Deploy"

That's it! Vercel will automatically detect it's a Next.js app and configure everything.

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new one
   - Accept default settings
   - Your app will be deployed!

### Custom Domain (Optional)
- Go to your project settings on Vercel
- Navigate to "Domains"
- Add your custom domain

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Date Handling**: [date-fns](https://date-fns.org/) - Modern date utility library
- **Storage**: Browser LocalStorage API

## 📱 Usage Guide

### Getting Started
1. **Set Your Currency** - Go to Settings tab and select your preferred currency
2. **Add Categories** - Add custom categories with icons and colors (or use defaults)
3. **Add Expenses** - Navigate to Expenses tab and start adding your expenses

### Dashboard
- View your total expenses and transaction count
- See current month spending vs last month with percentage change
- Analyze spending patterns with interactive charts
- Export your data to CSV for external analysis

### Managing Categories
- Each category has a unique icon and color
- Choose from 16+ emoji icons
- Select from 8 color options
- Delete categories you don't use

### Filtering & Search
- Use the search bar to find specific expenses
- Filter expenses by category
- View total for filtered results

## 🎨 Default Categories

The app comes with 8 default categories:
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- 📌 Other

## 🔒 Data Privacy

All your data is stored locally in your browser using LocalStorage. No data is sent to any server or third party. Your financial information stays completely private.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Akhil Karthikeyan**
- GitHub: [@akhilkarthikeyan](https://github.com/akhilkarthikeyan)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by Akhil Karthikeyan
