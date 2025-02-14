"use client";

import { Col, Container, Row } from "reactstrap";
import { art, electronics, vehicles } from "../assets/icons/icon";
import PlansCard from "./PlanCard";
import CustomSwiper from "./CustomSwiper";
import { SwiperSlide } from "swiper/react";
import SectionHeadings from "../common/sectionHeadings";

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
    <main className="pb-[5rem] bg_white">
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
              slidePerView={3}
              pagination={false}
              loop={false}
              navigation={true}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <PlansCard key={index} plan={feature} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
