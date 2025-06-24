"use client";
import RegistrationDetail from "@/components/auction/auctionRegistration.jsx/registrationDetail";
import React from "react";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { useSelector } from "react-redux";

const Page = () => {
  const language = useSelector(getLanguage);
  return (
    <main
      className="bg_mainsecondary p-2 md:py-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <RegistrationDetail />
    </main>
  );
};

export default Page;
