// pages/index.js
"use client";
import { useState } from "react";
import useCurrency from "@/components/hooks/useCurrency";
import CurrencyConverter from "@/components/common/CurrencyConverter";
import TabHeader from "@/components/tabHeader";
import TopSection from "@/components/common/TopSection";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const { loading } = useCurrency();
  const { t } = useTranslation();
  const language = useSelector(getLanguage);
  return (
    <main
      className="bg-gray-100 flex flex-col items-start"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="mx-auto p-4 flex flex-col lg:flex-row gap-6"
      >
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description={t("changeCurrency.heading2")}
            mt={"mt-0 md:mt-0"}
            title={t("changeCurrency.heading")}
          />

          {loading ? (
            <div className="flex justify-center items-center py-32 rounded-lg shadow-sm bg_white text-center px-8  w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <>
              <div className="bg-white px-8 py-6 rounded-lg w-full shadow-sm">
                <CurrencyConverter />
              </div>
              {/* <div className="bg-white px-8 py-6 rounded-lg w-full shadow-sm">
                <h2 className="text-xl font-bold mb-4">
                  Currency Converter Demo
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm poppins_medium text-gray-700 mb-1"
                    >
                      Amount ({baseCurrency}):
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div className="md:self-end">
                    <p className="text-lg">
                      {amount.toLocaleString()} {baseCurrency} ={" "}
                      <strong>
                        {formatPrice(convert(amount, baseCurrency))}
                      </strong>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {loading
                        ? "Loading latest rates..."
                        : "Using latest exchange rates"}
                    </p>
                  </div>
                </div>
              </div> */}
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
