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
      className="flex flex-col items-start pb-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="mx-auto p-2 p-md-4 flex flex-col lg:flex-row gap-3"
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
            <div className="flex justify-center items-center py-32 rounded-lg shadow-sm bg_white text-center px-2 px-md-4  w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <>
              <div className="bg-white p-3 p-md-4 rounded-lg w-full shadow-sm">
                <CurrencyConverter />
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
