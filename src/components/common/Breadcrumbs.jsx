import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Breadcrumbs({ pageTitle }) {
  const { t } = useTranslation();
  return (
    <>
      <p className="poppins_regular text-base sm:text-lg text_primary mb-1 sm:mb-3">
        <Link className="text_dark" href={"/"}>
          {t("nav.home")}{" "}
        </Link>{" "}
        / {pageTitle}
      </p>
    </>
  );
}
