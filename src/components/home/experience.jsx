import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { experience } from "../assets/icons/icon";
import { Check } from "react-feather";
import { FaCheck } from "react-icons/fa";

export default function Experience() {
  const features = [
    "Real-Time Bidding",
    "Secure Transactions",
    "Wide Range of Lots",
    "Transparent Pricing",
  ];
  return (
    <>
      <main className="pb-[5rem] bg_white">
        <Container>
          <Row>
            <Col md="6">
              <Image src={experience} alt="experience" width={"90%"} />
            </Col>
            <Col md="6">
              <div className="flex  justify-center flex-col h-full">
                <div className="flex gap-3 justify-start items-center  mb-[10px]">
                  <div className="w-8 h-2 bg_primary rounded-full"></div>
                  <h6 className="text-[#202020] poppins_semibold text-xl capitalize">
                    about our bidsphere
                  </h6>
                </div>
                <h4 className="text-5xl text_primary poppins_medium capitalize mb-8">
                  experience of the <br />
                  <span className="text-black poppins_medium">
                    future auctions
                  </span>
                </h4>
                <p className="poppins_regular text-xl text-[#8B8B8B] mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et{" "}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {features.map((feature) => {
                    return (
                      <div className="flex items-center justify-start gap-3">
                        <FaCheck className="text_primary" size={20} />
                        <p className="text_primary poppins_medium text-xl">
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <button className="poppins_semibold text-lg text_white w-1/2 py-3 mx-auto bg_primary rounded-lg">
                  Read More
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
