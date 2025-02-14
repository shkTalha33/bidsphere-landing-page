import React from "react";
import { Col, Container, Row } from "reactstrap";

export default function AuctionEvents() {
  return (
    <main className="pb-20 bg-white">
      <Container>
        <Row className="g-3">
          <Col md="6" className="d-flex">
            <div className="event_1 w-full rounded-2xl flex flex-col justify-between p-16">
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
            </div>
          </Col>

          <Col md="6" className="d-flex">
            <div className="event_2 w-full rounded-2xl flex flex-col justify-between p-16">
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
            </div>
          </Col>
            <Col md="4">
            <div className="event_3 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
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
            </div>
            </Col>
            <Col md="4">
            <div className="event_4 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
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
              <button className="poppins_regular text-sm rounded-xl h-10 text-[#1B212C] w-36">
                Bid Now
              </button>
            </div>
            </Col>
            <Col md="4">
            <div className="event_5 w-full rounded-2xl flex flex-col justify-between px-8 py-16">
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
            </div>
            </Col>
        </Row>
      </Container>
    </main>
  );
}