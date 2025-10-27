import { Expense, Category, Currency, DEFAULT_CATEGORIES, CURRENCIES } from '@/types';

const STORAGE_KEYS = {
  EXPENSES: 'expnse_expenses',
  CATEGORIES: 'expnse_categories',
  CURRENCY: 'expnse_currency',
};

export const storageService = {
  // Expenses
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  addExpense: (expense: Expense): void => {
    const expenses = storageService.getExpenses();
    expenses.push(expense);
    storageService.saveExpenses(expenses);
  },

  updateExpense: (id: string, updatedExpense: Partial<Expense>): void => {
    const expenses = storageService.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense };
      storageService.saveExpenses(expenses);
    }
  },

  deleteExpense: (id: string): void => {
    const expenses = storageService.getExpenses();
    const filtered = expenses.filter(e => e.id !== id);
    storageService.saveExpenses(filtered);
  },

  // Categories
  getCategories: (): Category[] => {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  },

  saveCategories: (categories: Category[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  addCategory: (category: Category): void => {
    const categories = storageService.getCategories();
    categories.push(category);
    storageService.saveCategories(categories);
  },

  updateCategory: (id: string, updatedCategory: Partial<Category>): void => {
    const categories = storageService.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updatedCategory };
      storageService.saveCategories(categories);
    }
  },

  deleteCategory: (id: string): void => {
    const categories = storageService.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    storageService.saveCategories(filtered);
  },

  // Currency
  getCurrency: (): Currency => {
    if (typeof window === 'undefined') return CURRENCIES[0];
    const data = localStorage.getItem(STORAGE_KEYS.CURRENCY);
    return data ? JSON.parse(data) : CURRENCIES[0];
  },

  saveCurrency: (currency: Currency): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(currency));
  },
};
