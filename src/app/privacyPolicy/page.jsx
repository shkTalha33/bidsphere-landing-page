/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getPrivacy } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Page = () => {
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
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("privacy.heading")} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("privacy.heading")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container fluid="xxl" className="mt-[2rem] mb-[4rem]">
        {loading ? (
          <Skeleton active />
        ) : (
          <div
            className="ckData"
            dangerouslySetInnerHTML={{ __html: privacyData?.description }}
          />
        )}
      </Container>
    </>
  );
};

export default Page;
