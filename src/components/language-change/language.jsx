/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import ApiFunction from "../api/apiFuntions";
import { getLanguage, setLanguage } from "../redux/language/languageSlice";
import { apiSlice } from "../redux/apiSlice";
import { apiSlice2 } from "../redux/apiSlice2";

const Language = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = ApiFunction();
  const userLanguage = useSelector(getLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const handleChangeLanguage = (lan) => {
    dispatch(setLanguage(lan));
    // dispatch(
    //   apiSlice.util.invalidateTags([
    //     "Auction",
    //     "Products",
    //     "User",
    //     "Bid",
    //     "Favorites",
    //   ])
    // );
    // dispatch(apiSlice2.util.invalidateTags(["Payments"]));
    dispatch(apiSlice.util.resetApiState());
    dispatch(apiSlice2.util.resetApiState());
    // window.location.reload();
    i18n.changeLanguage(lan);
  };

  useEffect(() => {
    if (i18n.language !== userLanguage) {
      i18n.changeLanguage(userLanguage);
    }
  }, [userLanguage]);

  return (
    <div className="relative">
      {/* Language Icon */}
      <div
        className="bg-white border px-2 px-md-3 py-1 py-md-2 rounded-md flex items-center justify-center cursor-pointer text-sm md:text-base gap-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span>
          {userLanguage === "ar" ? t("nav.arabic") : t("nav.english")}
        </span>
        <GrLanguage className="w-[1rem] h-[1rem] md:w-[1.2rem] md:h-[1.2rem] text_primary" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 w-full bg-white border border-gray-200 rounded shadow-[0px_4px_22.9px_0px_#0000000D] z-10"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            className={`p-2 hover:bg-gray-100 text-center cursor-pointer ${
              userData?.lang === "en"
                ? "primary-color font-bold"
                : "text-gray-800"
            }`}
            onClick={() => handleChangeLanguage("en")}
          >
            {t("nav.english")}
          </div>
          <div
            className={`p-2 hover:bg-gray-100 text-center cursor-pointer ${
              userData?.lang === "ar"
                ? "primary-color font-bold"
                : "text-gray-800"
            }`}
            onClick={() => handleChangeLanguage("ar")}
          >
            {t("nav.arabic")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
