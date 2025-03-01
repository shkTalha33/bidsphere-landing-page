"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Progress, Tabs } from "antd";
import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import AuctionItems from "../auctionItems";
import { auctionImage } from "@/components/assets/icons/icon";
import { useState } from "react";
import PersonalInfo from "./personalInfo";
import DocumentUpload from "./documentUpload";
import PaymentDetail from "./paymentDetail";
import { useSearchParams } from "next/navigation";
import ReviewAndSubmit from "./ReviewAndSubmit";

const RegistrationDetail = () => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({});
  const [active, setActive] = useState("personal");
  const searchParams = useSearchParams();

  console.log('data', data)

  const items = [
    {
      key: "personal",
      label: "Personal Information",
      children: (
        <PersonalInfo setProgress={setProgress} data={data} setData={setData} />
      ),
    },
    {
      key: "document",
      label: "Document Upload",
      children: (
        <DocumentUpload
          setProgress={setProgress}
          data={data}
          setData={setData}
        />
      ),
    },
    {
      key: "security",
      label: "Security Deposit Payment",
      children: (
        <PaymentDetail
          setProgress={setProgress}
          data={data}
          setData={setData}
        />
      ),
    },
    {
      key: "review",
      label: "Review & Submit",
      children: (
        <ReviewAndSubmit
          setProgress={setProgress}
          data={data}
          setData={setData}
        />
      ),
    },
  ];

  const onChange = (tab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("selected", tab);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    setActive(tab);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedTab = params.get("selected");
    console.log("selectedTab", selectedTab);
    if (selectedTab) {
      setActive(selectedTab);
    } else {
      params.set("selected", "personal");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
      setActive("personal");
    }
  }, []);

  console.log("activeTab", active);

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Registration"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              Auction Registration
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white rounded-[9px] mt-2 md:mt-4 p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <h3 className="capitalize poppins_semibold text-lg sm:text-xl md:text-2xl text_dark mb-1 md:mb-[10px]">
              personal information
            </h3>
            <h3 className="capitalize poppins_regular text-xs sm:text-sm md:text-lg text_secondary2">
              enter required information here
            </h3>
          </Col>
          <Col md="12" className="mt-2 md:mt-4">
            <h3 className="capitalize poppins_regular text-sm sm:text-lg md:text-xl text-[#8D8D8D] mb-[10px]">
              Your progress
            </h3>
            <h3 className="capitalize poppins_regular text-xs sm:text-base md:text-lg text_primary mb-2">
              {progress}% to complete
            </h3>
            <div className="">
              <Progress
                percent={progress}
                strokeColor={"#21CD9D"}
                size={["100%", 8]}
                showInfo={false}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="bg_mainsecondary rounded-[9px] mt-2 md:mt-4">
        <Row>
          <Col md="12" className="!px-0">
            <Tabs
              activeKey={active}
              size="large"
              items={items}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationDetail;
