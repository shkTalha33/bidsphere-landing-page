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
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const PrivacyPolicyPage = () => {
  const [loading, setLoading] = useState(false);
  const [privacyData, setPrivacyData] = useState("");
  const { get } = ApiFunction();
  const { t } = useTranslation();
  const language = useSelector((state) => state?.language?.language);

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
  }, [language]);

  return (
    <main
      className="flex flex-col items-start"
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
            description={t("privacy.heading3")}
            mt={"mt-0 md:mt-0"}
            title={t("privacy.heading")}
          />
          <div className={`bg-white p-3 p-md-4 rounded-lg w-full shadow-sm`}>
            {loading ? (
              <Skeleton active />
            ) : privacyData?.description ? (
              <>
                <h5
                  className={`text-xl md:text-2xl poppins_medium mb-2 mb-md-4 ${
                    language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("privacy.heading")}
                </h5>
                <div
                  className={`ckData ${
                    language === "ar" ? "text-end" : "text-start"
                  }`}
                  dangerouslySetInnerHTML={{ __html: privacyData?.description }}
                />
              </>
            ) : (
              <div
                className={`text-center py-4 text-gray-500 ${
                  language === "ar" ? "text-end" : "text-start"
                }`}
              >
                {t("privacy.heading2")}
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPolicyPage;
