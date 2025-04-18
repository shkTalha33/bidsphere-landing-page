/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getTerms } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [termData, setTermData] = useState("");
  const { get } = ApiFunction();

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
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Term & Condition"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              Term & Condition
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
            dangerouslySetInnerHTML={{ __html: termData?.description }}
          />
        )}
      </Container>
    </>
  );
};

export default Page;
