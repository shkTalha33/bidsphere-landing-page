"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Progress, Tabs } from "antd";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import AuctionItems from "../auctionItems";
import { auctionImage } from "@/components/assets/icons/icon";
import { useState } from "react";
import PersonalInfo from "./personalInfo";
import DocumentUpload from "./documentUpload";
import PaymentDetail from "./paymentDetail";

const RegistrationDetail = () => {
  const [progress, setProgress] = useState(0);

  const onChange = (key) => {
    console.log(key);
  };

  const auctionItems = [
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
  ];
  const items = [
    {
      key: "personal",
      label: "Personal Information",
      children: <PersonalInfo setProgress={setProgress} />,
    },
    {
      key: "document",
      label: "Document Upload",
      children: <DocumentUpload setProgress={setProgress} />,
    },
    {
      key: "security",
      label: "Security Deposit Payment",
      children: <PaymentDetail setProgress={setProgress} />,
    },
    {
      key: "review",
      label: "Review & Submit",
      children: <AuctionItems items={auctionItems} />,
    },
  ];
  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Registration"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text-[#1C201F]">
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
            <Progress percent={progress} strokeColor={"#21CD9D"}  size={['100%', 8]} showInfo={false} />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="bg_mainsecondary rounded-[9px] mt-2 md:mt-4">
        <Row>
          <Col md="12" className="!px-0">
            <Tabs
              defaultActiveKey="personal"
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
