/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { getTerms } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import TopSection from "@/components/common/TopSection";
import TabHeader from "@/components/tabHeader";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
/* eslint-disable @next/next/no-img-element */

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [termData, setTermData] = useState("");
  const { get } = ApiFunction();
  const { t } = useTranslation();
  const language = useSelector((state) => state?.language?.language);

  const handleTerms = () => {
    setLoading(true);
    const api = getTerms;
    get(api)
      .then((res) => {
        if (res?.success) {
          setTermData(res?.terms);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    handleTerms();
  }, []);
  return (
    <main className="bg-gray-100 flex flex-col items-start">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description={t("termConditions.heading2")}
            mt={0}
            title={t("termConditions.heading")}
          />
          <div className="bg-white px-8 py-6 rounded-lg w-full shadow-sm">
            <div className="p-3 p-md-4 rounded-4 bg_white">
              {loading ? (
                <Skeleton active />
              ) : (
                <>
                  <h5
                    className={`text-xl md:text-2xl poppins_medium mb-3 ${
                      language === "ar" ? "text-end" : "text-start"
                    }`}
                  >
                    {t("termConditions.heading")}
                  </h5>

                  <div
                    className={`ckData ${
                      language === "ar" ? "text-end" : "text-start"
                    }`}
                    dangerouslySetInnerHTML={{ __html: termData?.description }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
