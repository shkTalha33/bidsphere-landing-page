/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { registrationTracking } from "../api/ApiFile";
import ApiFunction from "../api/apiFuntions";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ProductTable from "../common/dataTables/productTable";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export default function PaymentDetail() {
  const { get } = ApiFunction();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { formatPrice, convert } = useCurrency();

  const columns = [
    {
      name: "#",
      minWidth: "20px",
      maxWidth: "60px",
      cell: (_, index) => (
        <span className="text-center flex items-center justify-center">
          {index + 1 || "1"}
        </span>
      ),
    },
    {
      name: t("payment.heading4"),
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize gap-2">
          <Image
            src={row?.auction?.images[0]}
            width={32}
            height={32}
            alt={row?.auction?.name}
            className="w-8 rounded-full h-8"
          />
          {row?.auction?.name || "N/A"}
        </div>
      ),
    },
    {
      name: t("order.heading6"),
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {row?.auction?.category?.name || "N/A"}
        </div>
      ),
    },
    {
      name: t("order.heading9"),
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.invoiceId || "N/A"}
        </div>
      ),
    },
    {
      name: t("payment.heading5"),
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {row?.createdAt
            ? format(new Date(row?.createdAt), "dd/MM/yyyy")
            : "12/12/2000"}
        </div>
      ),
    },
    {
      name: t("payment.heading6"),
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize cursor-pointer">
          {formatPrice(convert(row?.auction?.depositamount, "LBP"))}
        </div>
      ),
    },
    {
      name: t("order.heading12"),
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`flex items-center justify-center capitalize whitespace-nowrap rounded-full cursor-pointer bg-[#EAF5F2] px-4 py-1 ${
            row?.status === "approved"
              ? "text-[#56CDAD] bg-[#EAF5F2]"
              : row.status === "pending"
              ? "text-[#4640DE] bg-[#E8E7F7]"
              : " bg-[#EAF5F2] text-[#6DC1FE]"
          } capitalize`}
        >
          {row?.status}
        </div>
      ),
    },
  ];

  // handle payment history
  const handlePaymentHistory = () => {
    setLoading(true);
    const api = `${registrationTracking}${lastId}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.applications?.length > 0) {
          setPaymentHistory(res?.applications);
          setCount(res?.count?.totalPage);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePaymentHistory();
  }, [lastId]);

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("payment.heading")} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("payment.heading")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-2 p-md-3 rounded-[9px] mt-4">
        <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-2 px-3 px-md-5 rounded-[11px] mt-3">
          <ProductTable
            rowHeading={t("payment.heading2")}
            count={count}
            loading={loading}
            setCurrentPage={setPage}
            currentPage={page}
            columns={columns}
            data={paymentHistory}
            setPageNumber={setPage}
            type="search"
            setLastId={setLastId}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* <div className="bg_primary p-3 p-md-4 rounded-[9px]">
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
        </Row> */}
      </Container>
    </>
  );
}
