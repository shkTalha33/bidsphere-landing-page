"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Col, Container, Row } from "reactstrap";
import {
  allDark,
  allLight,
  car1,
  deliveredDark,
  deliveredLight,
  shippedDark,
  shippedLight,
  transitDark,
  transitLight,
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";
import { BiMessage } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";
import AlertSection from "../common/alertSection";

export default function OrderDetails() {
  const [currentActiveButton, setCurrentActiveButton] = useState("all orders");
  const [currentSelectedButton, setCurrentSelectedButton] =
    useState("order summary");
  const router = useRouter();
  const onChange = (key) => {
    console.log(key);
  };

  const sideButtons = [
    {
      title: "all orders",
      lightImage: allLight,
      darkImage: allDark,
    },
    { title: "in transit ", lightImage: transitLight, darkImage: transitDark },
    {
      title: "shipped",
      lightImage: shippedLight,
      darkImage: shippedDark,
    },
    {
      title: "delivered",
      lightImage: deliveredLight,
      darkImage: deliveredDark,
    },
  ];

  const orderDetailButtons = [
    "order summary",
    "delivery information",
    "delivery timeline",
  ];

  const orderSummary = [
    { title: "Lot Number", value: "8765" },
    { title: "Item Description", value: "8765" },
    { title: "Winning Bid Amount", value: "8765" },
    { title: "Payment Method", value: "8765" },
    { title: "payment date", value: "8765" },
  ];

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Orders"} />
            <h3 className="text-3xl poppins_medium text-[#1C201F]">Orders</h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-5 rounded-[9px] mt-4">
        <Row className="rounded-[9px] g-3">
          <Col md="3">
            <div className="flex flex-col gap-4 items-center justify-center">
              {sideButtons.map((button) => {
                return (
                  <button
                    className={`${
                      currentActiveButton === button?.title
                        ? "bg_primary text-white"
                        : "bg-[#F5F5F5] text-[#909495]"
                    } rounded-[10px] w-full flex items-center justify-start gap-4 p-4 capitalize`}
                    onClick={() => setCurrentActiveButton(button?.title)}
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
          <Col md="9" className="">
            <div className="bg-[#FAFAFA] p-4 rounded-[11px] flex flex-col">
              <h4 className="poppins_semibold text-xl text-[#202020] capitalize">
                order details
              </h4>

              <Row className="bg_white rounded-[7px] border-1 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3 mt-4">
                <Col md="10">
                  <div className="flex items-start gap-4">
                    <Image src={car1} className="w-[72px]" />
                    <div className="">
                      <p className="text-[#25324B] poppins_semibold text-[22px] capitalize">
                        Classic Cars Auction.
                      </p>
                      <p className="text-[#7C8493] poppins_medium text-[10px] capitalize">
                        here is order detail
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="2" className="">
                  <div className="bg_lightsecondary flex items-center justify-center w-9 h-9 rounded-full ml-auto cursor-pointer">
                    <TbMessage color="#21CD9D" size={28} />
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <AlertSection
                  type={"info"}
                  message={"info"}
                  description={
                    "Your order is shipped on 24 january 2025. You will receive it soon."
                  }
                />
              </Row>
              <Row className="bg_white rounded-[7px] border-1 my-2 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3">
                <Col md="12">
                  <div className="border-1 border-[#DCE1EF] rounded-[43px] p-2 flex items-center justify-start gap-2">
                    {orderDetailButtons.map((buttonDetail) => {
                      return (
                        <button
                          className={`${
                            currentSelectedButton === buttonDetail
                              ? "bg_primary text-white poppins_semibold rounded-[82px]"
                              : "text-[#6E7591]"
                          } text-[15px] px-4 py-2 cursor-pointer capitalize`}
                          onClick={() => {
                            setCurrentSelectedButton(buttonDetail);
                          }}
                        >
                          {buttonDetail}
                        </button>
                      );
                    })}
                  </div>
                </Col>
              </Row>

              <Row className="bg_white rounded-[7px] border-1 my-2 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3">
                <Col md="12">
                  <p className="text-[#202020] poppins_semibold text-[12px] mb-2">
                    Order Summary
                  </p>
                  {orderSummary.map((order, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center my-2 justify-between bg_lightsecondary px-3 py-2 border-[0.5px] rounded-md border-[#F8F9FA]"
                      >
                        <p className="mb-0 poppins_medium text-sm text_dark ">
                          {order?.title}
                        </p>
                        <p className="mb-0 poppins_semibold text-base text_dark">
                          {order?.value}
                        </p>
                      </div>
                    );
                  })}
                </Col>
              </Row>
              <Row>
          <Col md="6" className="text-end ml-auto mt-4 px-0">
            <button
              type="submit"
              className="bg_primary text-white px-6 py-3 rounded-lg w-[50%] poppins_semibold text-[22px]"
              onClick={() => router.push("/payments/statics")}
            >
              Download As PDF
            </button>
          </Col>
        </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
