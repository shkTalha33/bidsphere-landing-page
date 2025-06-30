/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAuctionByCategory, getAuctions } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import { StaticImage } from "@/components/assets/icons/icon";
import AuctionCard from "@/components/common/AuctionCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { Skeleton } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const Page = () => {
  const { id } = useParams();
  const { get } = ApiFunction();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctions, setAuctions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  // Fetch auctions data
  const fetchAuctions = async (page, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadMoreLoading(true);
      } else {
        setInitialLoading(true);
      }

      const api = `${getAuctions}/${page}?catId=${id}`;
      const res = await get(api);

      if (res?.success && res?.auctions?.length > 0) {
        if (isLoadMore) {
          setAuctions((prevAuctions) => [...prevAuctions, ...res.auctions]);
        } else {
          setAuctions(res.auctions);
        }
        setTotalPages(res?.count?.totalPage);
      } else if (!isLoadMore) {
        setAuctions([]);
        setTotalPages(0);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setInitialLoading(false);
      setLoadMoreLoading(false);
    }
  };

  // Handle initial data load
  const handleInitialLoad = () => {
    setCurrentPage(1);
    fetchAuctions(1, false);
  };

  // Handle load more button click
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchAuctions(nextPage, true);
  };

  // Reset and load data when id or language changes
  useEffect(() => {
    if (id) {
      handleInitialLoad();
    }
  }, [id, language]);

  return (
    <>
      <main className="mb-4" dir={language === "ar" ? "rtl" : "ltr"}>
        <Container
          fluid="xxl"
          className="bg_white rounded-[9px] p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        >
          <Row>
            <Col md="12">
              <Breadcrumbs pageTitle={t("allAuction.pageTitle")} />
              <h3 className="text-lg sm:text-xl md:text-2xl poppins_medium text_dark">
                {auctions?.[0]?.category?.name}
              </h3>
            </Col>
          </Row>
        </Container>

        {initialLoading ? (
          <>
            <Container fluid="xxl" className="mt-4">
              <Skeleton active />
            </Container>
          </>
        ) : (
          <>
            <Container fluid="xxl" className="rounded-[9px] mt-4">
              {auctions?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                    {auctions?.map((auction, index) => {
                      return (
                        <AuctionCard item={auction} key={index} index={index} />
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center h-[20rem] mt-4">
                    <Image
                      className="w-[5rem] h-[5rem]"
                      src={StaticImage}
                      alt=""
                    />
                    <div className="text-center poppins_medium mt-2">
                      {t("categoryAuction.heading2")}
                    </div>
                  </div>
                </>
              )}

              {/* Show load more button only if there are more pages */}
              {totalPages > 0 && totalPages > currentPage && (
                <section className="flex items-center justify-center mt-4">
                  <button
                    disabled={loadMoreLoading || initialLoading}
                    onClick={handleLoadMore}
                    className="bg_primary text_white py-2 px-7 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loadMoreLoading ? (
                      <BeatLoader color="#fff" size={10} />
                    ) : (
                      <>{t("categoryAuction.heading3")}</>
                    )}
                  </button>
                </section>
              )}
            </Container>
          </>
        )}
      </main>
    </>
  );
};

export default Page;
