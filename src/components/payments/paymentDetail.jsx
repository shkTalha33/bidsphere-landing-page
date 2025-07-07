/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {
  refundAdmin,
  refundWallet,
  registrationTracking,
} from "../api/ApiFile";
import ApiFunction from "../api/apiFuntions";
import Breadcrumbs from "../common/Breadcrumbs";
import ProductTable from "../common/dataTables/productTable";
import useCurrency from "../hooks/useCurrency";
import { getLanguage } from "../redux/language/languageSlice";

export default function PaymentDetail() {
  const { get, post } = ApiFunction();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [rowData, setRowData] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const language = useSelector(getLanguage);

  const { formatPrice, convert } = useCurrency();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setRowData(null);
  };
  const handleShow = (item) => {
    setShow(true);
    setRowData(item);
  };

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
      minWidth: "250px",
      maxWidth: "450px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize gap-2">
          <Image
            src={row?.auction?.images[0]}
            width={32}
            height={32}
            alt={row?.auction?.name}
            className="w-8 rounded-full h-8"
          />
          <span className="line-clamp-2">{row?.auction?.name || "N/A"}</span>
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
          {formatPrice(convert(row?.auction?.depositamount, "LYD"))}
        </div>
      ),
    },
    {
      name: t("payment.heading7"),
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => {
        const status = row?.auction?.status?.toLowerCase();

        let bg = "";
        let text = "";

        if (status === "start") {
          bg = "bg-[rgba(38,164,255,0.1)]";
          text = "text-[#26A4FF]";
        } else if (status === "complete") {
          bg = "bg-[hsla(164,58%,80%,0.1)]";
          text = "text-[#56CDAD]";
        } else {
          bg = "bg-gray-100";
          text = "text-gray-400";
        }

        return (
          <div
            className={`px-4 py-1 rounded-full capitalize text-sm font-medium flex items-center justify-center whitespace-nowrap ${bg} ${text}`}
          >
            {status}
          </div>
        );
      },
    },

    {
      name: t("payment.heading8"),
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => {
        const auctionStatus = row?.auction?.status?.toLowerCase();
        const refundStatus = row?.status?.toLowerCase();

        // Case: Auction not complete yet
        if (auctionStatus !== "complete") {
          return (
            <span className="text-gray-500 text-sm">
              ⛔ {t("payment.heading9")}
            </span>
          );
        }

        // Case: Show Request Refund Button
        if (refundStatus !== "refunded" && refundStatus !== "request") {
          return (
            <button
              onClick={() => handleShow(row)}
              className={`bg-gradient-to-r from-[#9F1E24] via-[#800000] to-[#990000] whitespace-nowrap text-white text-sm font-medium py-1.5 px-3 rounded-md hover:opacity-90 transition ${
                language === "ar" ? "ml-auto" : ""
              }`}
            >
              {t("payment.heading10")}
            </button>
          );
        }

        // Case: Refund already processed
        if (refundStatus === "refunded") {
          return (
            <div
              className={`text-green-600 text-sm poppins_medium ${
                language === "ar" ? "ml-auto text-right" : "text-left"
              }`}
            >
              ✅{t("payment.heading11")}
            </div>
          );
        }

        // Case: Refund request already sent
        if (refundStatus === "request") {
          return (
            <div
              className={`text-yellow-600 text-sm poppins_medium ${
                language === "ar" ? "ml-auto text-right" : "text-left"
              }`}
            >
              ⏳{t("payment.heading12")}
            </div>
          );
        }

        return null;
      },
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
  }, [lastId, language]);

  const handleContactAdmin = () => {
    const api = refundAdmin;
    const apiData = {
      applicationId: rowData?._id,
    };
    setLoadingType("admin");
    post(api, apiData)
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          setPaymentHistory((prevHistory) =>
            prevHistory?.map((item) =>
              item?._id === rowData?._id ? { ...item, status: "request" } : item
            )
          );
        }
        handleClose();
        setLoadingType(null);
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoadingType(null);
      });
  };

  const handleWalletAdd = () => {
    const api = refundWallet;
    const apiData = {
      applicationId: rowData?._id,
    };
    setLoadingType("wallet");
    post(api, apiData)
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          setPaymentHistory((prevHistory) =>
            prevHistory?.map((item) =>
              item?._id === rowData?._id
                ? { ...item, status: "refunded" }
                : item
            )
          );
        }
        handleClose();
        setLoadingType(null);
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoadingType(null);
      });
  };

  return (
    <main className="bg_mainsecondary overflow-hidden p-2">
      <Container
        fluid="xxl"
        dir={language === "ar" ? "rtl" : "ltr"}
        className={`bg_white rounded-[9px] p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] ${
          language === "ar" ? "text-right" : ""
        }`}
      >
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("payment.heading")} />
            <h3 className="text-xl sm:text-2xl poppins_medium text_dark">
              {t("payment.heading")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container
        fluid="xxl"
        className={`bg_white p-2 p-md-3 rounded-[9px] mt-4 ${
          language === "ar" ? "text-right" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            language === "ar" ? "justify-end" : "justify-start"
          } gap-10 bg-[#FAFAFA] py-2 px-3 px-md-4 rounded-[11px]`}
        >
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
                {formatPrice(convert(450.54, "LYD"))}
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
          <Col md="6" className={`${language === "ar" ? 'text-start mr-auto' : 'text-end ml-auto'} mt-4 px-3 px-md-0`}>
            <button
              type="submit"
              className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full sm:w-[50%] poppins_semibold text-base sm:text-[22px]"
              onClick={() => router.push("/payments/statics")}
            >
              Done
            </button>
          </Col>
        </Row> */}
        <Modal show={show} centered backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton className="bg-white">
            <Modal.Title
              className={`text-dark poppins_medium  ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("payment.heading13")}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-4 bg-white text-gray-800 rounded-b-xl">
            <p
              className={`text-base mb-4 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("payment.heading14")} <strong>{t("payment.heading15")}</strong>
              .{t("payment.heading16")}
            </p>
            <ul
              className={`text-sm poppins_regular mb-4 ${
                language === "ar"
                  ? "pr-5 list-outside text-right"
                  : "pl-5 list-inside text-left"
              }`}
              style={{
                listStyleType: "disc",
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              <li className="mb-2">{t("payment.heading17")}</li>
              <li>
                {t("payment.heading18")}{" "}
                <strong>{t("payment.heading19")}</strong>{" "}
                {t("payment.heading20")}
              </li>
            </ul>
            <p
              className={`text-sm text-gray-600 italic ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("payment.heading21")}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 mt-5 justify-center ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {/* Contact Admin Button */}
              <button
                className={`bg-gradient-to-r from-[#9F1E24] via-[#800000] to-[#990000] text-white poppins_medium py-2 px-4 rounded hover:opacity-90 transition flex items-center justify-center ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
                onClick={handleContactAdmin}
                disabled={loadingType === "wallet" || loadingType === "admin"}
              >
                {loadingType === "admin"
                  ? `${t("payment.heading22")}`
                  : `${t("payment.heading23")}`}
              </button>

              {/* Add to Wallet Button */}
              <button
                className="bg-white text-[#800000] border border-[#800000] poppins_medium py-2 px-4 rounded hover:bg-gray-100 transition flex items-center justify-center"
                onClick={handleWalletAdd}
                disabled={loadingType === "admin" || loadingType === "wallet"}
              >
                {loadingType === "wallet"
                  ? `${t("payment.heading22")}`
                  : `${t("payment.heading24")}`}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </main>
  );
}
