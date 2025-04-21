/* eslint-disable @next/next/no-img-element */
import AlertSection from "@/components/common/alertSection";
import useCurrency from "@/components/hooks/useCurrency";
import { Skeleton } from "antd";
import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Invoice = ({ orderDetail, detailLoading }) => {
  const { formatPrice, convert } = useCurrency();
  return (
    <Container className="bg_white rounded-[9px] p-4">
      {detailLoading ? (
        <Skeleton active />
      ) : (
        <>
          <section>
            <h4 className="poppins_semibold text-base md:text-xl text-[#202020] capitalize mb-4">
              Invoice Detail
            </h4>

            {/* Auction Info */}
            <Row className="bg_white rounded-[7px] border border-[#F8F9FA] shadow-sm items-center p-3 mb-4">
              <Col xs="10">
                <div className="flex items-start gap-4">
                  <div>
                    <div className="h-[4rem] w-[4rem]">
                      <img
                        src={orderDetail?.auction?.images?.[0]}
                        alt="Auction"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#25324B] poppins_semibold text-sm sm:text-base md:text-[22px] capitalize mb-1">
                      {orderDetail?.auction?.name}
                    </p>
                    <div
                      className="text-[#7C8493] poppins_medium text-xs md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: orderDetail?.auction?.additionalinfo,
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Invoice Number</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.transaction?.invoice_num}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Issued Date</p>
                <p className="text-[#25324B] font-medium">
                  {moment(orderDetail?.transaction?.issue_date).format("LLL")}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Expiry Date</p>
                <p className="text-[#25324B] font-medium">
                  {moment(orderDetail?.transaction?.expirey_date).format("LLL")}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Payment Method</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.transaction?.paymentMethodType}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Payment Status</p>
                <p className="text-[#28a745] font-semibold capitalize">
                  {orderDetail?.transaction?.status}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Amount Paid</p>
                <p className="text-[#25324B] font-medium">
                  {formatPrice(
                    convert(orderDetail?.transaction?.amount, "LBP")
                  )}
                </p>
              </div>
            </div>

            {/* Payment Proof Image */}
            {orderDetail?.transaction?.paymentImage && (
              <div className="mb-4">
                <p className="text-[#7C8493] text-sm mb-2">Payment Proof</p>
                <img
                  src={orderDetail.transaction.paymentImage}
                  alt="Payment Proof"
                  className="w-full max-w-xs rounded shadow"
                />
              </div>
            )}

            {/* Shipping Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Customer</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.user?.fname} {orderDetail?.user?.lname}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Email</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.user?.email}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Shipping Address</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.address}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Delivery Date</p>
                <p className="text-[#25324B] font-medium">
                  {moment(orderDetail?.deliveryDate).format("LLL")}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Shipped Date</p>
                <p className="text-[#25324B] font-medium">
                  {moment(orderDetail?.shippedDate).format("LLL")}
                </p>
              </div>
              <div>
                <p className="text-[#7C8493] text-sm mb-1">Tracking Number</p>
                <p className="text-[#25324B] font-medium">
                  {orderDetail?.trackingnumber}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </Container>
  );
};

export default Invoice;
