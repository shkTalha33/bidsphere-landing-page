/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { getPrivacy } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import TopSection from "@/components/common/TopSection";
import TabHeader from "@/components/tabHeader";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const [loading, setLoading] = useState(false);
  const [privacyData, setPrivacyData] = useState("");
  const { get } = ApiFunction();
  const { t } = useTranslation();

  const handlePrivacy = () => {
    setLoading(true);
    const api = getPrivacy;
    get(api)
      .then((res) => {
        if (res?.success) {
          setPrivacyData(res?.privacy);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePrivacy();
  }, []);

  return (
    <main className="bg-gray-100 flex flex-col items-start">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description={t("privacy.heading3")}
            mt={0}
            title={t("privacy.heading")}
          />
          <div className="bg-white px-8 py-6 rounded-lg w-full shadow-sm">
            {loading ? (
              <Skeleton active />
            ) : privacyData?.description ? (
              <>
                <h5 className="text-xl md:text-2xl poppins_medium mb-3">
                  {t("privacy.heading")}
                </h5>
                <div
                  className="ckData"
                  dangerouslySetInnerHTML={{ __html: privacyData?.description }}
                />
              </>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {t("privacy.heading2")}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
