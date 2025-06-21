"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCurrency } from "../redux/currency";
import { useTranslation } from "react-i18next";

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { currencies, selectedCurrency } = useSelector(
    (state) => state.currency
  );
  const language = useSelector((state) => state.language.language);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  // Handle currency change
  const handleCurrencyChange = (e) => {
    const currencyCode = e.target.value;
    dispatch(setSelectedCurrency(currencyCode));
  };

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render content until after mount to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`currency-converter p-4 bg-gray-100 rounded-lg ${language === "ar" ? "text-right" : "text-left"}`} dir={language === "ar" ? "rtl" : "ltr"}>
      <h2 className={`text-xl font-bold mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
        {t("changeCurrency.heading3")}
      </h2>
      <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}>
        <label 
          htmlFor="currency-select" 
          className={`text-gray-700 ${language === "ar" ? "mr-2" : "ml-2"}`}
        >
          {t("changeCurrency.heading4")}:
        </label>
        <select
          id="currency-select"
          value={selectedCurrency.code}
          onChange={handleCurrencyChange}
          className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${language === "ar" ? "text-right" : "text-left"}`}
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          {currencies?.map((currency) => (
            <option 
              key={currency.code} 
              value={currency.code}
              className={language === "ar" ? "text-right" : "text-left"}
            >
              {t(currency.translationKey)} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {t("changeCurrency.heading5")}:{" "}
          <span className="poppins_medium">
            {t(selectedCurrency.translationKey)} ({selectedCurrency.symbol})
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {t("changeCurrency.heading6")}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
