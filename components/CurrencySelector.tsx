'use client';

import { Currency, CURRENCIES } from '@/types';
import { DollarSign } from 'lucide-react';

interface CurrencySelectorProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function CurrencySelector({
  currentCurrency,
  onCurrencyChange,
}: CurrencySelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <DollarSign className="w-6 h-6 mr-2 text-primary-600" />
        Currency Settings
      </h2>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Currency
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              onClick={() => onCurrencyChange(currency)}
              className={`p-4 border-2 rounded-lg transition-all text-left ${
                currentCurrency.code === currency.code
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {currency.symbol} {currency.code}
                  </p>
                  <p className="text-sm text-gray-500">{currency.name}</p>
                </div>
                {currentCurrency.code === currency.code && (
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
