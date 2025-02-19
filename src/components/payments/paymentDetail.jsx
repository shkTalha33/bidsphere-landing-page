"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Col, Container, Row } from "reactstrap";
import {
  auctionImage,
  payment,
  payment1,
  payment2,
  payment3,
  topupWallet,
} from "../assets/icons/icon";
import AuctionItems from "../auction/auctionItems";
import Breadcrumbs from "../common/Breadcrumbs";

export default function PaymentDetail() {
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState();
  const onChange = (key) => {
    console.log(key);
  };

  const router = useRouter();

  const auctionItems = [
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
    { title: "Demon Blast", price: "200.000", image: auctionImage },
  ];

  const items = [
    {
      key: "all",
      label: "All auctions",
      children: <AuctionItems items={auctionItems} />,
    },
    {
      key: "trending",
      label: "Trending Auctions",
      children: <AuctionItems items={auctionItems} />,
    },
    {
      key: "poppular",
      label: "Popular Auctions",
      children: <AuctionItems items={auctionItems} />,
    },
  ];

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
      cardNumber: "mailaddress@mail.com",
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
            <h3 className="text-3xl poppins_medium text-[#1C201F]">Payment</h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-5 rounded-[9px] mt-4">
        <Row className="bg_primary p-4 rounded-[9px]">
          <Col md="12" className="!px-0">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <p className="poppins_semibold text-[56px] text-white mb-0">
                  $450.54
                </p>
                <p className="poppins_regular text-3xl text-white mb-0">
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
          </Col>
        </Row>
        <Row className="bg-[#FAFAFA] p-4 rounded-[9px] mt-5">
          <Col md="12" className="!px-0">
            <p className="text_dark poppins_medium mb-4 text-[22px]">Topup</p>
          </Col>
          <Col md="12" className="!px-0">
            <div className="flex items-center justify-between mb-5">
              <input
                type="text"
                placeholder="Enter Amount"
                className="poppins_medium text-[#D0D0D0] w-[400px] border-1 border-gray-200 text-base p-4 rounded-lg"
              />
              <p className="poppins_medium text-[14px] mb-0 text_primary underline cursor-pointer">
                Add Payment Method
              </p>
            </div>
            <p className="text_dark poppins_medium mb-5 text-[22px] capitalize">
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
                  }  rounded-md py-4 px-4 cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={method?.image}
                        alt={method?.title}
                        className="w-9"
                      />
                      <p className={`mb-0`}>{method?.cardNumber}</p>
                    </div>
                    <p
                      className={`poppins_medium text-[14px] mb-0 ${
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
          <Col md="6" className="text-end ml-auto mt-4 px-0">
            <button
              type="submit"
              className="bg_primary text-white px-6 py-3 rounded-lg w-[50%] poppins_semibold text-[22px]"
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
