import { createSlice } from "@reduxjs/toolkit";
import { worldCurrencies } from "../utils/WorldCurrency";

// Get initial currency from localStorage if available (client-side only)
let initialSelectedCurrency =
  worldCurrencies.find((c) => c.code === "LBP") || worldCurrencies[0];
if (typeof window !== "undefined") {
  const savedCurrency = localStorage.getItem("preferredCurrency");
  if (savedCurrency) {
    const found = worldCurrencies.find((c) => c.code === savedCurrency);
    if (found) {
      initialSelectedCurrency = found;
    }
  }
}

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencies: worldCurrencies,
    selectedCurrency: initialSelectedCurrency,
  },
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = state.currencies.map((currency) => {
        if (action.payload[currency.code] !== undefined) {
          return {
            ...currency,
            rate: action.payload[currency.code],
          };
        }
        return currency;
      });
    },
    setSelectedCurrency: (state, action) => {
      const currencyCode = action.payload;
      const currency = state.currencies.find((c) => c.code === currencyCode);
      if (currency) {
        state.selectedCurrency = currency;
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("preferredCurrency", currencyCode);
        }
      }
    },
  },
});

export const { setCurrencies, setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
