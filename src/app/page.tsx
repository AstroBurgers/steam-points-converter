'use client';

import { useState } from 'react';

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.85 },
  GBP: { symbol: '£', rate: 0.74 },
  JPY: { symbol: '¥', rate: 147.2 },
  AUD: { symbol: 'A$', rate: 1.52 },
  CAD: { symbol: 'C$', rate: 1.37 },
};

export default function Home() {
  const [points, setPoints] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const convertPoints = (pts: number, currency: string) => {
    const dollars = pts / 100;
    const rate = currencyRates[currency]?.rate || 1;
    return dollars * rate;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setPoints(val);
      const numPoints = parseInt(val, 10);
      setConvertedAmount(!isNaN(numPoints) ? convertPoints(numPoints, selectedCurrency) : null);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '');
    if (pasted) {
      e.preventDefault();
      setPoints(pasted);
      const numPoints = parseInt(pasted, 10);
      setConvertedAmount(!isNaN(numPoints) ? convertPoints(numPoints, selectedCurrency) : null);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    const numPoints = parseInt(points, 10);
    setConvertedAmount(!isNaN(numPoints) ? convertPoints(numPoints, e.target.value) : null);
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="rounded-xl p-8 w-full max-w-lg glass-gradient">
        {/* Input Field */}
        <label className="block font-medium text-base-content mb-2">
          Enter Your Total Steam Points:
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-base-300 bg-base-200 text-base-content px-4 py-3 focus:ring-2 focus:ring-accent outline-none transition"
          placeholder="e.g. 15000"
          value={points}
          onChange={handleInputChange}
          onPaste={handlePaste}
          inputMode="numeric"
          pattern="\d*"
        />

        {/* Currency Selector */}
        <label htmlFor="currency" className="block font-medium text-base-content mt-6 mb-2">
          Choose Currency:
        </label>
        <select
          id="currency"
          className="w-full rounded-lg border border-base-300 bg-base-200 text-base-content px-4 py-3 focus:ring-2 focus:ring-accent outline-none transition"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {Object.keys(currencyRates).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        {/* Help Link */}
        <a
          href="https://store.steampowered.com/pointssummary"
          className="text-accent text-sm mt-3 block hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Can't find your total points? Click here.
        </a>

        {/* Result */}
        {convertedAmount !== null ? (
          <div className="mt-8 rounded-lg p-4 bg-base-200 border border-base-300 text-center">
            <p className="text-lg font-semibold text-base-content">
              {selectedCurrency === 'USD'
                ? 'Equivalent in USD:'
                : `Approximate equivalent in ${selectedCurrency}:`}
            </p>
            <p className="text-3xl font-bold text-success mt-2">
              {currencyRates[selectedCurrency].symbol}
              {convertedAmount.toFixed(2)}
            </p>
            <p className="text-sm text-base-content/70 mt-3">
              If this helped,{' '}
              <a
                href="https://ko-fi.com/astrotriesmodding"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent transition"
              >
                support me on Ko-fi
              </a>
              !
            </p>
          </div>
        ) : (
          <p className="mt-6 text-center text-base-content/70">
            Please enter a valid number to see your conversion.
          </p>
        )}
      </div>
    </div>
  );
}
