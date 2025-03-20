"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const useCurrency = () => {
  const { currencies, selectedCurrency } = useSelector(
    (state) => state.currency
  );
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Format a value according to the current currency
  const formatPrice = (value) => {
    if (!mounted) return `${value}`; // Basic fallback before hydration

    // Format the number part
    const formattedNumber = new Intl.NumberFormat("en-US", {
      style: "decimal", // Use decimal instead of currency
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    // Add the symbol from your data
    return `${selectedCurrency.symbol} ${formattedNumber}`;
  };
  // Convert a value from one currency to another
  const convert = (
    value,
    fromCurrencyCode,
    toCurrencyCode = selectedCurrency.code
  ) => {
    // Find the currency objects
    const fromCurrency = currencies.find((c) => c.code === fromCurrencyCode);
    const toCurrency = currencies.find((c) => c.code === toCurrencyCode);

    if (!fromCurrency || !toCurrency) {
      return value; // Return original value if currencies not found
    }

    // Convert using rates
    const fromRate = fromCurrency.rate || 1;
    const toRate = toCurrency.rate || 1;

    return (value / fromRate) * toRate;
  };

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);

  return {
    currency: selectedCurrency,
    formatPrice,
    convert,
    mounted,
    loading,
    allCurrencies: currencies,
  };
};

export default useCurrency;
