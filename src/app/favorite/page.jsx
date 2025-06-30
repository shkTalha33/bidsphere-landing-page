"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  useGetFavoriteAuctionsQuery,
  useToggleFavoriteAuctionMutation,
} from "@/components/redux/apiSlice";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FavoriteAuctionItems from "./FavoriteAuctionItems"; // We'll create this next
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import { getLanguage } from "@/components/redux/language/languageSlice";

export default function FavoritesPage() {
  const [lastId, setLastId] = useState(1);
  const { t } = useTranslation();
  const language = useSelector(getLanguage);
  // Use the new favorites query
  const { data, isFetching, isError, error } =
    useGetFavoriteAuctionsQuery(lastId);

  // Get the toggle mutation
  const [toggleFavorite] = useToggleFavoriteAuctionMutation();

  const handleLoadMore = () => {
    setLastId((prevId) => prevId + 1);
  };

  // Log any errors
  useEffect(() => {
    if (isError) {
      console.error("Error fetching favorites:", error);
    }
  }, [isError, error]);

  return (
    <>
      <Container fluid="xxl" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="bg_white rounded-[9px] mb-4 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
          <Row>
            <Col md="12">
              <Breadcrumbs pageTitle={t("favorite.pageTitle")} />
              <h3 className="text-xl sm:text-2xl poppins_medium text_dark">
                {t("favorite.heading1")}
              </h3>
            </Col>
          </Row>
        </div>
        <FavoriteAuctionItems
          items={data?.auctions || []}
          count={data?.count?.totalPage || 0}
          loading={isFetching}
          lastId={lastId}
          handleLoadMore={handleLoadMore}
          toggleFavorite={toggleFavorite}
        />
      </Container>
    </>
  );
}
