"use client";

import { Col, Container, Row } from "reactstrap";
import { art, electronics, vehicles } from "../assets/icons/icon";
import PlansCard from "./PlanCard";
import CustomSwiper from "./CustomSwiper";
import { SwiperSlide } from "swiper/react";
import SectionHeadings from "../common/sectionHeadings";
import { motion } from "framer-motion";
import { staggerChildren } from "../utils/motion";

export default function OurOffers() {
  const features = [
    {
      title: "Arts and Abstracts",
      icon: vehicles,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      title: "Vehicles",
      icon: art,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      title: "Electronics",
      icon: electronics,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
  ];

  return (
    <motion.main
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pb-4 md:pb-[5rem] bg_white overflow-hidden"
    >
      <Container>
        <Row>
          <SectionHeadings
            title="What We Offer"
            heading1={"We Offer Creative"}
            heading2={"Categories"}
            description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et"
          />
          <Col md="12">
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
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <PlansCard index={index} plan={feature} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
