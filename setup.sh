#!/bin/bash

# Expnse - Installation & Setup Script
# This script helps you get started with Expnse

echo "🚀 Welcome to Expnse Setup!"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "📥 Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a minute..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup Complete!"
    echo "================================"
    echo ""
    echo "📝 Next steps:"
    echo "1. Run 'npm run dev' to start development server"
    echo "2. Open http://localhost:3000 in your browser"
    echo "3. Start tracking your expenses!"
    echo ""
    echo "📚 Documentation:"
    echo "- README.md - Full documentation"
    echo "- QUICKSTART.md - Quick start guide"
    echo "- DEPLOYMENT.md - Deploy to Vercel"
    echo ""
    echo "💡 Quick commands:"
    echo "   npm run dev   - Start development server"
    echo "   npm run build - Build for production"
    echo "   npm run start - Start production server"
    echo ""
else
    echo ""
    echo "❌ Installation failed"
    echo "Please check the error messages above"
    exit 1
fi
