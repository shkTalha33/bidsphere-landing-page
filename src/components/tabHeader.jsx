"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TabHeader = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state?.language?.language);
  const pathname = usePathname();
  const navItems = [
    { label: t("profil.heading"), path: "/profile/personal-information" },
    { label: t("profil.heading30"), path: "/profile/won-lots" },
    { label: t("profil.heading29"), path: "/profile/help-center" },
    { label: t("privacy.heading"), path: "/profile/privacy-policy" },
    { label: t("termConditions.heading"), path: "/profile/terms-condition" },
    { label: t("changeCurrency.heading"), path: "/profile/change-currency" },
  ];
  return (
    <div className="rounded flex h-100 flex-col gap-2 p-3 bg-white">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`
              block py-3 px-6 text-lg rounded-lg popins_medium
              ${
                pathname === item.path
                  ? "bg_primary text-white"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100 border-b border-gray-200"
              }
              ${language === "ar" ? "text-end" : "text-start"}
              transition-colors duration-200
            `}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default TabHeader;
