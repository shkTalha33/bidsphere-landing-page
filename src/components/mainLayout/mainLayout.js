/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import { getLatestCurrencyRate } from "../api/ApiFile";
import { handleError } from "../api/errorHandler";
import debounce from "debounce";
import ApiFunction from "../api/apiFuntions";
import { setCurrencies } from "../redux/currency";

const MainLayout = ({ children }) => {
  const pathname = usePathname();
  const lang = useSelector((state) => state.auth.lang);
  const { i18n } = useTranslation();
  const pubRoute = ["/auth/", "/account-created"];
  const mobilePath = ["/", "/profile", "/live", "/shop", "/product"];
  const isMobileRoute = mobilePath.includes(pathname);
  const isPublicRoute = pubRoute.some((item) => pathname.startsWith(item));
  const { get } = ApiFunction();
  const dispatch = useDispatch();

  useEffect(() => {
    if (lang?.code) {
      i18n.changeLanguage(lang.code);
    }
  }, []);

  const handleUser = () => {
    get(getLatestCurrencyRate)
      .then((res) => {
        dispatch(setCurrencies(res?.ratedata?.conversion_rates));
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      {!isPublicRoute && <Header />}
      {children}
      {!isPublicRoute ? <Footer /> : null}
    </>
  );
};

export default MainLayout;
