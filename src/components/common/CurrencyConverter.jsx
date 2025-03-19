// components/CurrencyConverter.jsx
"use client";
import { useState, useEffect } from "react";
import { worldCurrencies } from "../utils/WorldCurrency";

const CurrencyConverter = () => {
  // State to store the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState(
    worldCurrencies.find((c) => c.code === "LBP") || worldCurrencies[0]
  );

  // State to track if component has mounted (for localStorage access)
  const [mounted, setMounted] = useState(false);

  // Handle currency change
  const handleCurrencyChange = (e) => {
    const currencyCode = e.target.value;
    const currency = worldCurrencies.find((c) => c.code === currencyCode);
    if (currency) {
      setSelectedCurrency(currency);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredCurrency", currencyCode);
      }

      // Dispatch event for other components
      document.dispatchEvent(
        new CustomEvent("currencyChange", { detail: currency })
      );
    }
  };

  // Initialize from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("preferredCurrency");
      if (savedCurrency) {
        const currency = worldCurrencies.find((c) => c.code === savedCurrency);
        if (currency) {
          setSelectedCurrency(currency);
        }
      }
    }
  }, []);

  // Don't render content until after mount to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="currency-converter p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Currency Settings</h2>
      <div className="flex items-center space-x-2">
        <label htmlFor="currency-select" className="text-gray-700">
          Select Currency:
        </label>
        <select
          id="currency-select"
          value={selectedCurrency.code}
          onChange={handleCurrencyChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {worldCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Current currency:{" "}
          <span className="font-medium">
            {selectedCurrency.name} ({selectedCurrency.symbol})
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Your currency preference will be saved for future visits.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
