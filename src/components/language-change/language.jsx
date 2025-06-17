/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../redux/language/languageSlice";
import { GrLanguage } from "react-icons/gr";
import { useRouter } from "next/navigation";
import ApiFunction from "../api/apiFuntions";
import { updateUser } from "../api/ApiFile";
import { setLogin, setUserData } from "../redux/loginForm";

const Language = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { put, userData } = ApiFunction();
  const userLanguage = useSelector(getLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleChangeLanguage = (lan) => {
    //   const api = updateUser;
    //   const apiData = {
    //     lang: lan,
    //   };
    //   put(api, apiData)
    //     .then((res) => {
    //       if (res?.success) {
    //         dispatch(setUserData(res?.user));
    //         dispatch(setLanguage(lan));
    //         i18n.changeLanguage(lan);
    //         dispatch(setLogin(true));
    //         window.location.reload();
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error, "error");
    //     });
    // s

    dispatch(setLanguage(lan));
    i18n.changeLanguage(lan);
    window.location.reload();
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
        className=" bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <GrLanguage className="w-[1.2rem] h-[1.2rem] text-white" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 w-24 bg-white border border-gray-200 rounded shadow-[0px_4px_22.9px_0px_#0000000D] z-10"
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
