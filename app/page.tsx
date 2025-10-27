'use client';

import { useState, useEffect } from 'react';
import { storageService } from '@/lib/storageDb';
import { Expense, Category, Currency } from '@/types';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategoryManager from '@/components/CategoryManager';
import CurrencySelector from '@/components/CurrencySelector';
import Dashboard from '@/components/Dashboard';
import AuthWrapper, { useAuth } from '@/components/AuthWrapper';
import PasswordReset from '@/components/PasswordReset';
import { Wallet, Settings, LogOut } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'settings'>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure sessionStorage is set
    const timer = setTimeout(() => {
      loadData();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [expensesData, categoriesData, currencyData] = await Promise.all([
        storageService.getExpenses(),
        storageService.getCategories(),
        storageService.getCurrency(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
      setCurrency(currencyData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense: Expense) => {
    await storageService.addExpense(expense);
    await loadData();
  };

  const handleDeleteExpense = async (id: string) => {
    await storageService.deleteExpense(id);
    await loadData();
  };

  const handleAddCategory = async (category: Category) => {
    await storageService.addCategory(category);
    await loadData();
  };

  const handleDeleteCategory = async (id: string) => {
    await storageService.deleteCategory(id);
    await loadData();
  };

  const handleCurrencyChange = async (newCurrency: Currency) => {
    await storageService.saveCurrency(newCurrency);
    setCurrency(newCurrency);
  };

  const MainContent = () => {
    const { logout, username } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Use default currency if none is set
    const displayCurrency = currency || { code: 'USD', symbol: '$', name: 'US Dollar' };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wallet className="w-8 h-8 text-primary-600" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Expnse
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, <span className="font-semibold">{username}</span></span>
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('expenses')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'expenses'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Expenses
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </nav>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <Dashboard expenses={expenses} categories={categories} currency={displayCurrency} />
          )}

          {activeTab === 'expenses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ExpenseForm
                  categories={categories}
                  onAddExpense={handleAddExpense}
                  currency={displayCurrency}
                />
              </div>
              <div className="lg:col-span-2">
                <ExpenseList
                  expenses={expenses}
                  categories={categories}
                  currency={displayCurrency}
                  onDeleteExpense={handleDeleteExpense}
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CurrencySelector
                currentCurrency={displayCurrency}
                onCurrencyChange={handleCurrencyChange}
              />
              <CategoryManager
                categories={categories}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
              />
              <div className="lg:col-span-2">
                <PasswordReset />
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  return (
    <AuthWrapper>
      <MainContent />
    </AuthWrapper>
  );
}
