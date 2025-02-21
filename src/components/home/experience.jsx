/* eslint-disable react/jsx-key */
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { experience } from "../assets/icons/icon";
import { Check } from "react-feather";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { bounce, slideIn, staggerContainer } from "../utils/motion";

export default function Experience() {
  const features = [
    "Real-Time Bidding",
    "Secure Transactions",
    "Wide Range of Lots",
    "Transparent Pricing",
  ];

  return (
    <>
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="pb-4 md:pb-[5rem] bg_white overflow-hidden"
      >
        <Container>
          <Row>
            <Col md="6">
              <motion.div className="" variants={slideIn("left", "tween", 0.3, 0.8)}>
                <Image src={experience} alt="experience" width={"90%"} />
              </motion.div>
            </Col>
            <Col md="6">
              <motion.div className="flex justify-center flex-col h-full" variants={slideIn("right", "tween", 0.3, 0.8)}>
                <div className="flex gap-3 justify-center md:justify-start items-center  mb-[10px]">
                  <div className="w-8 h-2 bg_primary rounded-full"></div>
                  <h6 className="text-[#202020] poppins_semibold text-xl capitalize">
                    about Castle Auction
                  </h6>
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-md-start text_primary poppins_medium capitalize mb-2 md:mb-8">
                  experience of the <br />
                  <span className="text-black poppins_medium">
                    future auctions
                  </span>
                </h4>
                <p className="poppins_regular text-center text-md-start text-base sm:text-lg md:text-xl text-[#8B8B8B] mb-3 md:mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et{" "}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4 md:mb-5">
                  {features.map((feature, index) => {
                    return (
                      <div key={index} className="flex items-center justify-start gap-3">
                        <FaCheck className="text_primary" size={20} />
                        <p className="text_primary poppins_medium text-sm sm:text-base md:text-xl">
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <motion.button className="poppins_semibold text-sm md:text-lg text_white w-1/2 py-3 mx-auto bg_primary rounded-lg">
                  Read More
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.main>
    </>
  );
}