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
      if (!isNaN(numPoints)) {
        setConvertedAmount(convertPoints(numPoints, selectedCurrency));
      } else {
        setConvertedAmount(null);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, ''); // remove non-digits
    if (pasted) {
      e.preventDefault(); // prevent default paste behavior
      setPoints(pasted);
      const numPoints = parseInt(pasted, 10);
      setConvertedAmount(!isNaN(numPoints) ? convertPoints(numPoints, selectedCurrency) : null);
    }
  };


  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    const numPoints = parseInt(points, 10);
    if (!isNaN(numPoints)) {
      setConvertedAmount(convertPoints(numPoints, e.target.value));
    } else {
      setConvertedAmount(null);
    }
  };

  return (
    <div className="w-full max-w-xl px-4 sm:px-6 md:px-8">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">
          Input your <b>TOTAL</b> steam points
        </legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Type here"
          value={points}
          onChange={handleInputChange}
          onPaste={handlePaste}
          inputMode="numeric"
          pattern="\d*"
        />

        <label htmlFor="currency" className="label pt-4 block font-semibold">
          Choose Currency:
        </label>
        <select
          id="currency"
          className="select select-bordered w-full"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {Object.keys(currencyRates).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <a
          href="https://store.steampowered.com/pointssummary"
          className="label hover:link transition duration-300 hover:scale-x-110 mt-4 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Can't find your total points?
        </a>
      </fieldset>

      {/* Show conversion result */}
      {convertedAmount !== null ? (
        <p className="mt-6 text-lg font-semibold">
          {selectedCurrency === 'USD'
            ? 'Equivalent in USD:'
            : `Approximate equivalent in ${selectedCurrency}:`}{' '}
          <span>
            {currencyRates[selectedCurrency].symbol}
            {convertedAmount.toFixed(2)}
          </span>
        </p>
      ) : (
        <p className="mt-6 text-lg font-semibold">Please enter a valid number.</p>
      )}
    </div>
  );
}