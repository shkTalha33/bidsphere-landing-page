/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Col, Container, Row } from "reactstrap";
import {
  ClockDark,
  ClockWhite,
  depositDark,
  depositWhite,
  refundDark,
  refundWhite,
  topupWallet,
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";
import DepositTracking from "./depositTracking";
import { formatPrice } from "../utils/formatPrice";

export default function PaymentStatics() {
  const [currentActiveButton, setCurrentActiveButton] = useState("deposit");
  const onChange = (key) => {
    console.log(key);
  };

  const sideButtons = [
    {
      key: "deposit",
      title: "deposit tracking",
      lightImage: depositWhite,
      darkImage: depositDark,
    },
    {
      key: "payment",
      title: "payment history",
      lightImage: ClockWhite,
      darkImage: ClockDark,
    },
    {
      key: "refund",
      title: "refund requests",
      lightImage: refundWhite,
      darkImage: refundDark,
    },
  ];

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Payment"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              Payment
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-3 p-md-4 rounded-[9px] mt-4">
        <div className="bg_primary p-4 rounded-[9px]">
          <div className="flex items-center flex-wrap gap-3 justify-between">
            <div className="flex gap-4 flex-wrap items-center">
              <p className="poppins_semibold text-3xl md:text-4xl text-white mb-0">
                {formatPrice(450.54)}
              </p>
              <p className="poppins_regular text-xl md:text-2xl text-white mb-0">
                is Available balance
              </p>
            </div>
            <button className="flex gap-3 py-2 px-4 items-center justify-center bg-white rounded-[9px]">
              <Image src={topupWallet} className="w-7 h-7" alt="wallet" />
              <p className="mb-0 poppins_semibold text-[14px] text_primary">
                Topup
              </p>
              <div className="bg_primary p-1 rounded-full">
                {<FaArrowRight size={10} color="#fff" />}
              </div>
            </button>
          </div>
        </div>
        <Row className="rounded-[9px] mt-5 g-3">
          <Col lg="3">
            <div className="flex flex-col gap-4 items-center justify-center">
              {sideButtons.map((button) => {
                return (
                  <button
                    className={`${
                      currentActiveButton === button?.key
                        ? "bg_primary text-white"
                        : "bg-[#F5F5F5] text-[#909495]"
                    } rounded-[10px] w-full flex items-center justify-start gap-4 p-4 capitalize`}
                    onClick={() => setCurrentActiveButton(button?.key)}
                  >
                    <div className="flex items-center w-full justify-between">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-9 h-9 ${
                            currentActiveButton === button?.title
                              ? "bg-white"
                              : "bg_primary"
                          } flex items-center justify-center p-2 rounded-full`}
                        >
                          <Image
                            src={
                              currentActiveButton === button?.title
                                ? button?.darkImage
                                : button?.lightImage
                            }
                            className=""
                          />
                        </div>
                        {button?.title}
                      </div>
                      <div
                        className={`${
                          currentActiveButton === button?.title
                            ? "bg-white text_dark"
                            : "bg_primary text-white"
                        } flex items-center justify-center p-1 rounded-full`}
                      >
                        {<FaArrowRight size={15} />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Col>

          {currentActiveButton === "deposit" && <DepositTracking />}
        </Row>
      </Container>
    </>
  );
}
