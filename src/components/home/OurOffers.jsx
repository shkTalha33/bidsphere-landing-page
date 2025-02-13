"use client";

import { Col, Container, Row } from "reactstrap";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "./CustomSwiper";
import { art, electronics, vehicles } from "../assets/icons/icon"; // ✅ Ensure this path is correct

export default function OurOffers() {
  const features = [
    {
      title: "Arts and Abstracts",
      icon: art, 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      title: "Vehicles",
      icon: vehicles, 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      title: "Electronics",
      icon: electronics, 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h2>Valix Features</h2>
          <CustomSwiper>
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <h3>{feature.title}</h3>
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </Col>
      </Row>
    </Container>
  );
}
