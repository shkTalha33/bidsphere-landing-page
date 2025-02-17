import { motion } from "framer-motion";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { slideIn, staggerContainer } from "../utils/motion";
export default function AuctionEvents() {
  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pb-4 md:pb-[5rem] bg-white overflow-hidden"
    >
      <Container>
        <Row className="g-3">
          <Col md="6" className="d-flex">
            <motion.div variants={slideIn("left", "damping", 0.3, 0.8)} className="event_1 w-full rounded-2xl flex flex-col justify-between p-16">
              <div>
                <div className="poppins_regular text_white text-lg mb-4">
                  start from 20$
                </div>
                <div className="poppins_semibold text_white text-4xl capitalize">
                  classic
                </div>
                <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                  tyres
                </div>
              </div>
              <button className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36">
                Bid Now
              </button>
            </motion.div>
          </Col>

          <Col md="6" className="d-flex">
            <motion.div variants={slideIn("right", "damping", 0.3, 0.8)} className="event_2 w-full rounded-2xl flex flex-col justify-between p-16">
              <div>
                <div className="poppins_semibold text_white text-lg mb-4 text-center max-w-[10.5rem] px-2 py-1 bg-[#F31C28] rounded-xl">
                  start from 45$
                </div>
                <div className="poppins_regular text_white text-4xl capitalize">
                  New
                </div>
                <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                  Air Hockey
                </div>
              </div>
              <button className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36">
                Bid Now
              </button>
            </motion.div>
          </Col>
          <Col md="4">
            <motion.div variants={slideIn("left", "damping", 0.3, 0.8)} className="event_3 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
              <div>
                <div className="poppins_semibold text_white text-lg mb-4 text-center max-w-[10.5rem] px-2 py-1 bg-[#F31C28] rounded-xl">
                  start from 45$
                </div>
                <div className="poppins_regular text_white text-4xl capitalize">
                  Sculpture
                </div>
                <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                  Handmade
                </div>
              </div>
              <button className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36">
                Bid Now
              </button>
            </motion.div>
          </Col>
          <Col md="4">
            <motion.div variants={slideIn("up", "damping", 0.3, 0.8)} className="event_4 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
              <div>
                <div className="poppins_semibold text_white text-lg mb-4 text-center max-w-[10.5rem] px-2 py-1 bg-[#F31C28] rounded-xl">
                  start from 45$
                </div>
                <div className="poppins_regular text-[#161616] text-4xl capitalize">
                  Radio
                </div>
                <div className="poppins_semibold text_darkprimary text-4xl mb-8 capitalize">
                  Control
                </div>
              </div>
              <button className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36">
                Bid Now
              </button>
            </motion.div>
          </Col>
          <Col md="4">
            <motion.div variants={slideIn("right", "damping", 0.3, 0.8)} className="event_5 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
              <div>
                <div className="poppins_semibold text_white text-lg mb-4 text-center max-w-[10.5rem] px-2 py-1 bg-[#FBD118] rounded-xl">
                  start from 45$
                </div>
                <div className="poppins_semibold text_darkprimary text-4xl capitalize">
                  game panels
                </div>
                <div className="poppins_regular text_darkprimary text-lg mb-8 capitalize">
                  Don't Miss The Deal
                </div>
              </div>
              <button className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36">
                Bid Now
              </button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
