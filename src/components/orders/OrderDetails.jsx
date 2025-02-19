"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Col, Container, Row } from "reactstrap";
import {
    allDark,
    allLight,
    deliveredDark,
    deliveredLight,
    shippedDark,
    shippedLight,
    transitDark,
    transitLight
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";

export default function OrderDetails() {
  const [currentActiveButton, setCurrentActiveButton] = useState("all orders");
  const router = useRouter()
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
            <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-2 px-5 rounded-[11px]">
                <h4 className="poppins_semibold text-lg text-[#202020]">order details</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
