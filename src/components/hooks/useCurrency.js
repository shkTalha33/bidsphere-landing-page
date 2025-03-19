"use client";
import { useState, useEffect } from "react";
import { worldCurrencies, fetchLatestRates } from "../utils/WorldCurrency";

export const useCurrency = () => {
  // Default to Lebanese Pound
  const [currency, setCurrency] = useState(
    worldCurrencies.find((c) => c.code === "LBP") || worldCurrencies[0]
  );
  const [rates, setRates] = useState({});
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Format a value according to the current currency
  const formatPrice = (value) => {
    if (!mounted) return `${value}`; // Basic fallback before hydration

    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2, // Ensures at least 2 decimal places
      maximumFractionDigits: 2, // Limits to 2 decimal places
    })
      .format(value)
      .replace(/\s/g, ""); // Removes space between currency symbol and amount

    return formattedValue;
  };

  // Convert a value from one currency to another
  const convert = (value, fromCurrencyCode, toCurrencyCode = currency.code) => {
    if (!rates || Object.keys(rates).length === 0) {
      // Fallback to static rates if API rates aren't loaded yet
      const fromRate =
        worldCurrencies.find((c) => c.code === fromCurrencyCode)?.rate || 1;
      const toRate =
        worldCurrencies.find((c) => c.code === toCurrencyCode)?.rate || 1;

      // Convert to LBP first, then to target currency
      return (value / fromRate) * toRate;
    }

    // Use API rates if available
    const fromRate = rates[fromCurrencyCode] || 1;
    const toRate = rates[toCurrencyCode] || 1;

    return (value / fromRate) * toRate;
  };

  // Fetch the latest exchange rates
  const refreshRates = async () => {
    setLoading(true);
    const result = await fetchLatestRates();
    if (result.success) {
      setRates(result.rates);
    }
    setLoading(false);
  };

  // Listen for currency changes from the CurrencyConverter component
  useEffect(() => {
    const handleCurrencyChange = (event) => {
      setCurrency(event.detail);
    };

    // Initialize from localStorage
    const initCurrency = () => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const savedCurrency = localStorage.getItem("preferredCurrency");
        if (savedCurrency) {
          const currency = worldCurrencies.find(
            (c) => c.code === savedCurrency
          );
          if (currency) {
            setCurrency(currency);
          }
        }
      }
    };

    initCurrency();
    refreshRates();
    document.addEventListener("currencyChange", handleCurrencyChange);

    return () => {
      document.removeEventListener("currencyChange", handleCurrencyChange);
    };
  }, []);

  return {
    currency,
    formatPrice,
    convert,
    mounted,
    loading,
    refreshRates,
    allCurrencies: worldCurrencies,
  };
};

export default useCurrency;
