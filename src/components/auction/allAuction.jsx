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
import { useDispatch, useSelector } from "react-redux";
import { setAllAuctions } from "../redux/auctionProduct";

export default function AllAuction() {
  const { get } = ApiFunction();
  const [loading, setLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.auctionProduct?.allAuctions);

  const onChange = (key) => {
    setActiveTab(key);
    setLastId(1);
    setCount(0);
    setLoading(true);
  };

  const fetchAuctions = debounce(async () => {
    if (loading) {
      setLoading(true);
    } else {
      setIsLoadMore(true);
    }
    await get(`${getAuctions}${lastId}`)
      .then((result) => {
        dispatch(setAllAuctions(result?.auctions));
        setCount(result?.count?.totalPage || 0);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        if (loading) {
          setLoading(false);
        } else {
          setIsLoadMore(false);
        }
      });
  }, 300);

  useEffect(() => {
    if (data?.length === 0 || lastId > 1) {
      fetchAuctions();
    } else {
      setLoading(false);
    }
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
          items={data}
          loading={loading}
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
          items={data}
          loading={loading}
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
