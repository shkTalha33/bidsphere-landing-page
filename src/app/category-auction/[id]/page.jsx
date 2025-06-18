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
  const [lastId, setLastId] = useState(1);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagiLoading, setPagiLoading] = useState(false);
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  // handle data by cat id
  const handleAuctionData = () => {
    if (lastId === 1) {
      setLoading(true);
    } else {
      setPagiLoading(true);
    }
    const api = `${getAuctions}/${lastId}?catId=${id}`;
    get(api)
      .then((res) => {
        if (res?.success & (res?.auctions?.length > 0)) {
          if (lastId === 1) {
            setAuctions(res.auctions);
          } else {
            setAuctions([...auctions, ...res?.auctions]);
          }
          setLastId(lastId + 1);
          setTotalPages(res?.count?.totalPage);
        }
        setLoading(false);
        setPagiLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
        setPagiLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleAuctionData();
    }
  }, [id ,language]);

  return (
    <>
      <main className="mb-4">
        <Container className="bg_white rounded-[9px] p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
          <Row>
            <Col md="12">
              <Breadcrumbs pageTitle="Auctions" />
              <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
                {t("categoryAuction.heading")}
              </h3>
            </Col>
          </Row>
        </Container>

        {loading ? (
          <>
            <div className="mt-4">
              <Skeleton active />
            </div>
          </>
        ) : (
          <>
            <Container className="bg-white rounded-[9px] mt-4">
              {auctions?.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
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
              {totalPages > 0 && (
                <>
                  {totalPages >= lastId && (
                    <section className="flex items-center justify-center mt-4">
                      <button
                        disabled={pagiLoading || loading}
                        onClick={handleAuctionData}
                        className="bg_primary text_white py-2 px-7 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        {pagiLoading ? (
                          <BeatLoader color="#fff" size={10} />
                        ) : (
                          <>{t("categoryAuction.heading3")}</>
                        )}
                      </button>
                    </section>
                  )}
                </>
              )}
            </Container>
          </>
        )}
      </main>
    </>
  );
};

export default Page;
