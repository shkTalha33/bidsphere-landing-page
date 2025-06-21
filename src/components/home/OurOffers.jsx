/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Col, Container, Row } from "reactstrap";
import { art, electronics, StaticImage, vehicles } from "../assets/icons/icon";
import PlansCard from "./PlanCard";
import CustomSwiper from "./CustomSwiper";
import { SwiperSlide } from "swiper/react";
import SectionHeadings from "../common/sectionHeadings";
import { motion } from "framer-motion";
import { staggerChildren } from "../utils/motion";
import ApiFunction from "../api/apiFuntions";
import { getCategory } from "../api/ApiFile";
import { useEffect } from "react";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

export default function OurOffers() {
  const { get } = ApiFunction();
  const { t } = useTranslation();

  const { data, isLoading, error } = useGetAuctionsQuery({
    endpoint: `${getCategory}`,
  });

  return (
    <motion.main
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pb-4 md:pb-[4rem] bg_white overflow-hidden"
    >
      <Container fluid="xxl">
        <Row>
          <SectionHeadings
            // title={t("category.heading")}
            heading1={t("category.heading2")}
            heading2={t("category.categories")}
            description={t("category.heading3")}
          />
          <Col md="12">
            {isLoading ? (
              <>
                <div>
                  <Skeleton active />
                </div>
              </>
            ) : (
              <>
                {data?.categories?.length > 0 ? (
                  <CustomSwiper
                    spaceBetween={10}
                    slidesPerView={3}
                    pagination={false}
                    loop={false}
                    navigation={true}
                    breakpoints={{
                      640: { spaceBetween: 5, slidesPerView: 2 },
                      768: { spaceBetween: 10, slidesPerView: 3 },
                      1024: { spaceBetween: 10, slidesPerView: 3 },
                    }}
                  >
                    {data?.categories?.map((feature, index) => (
                      <SwiperSlide key={index}>
                        <PlansCard plan={feature} index={index} />
                      </SwiperSlide>
                    ))}
                  </CustomSwiper>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        className="w-[5rem] h-[5rem]"
                        src={StaticImage}
                        alt=""
                      />
                      <h5>{t("category.categoryNotFound")}</h5>
                    </div>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
