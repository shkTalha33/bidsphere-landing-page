"use client";

import { Col, Container, Row } from "reactstrap";
import { art, electronics, vehicles } from "../assets/icons/icon";
import PlansCard from "./PlanCard";

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
    <main className="py-[5rem] bg_white">
      <Container>
        <Row>
          <Col md="12">
            <div className="flex justify-center items-center gap-1 mb-[18px]">
              <div className="w-8 h-2 bg_primary rounded-full"></div>
              <p className="text-[#202020] inter_semibold text-2xl text-center">
                What We Offer
              </p>
            </div>
          </Col>
          <Col md="12">
            <h4 className="text_primary text-5xl text-center ">
              We Offer Creative Categories
            </h4>
            <p className="poppins_regular text-[#8F8F8F] text-center w-[70%] mx-auto mt-[3rem] mb-[5rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et{" "}
            </p>
          </Col>
          <Col md="12">
            <Row className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <PlansCard key={index} plan={feature} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
