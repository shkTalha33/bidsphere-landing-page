"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Col, Container, Row } from "reactstrap";
import {
  payment,
  payment1,
  payment2,
  payment3,
  topupWallet,
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";
import useCurrency from "../hooks/useCurrency";

export default function PaymentDetail() {
  const { formatPrice, convert } = useCurrency();
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState();
  const onChange = (key) => {
    console.log(key);
  };

  const router = useRouter();

  const paymentMethods = [
    {
      image: payment,
      cardNumber: "**** **** **** 8970",
      expiryDate: "12/26",
      title: "visa",
    },
    {
      image: payment1,
      cardNumber: "**** **** **** 8970",
      expiryDate: "12/26",
      title: "master",
    },
    {
      image: payment2,
      cardNumber: "**** **** **** 8970",
      expiryDate: "12/26",
      title: "paypal",
    },
    { image: payment3, cardNumber: "Cash", expiryDate: "12/26", title: "cash" },
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
      <Container className="bg_white p-2 p-md-5 rounded-[9px] mt-4">
        <div className="bg_primary p-3 p-md-4 rounded-[9px]">
          <div className="flex items-center flex-wrap gap-2 gap-md-3 justify-between">
            <div className="flex gap-2 gap-md-4 flex-wrap items-center">
              <p className="poppins_semibold text-2xl sm:text-3xl md:text-4xl text-white mb-0">
                {formatPrice(convert(450.54, "LBP"))}
              </p>
              <p className="poppins_regular text-sm sm:text-xl md:text-2xl text-white mb-0">
                is Available balance
              </p>
            </div>
            <button className="flex gap-3 py-1 sm:py-2 px-3 md:px-4 items-center justify-center bg-white rounded-[9px]">
              <Image
                src={topupWallet}
                className="w-6 h-6 md:w-7 md:h-7"
                alt="wallet"
              />
              <p className="mb-0 poppins_semibold text-[14px] text_primary">
                Topup
              </p>
              <div className="bg_primary p-1 rounded-full">
                {<FaArrowRight size={10} color="#fff" />}
              </div>
            </button>
          </div>
        </div>
        <Row className="bg-[#FAFAFA] p-3 p-md-4 rounded-[9px] mt-2 md:mt-5">
          <Col md="12" className="!px-0">
            <p className="text_dark poppins_medium mb-2 md:mb-4 text-[22px]">
              Topup
            </p>
          </Col>
          <Col md="12" className="!px-0">
            <div className="flex items-center flex-wrap justify-between gap-2 mb-3 mb-md-5">
              <input
                type="text"
                placeholder="Enter Amount"
                className="poppins_medium text-[#D0D0D0] w-[400px] border-1 border-gray-200 text-base p-2 p-md-4 rounded-lg"
              />
              <p className="poppins_medium text-[14px] mb-0 text_primary underline cursor-pointer">
                Add Payment Method
              </p>
            </div>
            <p className="text_dark poppins_medium mb-2 mb-md-5 text-base md:text-[22px] capitalize">
              Select Payment Method
            </p>
          </Col>
          <Row className="gap-3">
            {paymentMethods.map((method, index) => {
              return (
                <Col
                  md="12"
                  key={index}
                  onClick={() => setCurrentPaymentMethod(method?.title)}
                  className={`${
                    currentPaymentMethod === method?.title
                      ? "bg_primary"
                      : "bg_white"
                  }  rounded-md p-2 p-md-4 cursor-pointer`}
                >
                  <div className="flex items-center gap-2 gap-md-3 justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={method?.image}
                        alt={method?.title}
                        className="w-7 md:w-9"
                      />
                      <p className={`mb-0 text-[10px] sm:text-xs md:text-base`}>
                        {method?.cardNumber}
                      </p>
                    </div>
                    <p
                      className={`poppins_medium text-[10px] sm:text-xs md:text-[14px] mb-0 ${
                        currentPaymentMethod === method?.title
                          ? "text_white"
                          : "text_primary"
                      } cursor-pointer`}
                    >
                      Expires: {method?.expiryDate}
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Row>
        <Row>
          <Col md="6" className="text-end ml-auto mt-4 px-3 px-md-0">
            <button
              type="submit"
              className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full sm:w-[50%] poppins_semibold text-base sm:text-[22px]"
              onClick={() => router.push("/payments/statics")}
            >
              Done
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
