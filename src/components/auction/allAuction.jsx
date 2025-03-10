"use client";
import { Tabs } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { getAuctions } from "../api/ApiRoutesFile";
import Breadcrumbs from "../common/Breadcrumbs";
import { useRequestQuery } from "../redux/apiSlice";
import AuctionItems from "./auctionItems";

export default function AllAuction() {
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const onChange = (key) => {
    setActiveTab(key);
    setLastId(1);
    setCount(0);
    setLoading(true);
  };

  const { data, isLoading, error } = useRequestQuery({
    endpoint: `${getAuctions}${lastId}`,
  });

  const items = [
    {
      key: "all",
      label: "All Auctions",
      children: (
        <AuctionItems
          items={data?.auctions}
          loading={isLoading}
          setLastId={setLastId}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          count={count}
          lastId={lastId}
        />
      ),
    },
    {
      key: "trending",
      label: "Trending Auctions",
      children: (
        <AuctionItems
          items={data?.auctions}
          loading={isLoading}
          setLastId={setLastId}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          count={count}
          lastId={lastId}
        />
      ),
    },
    {
      key: "popular",
      label: "Popular Auctions",
      children: (
        <AuctionItems
          items={data?.auctions}
          loading={isLoading}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          setLastId={setLastId}
          count={count}
          lastId={lastId}
        />
      ),
    },
  ];

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Auctions"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              All Auctions
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className="bg_mainsecondary rounded-[9px] mt-4">
        <Row>
          <Col md="12" className="!px-0">
            <Tabs
              activeKey={activeTab}
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
