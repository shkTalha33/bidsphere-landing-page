"use client";
import { Tabs } from "antd";
import { useState, useMemo } from "react";
import { Col, Container, Row } from "reactstrap";
import { getAuctions } from "../api/ApiFile";
import Breadcrumbs from "../common/Breadcrumbs";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import AuctionItems from "./auctionItems";
import { useTranslation } from "react-i18next";

export default function AllAuction() {
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useTranslation();
  const [lastId, setLastId] = useState({
    all: 1,
    popular: 1,
    trending: 1,
  });

  // Define query parameters for all tabs
  const allQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.all,
      params: {},
    }),
    [lastId.all]
  );

  const trendingQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.trending,
      params: { trending: true },
    }),
    [lastId.trending]
  );

  const popularQueryParams = useMemo(
    () => ({
      endpoint: getAuctions,
      id: lastId.popular,
      params: { popular: true },
    }),
    [lastId.popular]
  );

  // Use separate queries for each tab to ensure data isolation
  const allResults = useGetAuctionsQuery(allQueryParams);
  const trendingResults = useGetAuctionsQuery(trendingQueryParams);
  const popularResults = useGetAuctionsQuery(popularQueryParams);

  // Select the correct query results based on active tab
  const getActiveTabResults = () => {
    switch (activeTab) {
      case "trending":
        return trendingResults;
      case "popular":
        return popularResults;
      default:
        return allResults;
    }
  };

  const { data, isFetching } = getActiveTabResults();

  const handleLoadMore = () => {
    setLastId((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 1,
    }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "all",
      label: t("allAuction.heading"),
      data: allResults.data,
      loading: allResults.isFetching,
    },
    {
      key: "trending",
      label: t("allAuction.heading2"),
      data: trendingResults.data,
      loading: trendingResults.isFetching,
    },
    {
      key: "popular",
      label: t("allAuction.heading3"),
      data: popularResults.data,
      loading: popularResults.isFetching,
    },
  ].map((tab) => ({
    key: tab.key,
    label: tab.label,
    children: (
      <AuctionItems
        items={tab.data?.auctions || []}
        loading={tab.loading}
        count={tab.data?.count?.totalPage || 0}
        lastId={lastId[tab.key]}
        handleLoadMore={handleLoadMore}
      />
    ),
  }));

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle="Auctions" />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("allAuction.heading")}
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
