"use client";

import ApiFunction from "@/components/api/apiFuntions";
import { getFavouriteAuctions } from "@/components/api/ApiRoutesFile";
import { handleError } from "@/components/api/errorHandler";
import AuctionItems from "@/components/auction/auctionItems";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Page() {
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [loading, setLoading] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [data, setData] = useState([]);
  const { get } = ApiFunction()

  const fetchAuctions = debounce(async () => {
    if (loading) {
      setLoading(true);
    } else {
      setIsLoadMore(true);
    }
    await get(`${getFavouriteAuctions}${lastId}`)
      .then((result) => {
        console.log(result)
          setData((prev) => [...prev, ...result?.auctions]);
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
    fetchAuctions();
  }, [lastId]);

  return (
    <main className="bg_mainsecondary p-4">
      <div className="container">
        <div className="bg_white rounded-[9px] mt-20 mb-4 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
          <Row>
            <Col md="12" className="">
              <Breadcrumbs pageTitle={"Favourite"} />
              <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
                Favourite Auctions
              </h3>
            </Col>
          </Row>
        </div>
        <AuctionItems
          items={data}
          count={count}
          isLoadMore={isLoadMore}
          loading={loading}
          setIsLoadMore={setIsLoadMore}
          setLastId={setLastId}
          lastId={lastId}
          pageType="favourites"
          setData={setData}
        />
      </div>
    </main>
  );
}
