"use client";
import { Tabs } from "antd";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import { getAuctions } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import Breadcrumbs from "../common/Breadcrumbs";
import AuctionItems from "./auctionItems";

export default function AllAuction() {
  const { get } = ApiFunction();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // Track active tab

  const onChange = (key) => {
    setActiveTab(key); // Update active tab
    setLastId(1); // Reset lastId to default
    setCount(0);
    setData([]); // Reset data to default
    setLoading(true); // Set loading state to true before fetching new data
    setHasMore(true)
  };

  const fetchAuctions = debounce(async () => {
    if (loading) {
      setLoading(true)
    }else{
      setIsLoadMore(true)
    }
    await get(`${getAuctions}${lastId}`)
      .then((result) => {
        if (result?.success) {
          setData((prev) => [...prev, ...result?.auctions] );
          setCount(result?.count?.totalPage || 0);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        if (loading) {
          setLoading(false)
        }else{
          setIsLoadMore(false)
        }
      });
  }, 300);

  useEffect(() => {
    if (count === lastId) {
      setHasMore(false)
    }else{
      setHasMore(true)
    }
    fetchAuctions();
  }, [lastId, activeTab]);

  const items = [
    {
      key: "all",
      label: "All Auctions",
      children: (
        <AuctionItems
          items={data}
          loading={loading}
          setLastId={setLastId}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          hasMore={hasMore}
          count={count}
        />
      ),
    },
    {
      key: "trending",
      label: "Trending Auctions",
      children: (
        <AuctionItems
          items={data}
          loading={loading}
          setLastId={setLastId}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          hasMore={hasMore}
          count={count}
        />
      ),
    },
    {
      key: "popular",
      label: "Popular Auctions",
      children: (
        <AuctionItems
          items={data}
          loading={loading}
          isLoadMore={isLoadMore}
          setIsLoadMore={setIsLoadMore}
          setLastId={setLastId}
          hasMore={hasMore}
          count={count}
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
