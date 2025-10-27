'use client';

import { Expense, Category, Currency } from '@/types';
import { useMemo, useCallback } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Calendar, Wallet, Download } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from 'date-fns';

interface DashboardProps {
  expenses: Expense[];
  categories: Category[];
  currency: Currency;
}

export default function Dashboard({ expenses, categories, currency }: DashboardProps) {
  const getCategoryById = useCallback(
    (id: string) => categories.find((cat) => cat.id === id),
    [categories]
  );

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Current month expenses
  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Last month expenses
  const lastMonthExpenses = useMemo(() => {
    const lastMonth = subMonths(new Date(), 1);
    const start = startOfMonth(lastMonth);
    const end = endOfMonth(lastMonth);
    
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    expenses.forEach((expense) => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    return Array.from(categoryMap.entries())
      .map(([categoryId, amount]) => {
        const category = getCategoryById(categoryId);
        return {
          name: category?.name || 'Unknown',
          value: amount,
          color: category?.color || '#6b7280',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [expenses, getCategoryById]);

  // Daily expenses for last 30 days
  const dailyExpenses = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const days = eachDayOfInterval({ start: thirtyDaysAgo, end: now });

    const dailyMap = new Map<string, number>();
    
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= thirtyDaysAgo && expenseDate <= now) {
        const dateKey = format(expenseDate, 'yyyy-MM-dd');
        const current = dailyMap.get(dateKey) || 0;
        dailyMap.set(dateKey, current + expense.amount);
      }
    });

    return days.map((day) => ({
      date: format(day, 'MMM dd'),
      amount: dailyMap.get(format(day, 'yyyy-MM-dd')) || 0,
    }));
  }, [expenses]);

  // Category comparison
  const categoryComparison = useMemo(() => {
    return categoryData.slice(0, 5).map((item) => ({
      name: item.name,
      amount: item.value,
    }));
  }, [categoryData]);

  const percentageChange = useMemo(() => {
    if (lastMonthExpenses === 0) return 0;
    return ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
  }, [currentMonthExpenses, lastMonthExpenses]);

  const exportData = () => {
    const csvContent = [
      ['Date', 'Description', 'Amount', 'Category'],
      ...expenses.map((expense) => {
        const category = getCategoryById(expense.category);
        return [
          expense.date,
          expense.description,
          expense.amount.toFixed(2),
          category?.name || 'Unknown',
        ];
      }),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">Total Expenses</span>
          </div>
          <p className="text-3xl font-bold">
            {currency.symbol}{totalExpenses.toFixed(2)}
          </p>
          <p className="text-sm opacity-80 mt-1">{expenses.length} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">This Month</span>
          </div>
          <p className="text-3xl font-bold">
            {currency.symbol}{currentMonthExpenses.toFixed(2)}
          </p>
          <p className="text-sm opacity-80 mt-1">{format(new Date(), 'MMMM yyyy')}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">vs Last Month</span>
          </div>
          <p className="text-3xl font-bold">
            {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%
          </p>
          <p className="text-sm opacity-80 mt-1">
            {currency.symbol}{lastMonthExpenses.toFixed(2)} last month
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Categories</h3>
          {categoryComparison.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`}
                />
                <Bar dataKey="amount" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Daily Trend Line Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Spending Trend (Last 30 Days)</h3>
        {dailyExpenses.some((d) => d.amount > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `${currency.symbol}${value.toFixed(2)}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
