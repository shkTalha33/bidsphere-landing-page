/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";
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
} from "../../../components/assets/icons/icon";

import AlertSection from "@/components/common/alertSection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { TbArrowBackUp } from "react-icons/tb";
import { Skeleton } from "antd";
import toast from "react-hot-toast";
import { encryptData } from "@/components/api/encrypted";
import ApiFunction from "@/components/api/apiFuntions";
import moment from "moment";
import OrderSummary from "./orderSummary";
import DeliveryInfo from "./deliveryInfo";
import DeliveryTime from "./deliveryTime";
import { useTranslation } from "react-i18next";

export default function OrderDetails({ orderDetail, detailLoading, backrout }) {
  const { t } = useTranslation();
  const [currentSelectedButton, setCurrentSelectedButton] =
    useState(`${t("order.heading16")}`);
  const router = useRouter();
  const onChange = (key) => {};
  const { userData } = ApiFunction();

  const orderDetailButtons = [
    `${t("order.heading16")}`,
    `${t("order.heading17")}`,
    `${t("order.heading18")}`,
  ];

  const handleBakcOr = () => {
    router.push(backrout);
  };

  const handleChatUser = (user) => {
    if (!userData) {
      toast.error("Please login first");
      return;
    }
    const chatUser = {
      _id: user?._id,
      name: user?.name,
      images: [user?.images[0]] || "",
      email: "",
    };
    const enData = encodeURIComponent(encryptData(chatUser));
    router.push(`/chat?query=${enData}`);
  };

  return (
    <>
      <Container className="bg_white rounded-[9px]">
        {detailLoading ? (
          <>
            <div className="flex flex-col gap-4 p-3">
              <Skeleton active />
            </div>
          </>
        ) : (
          <>
            <section>
              <div className="bg-[#FAFAFA] p-4 rounded-[11px] flex flex-col">
                <h4 className="poppins_semibold text-base md:text-xl text-[#202020] capitalize">
                  {t("order.heading14")}
                </h4>

                <Row className="bg_white rounded-[7px] border-1 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3 mt-4">
                  <Col xs="10">
                    <div className="flex items-start gap-4">
                      <div>
                        <div className="h-[4rem] w-[4rem]">
                          <img
                            src={orderDetail?.auction?.images[0]}
                            alt=""
                            className="rounded-[50%] w-[100%] h-[100%] object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center flex-col w-[100%]">
                        <p className="text-[#25324B] poppins_semibold text-sm sm:text-base md:text-[22px] capitalize mb-0">
                          {orderDetail?.auction?.name}
                        </p>
                        <div
                          className="text-[#7C8493] poppins_medium line-clamp-2 mt-1 text-[10px] capitalize mb-0 abDatadi"
                          dangerouslySetInnerHTML={{
                            __html: orderDetail?.auction?.additionalinfo,
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs="2">
                    <div
                      onClick={handleBakcOr}
                      className="bg_lightsecondary flex items-center justify-center w-9 h-9 rounded-full ml-auto cursor-pointer"
                    >
                      <TbArrowBackUp color="#660000" size={24} />
                    </div>
                    {/* <div className="bg_lightsecondary flex items-center justify-center w-9 h-9 rounded-full ml-auto cursor-pointer">
                  <TbMessage color="#660000" size={24} />
                </div> */}
                  </Col>
                </Row>
                <section className="mt-3">
                  <h4 className="poppins_medium text-[1.5rem]">
                    {" "}
                    {t("order.heading15")}
                  </h4>
                  <div className="bg_white rounded-[7px] border-1 my-2 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3">
                    <div className="flex item-center gap-2">
                      <div>
                        <div className="w-[3rem] h-[3rem]">
                          <img
                            alt=""
                            src={orderDetail?.lot?.images[0]}
                            className="rounded-[50%] border w-[100%] h-[100%]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between w-[100%]">
                        <div className="flex flex-col w-[100%]">
                          <h5>{orderDetail?.lot?.name}</h5>
                          <div
                            className="text-[#7C8493] poppins_medium line-clamp-2 text-[10px] capitalize mb-0 abDatadi"
                            dangerouslySetInnerHTML={{
                              __html: orderDetail?.lot?.additionalinfo,
                            }}
                          />
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatUser(orderDetail?.lot);
                          }}
                          className="bg_lightsecondary flex items-center justify-center w-9 h-9 rounded-full ml-auto cursor-pointer"
                        >
                          <TbMessage color="#660000" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {orderDetail?.lot?} */}
                </section>
                {/* <Row className="mt-2">
                  <AlertSection
                    type="info"
                    message="Info"
                    description={`Your order is shipped ${moment(
                      orderDetail?.shippedDate
                    )
                      .local()
                      .format("DD-MMMM-YYYY")
                      .toLowerCase()}. You will receive it soon.`}
                  />
                </Row> */}
                <Row className="bg_white rounded-[7px] border-1 my-2 border-[#F8F9FA] shadow-[0px_1.4px_7.01px_0px_#EEEEEE80] items-center p-3">
                  <Col md="12">
                    <div className="border-1 border-[#DCE1EF] rounded-[43px] p-2 flex items-center justify-start gap-2 overflow-auto no-scrollbar">
                      {orderDetailButtons?.map((buttonDetail) => {
                        return (
                          <button
                            className={`${
                              currentSelectedButton === buttonDetail
                                ? "bg_primary text-white poppins_semibold rounded-[82px]"
                                : "text-[#6E7591] poppins_medium"
                            } text-sm sm:text-[15px] px-3 px-md-4 py-1 py-md-2 cursor-pointer capitalize whitespace-nowrap`}
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
                    {currentSelectedButton === `${t("order.heading16")}` && (
                      <OrderSummary orderDetail={orderDetail} />
                    )}

                    {currentSelectedButton === `${t("order.heading17")}` && (
                      <DeliveryInfo orderDetail={orderDetail} />
                    )}

                    {currentSelectedButton === `${t("order.heading18")}` && (
                      <DeliveryTime orderDetail={orderDetail} />
                    )}
                  </Col>
                </Row>
                {/* <Row>
                  <Col md="6" className="text-end ml-auto mt-4 px-0">
                    <button
                      type="submit"
                      className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full  poppins_semibold text-base sm:text-[22px] whitespace-nowrap"
                      onClick={() => router.push("/payments/statics")}
                    >
                      Download As PDF
                    </button>
                  </Col>
                </Row> */}
              </div>
            </section>
          </>
        )}
      </Container>
    </>
  );
}
