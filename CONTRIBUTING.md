# Contributing to Expnse

Thank you for your interest in contributing to Expnse! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally

2. **Install dependencies**
   ```bash
   cd expnse
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📁 Project Structure

```
expnse/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Dashboard.tsx      # Analytics dashboard
│   ├── ExpenseForm.tsx    # Add expense form
│   ├── ExpenseList.tsx    # Expense list with filters
│   ├── CategoryManager.tsx # Category management
│   └── CurrencySelector.tsx # Currency selection
├── lib/                   # Utility functions
│   └── storage.ts         # LocalStorage operations
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── public/               # Static assets
```

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. **Check existing feature requests**
2. **Create an issue** with:
   - Clear use case
   - How it improves the app
   - Mockups or examples (optional)

### Code Contributions

#### Feature Development

1. **Pick or create an issue**
2. **Comment on the issue** to let others know you're working on it
3. **Create a branch** from main:
   ```bash
   git checkout -b feature/feature-name
   ```
4. **Make your changes** following our coding standards
5. **Test thoroughly**
6. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add budget alerts feature"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/feature-name
   ```
8. **Create a Pull Request**

#### Bug Fixes

Follow the same process but use:
```bash
git checkout -b fix/bug-description
git commit -m "fix: resolve expense deletion bug"
```

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Add 'use client' for client components

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme
- Ensure responsive design (mobile-first)
- Maintain consistent spacing

### Code Formatting
```typescript
// ✅ Good
export default function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const handleDelete = () => {
    if (confirm('Delete this expense?')) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      {/* Component content */}
    </div>
  );
}

// ❌ Avoid
export default function ExpenseCard(props: any) {
  return <div className="p-4 border rounded-lg">{props.expense.description}</div>
}
```

## 🧪 Testing

Before submitting a PR:

1. **Test locally**
   ```bash
   npm run dev
   ```

2. **Build successfully**
   ```bash
   npm run build
   ```

3. **Check for TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

4. **Test all affected features**:
   - Adding expenses
   - Editing/deleting
   - Filtering and search
   - Charts and visualizations
   - Category management
   - Currency switching

5. **Test on different browsers**:
   - Chrome
   - Firefox
   - Safari
   - Edge (if possible)

6. **Test responsive design**:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

## 📋 Commit Message Guidelines

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```bash
git commit -m "feat: add recurring expense feature"
git commit -m "fix: resolve date picker timezone issue"
git commit -m "docs: update README with new features"
```

## 🎨 Feature Ideas

Here are some features we'd love to see:

### High Priority
- [ ] Recurring expenses
- [ ] Budget limits with alerts
- [ ] Dark mode
- [ ] Data backup/restore
- [ ] Multiple expense accounts

### Medium Priority
- [ ] Receipt photo upload
- [ ] Expense templates
- [ ] Monthly/yearly reports
- [ ] Expense sharing
- [ ] PWA support (offline mode)

### Nice to Have
- [ ] Import from bank CSV
- [ ] Multiple users/profiles
- [ ] Expense predictions using AI
- [ ] Integration with calendar
- [ ] Custom chart types

## 🐛 Known Issues

Check [Issues](https://github.com/akhilkarthikeyan/expnse/issues) for current bugs and feature requests.

## 📞 Getting Help

- **GitHub Discussions**: Ask questions, share ideas
- **Issues**: Report bugs, request features
- **Pull Requests**: Code contributions

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows project style guidelines
- [ ] Tested locally and works correctly
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] Responsive design tested
- [ ] Clear commit messages
- [ ] PR description explains changes
- [ ] Screenshots included (for UI changes)
- [ ] Documentation updated (if needed)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated. Thank you for helping make Expnse better!

## 💡 Questions?

Feel free to open an issue with the `question` label if you need any clarification.

---

Happy coding! 🚀
