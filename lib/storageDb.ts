import { Expense, Category, Currency } from '@/types';

const getUserId = (): number | null => {
  if (typeof window === 'undefined') return null;
  const userId = sessionStorage.getItem('expnse_user_id');
  return userId ? parseInt(userId) : null;
};

export const storageService = {
  // Expenses
  getExpenses: async (): Promise<Expense[]> => {
    const userId = getUserId();
    if (!userId) return [];

    try {
      const response = await fetch(`/api/expenses?userId=${userId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    return [];
  },

  addExpense: async (expense: Expense): Promise<void> => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, expense }),
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  },

  deleteExpense: async (id: string): Promise<void> => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await fetch(`/api/expenses?userId=${userId}&expenseId=${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const userId = getUserId();
    if (!userId) return [];

    try {
      const response = await fetch(`/api/categories?userId=${userId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    return [];
  },

  addCategory: async (category: Category): Promise<void> => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, category }),
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  },

  deleteCategory: async (id: string): Promise<void> => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await fetch(`/api/categories?userId=${userId}&categoryId=${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  },

  // Currency
  getCurrency: async (): Promise<Currency | null> => {
    const userId = getUserId();
    if (!userId) return null;

    try {
      const response = await fetch(`/api/settings?userId=${userId}`);
      if (response.ok) {
        const settings = await response.json();
        return {
          code: settings.currency_code,
          symbol: settings.currency_symbol,
          name: settings.currency_name,
        };
      }
    } catch (error) {
      console.error('Error fetching currency:', error);
    }
    return null;
  },

  saveCurrency: async (currency: Currency): Promise<void> => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currency }),
      });
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  },

  // Legacy methods for backward compatibility (not used with database)
  saveExpenses: () => {},
  updateExpense: () => {},
  saveCategories: () => {},
  updateCategory: () => {},
};
