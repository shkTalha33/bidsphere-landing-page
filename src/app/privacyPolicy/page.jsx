/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getPrivacy } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [privacyData, setPrivacyData] = useState("");
  const { get } = ApiFunction();
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

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
    <main className="">
      <Container
        fluid="xxl"
        className="bg_white rounded-[9px] p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("privacy.heading")} />
            <h3 className="text-xl sm:text-2xl poppins_medium text_dark">
              {t("privacy.heading")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container
        fluid="xxl"
        className="mt-3 mb-4 p-2 p-md-4 bg_white rounded-[9px] shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <div
            className="ckData"
            dangerouslySetInnerHTML={{ __html: privacyData?.description }}
          />
        )}
      </Container>
    </main>
  );
};

export default Page;
