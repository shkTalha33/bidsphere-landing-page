"use client";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../common/Breadcrumbs";
import { Tabs } from "antd";
import { auctionImage } from "../assets/icons/icon";
import AuctionItems from "./auctionItems";
import TopSection from "../common/TopSection";

export default function AllAuction() {
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
      key: "all",
      label: "All auctions",
      children: <AuctionItems items={auctionItems} />,
    },
    {
      key: "trending",
      label: "Trending Auctions",
      children: <AuctionItems items={auctionItems} />,
    },
    {
      key: "poppular",
      label: "Popular Auctions",
      children: <AuctionItems items={auctionItems} />,
    },
  ];

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Auctions"} />
            <h3 className="text-3xl poppins_medium text-[#1C201F]">
              All Auctions
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className="bg_mainsecondary rounded-[9px] mt-4">
        <Row>
          <Col md="12" className="!px-0">
            <Tabs
              defaultActiveKey="all"
              size="large"
              items={items}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
