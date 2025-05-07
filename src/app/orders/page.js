/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "reactstrap";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaList, FaTruck, FaShippingFast, FaBox } from "react-icons/fa";
import { getInvoice, GetOrders, orderGetbyid } from "@/components/api/ApiFile";
import moment from "moment";
import ApiFunction from "@/components/api/apiFuntions";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductTable from "@/components/common/dataTables/productTable";
import OrderDetails from "./detail/orderDetail";
import { MdPayments } from "react-icons/md";
import Invoice from "./invoice/invoice";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { get } = ApiFunction();
  const [currentActiveButton, setCurrentActiveButton] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [orderDetail, setOrderDetail] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const urlId = urlParams.get("id");
  const { t } = useTranslation();
  const urlInvoice = urlParams.get("invoice");

  const sideButtons = [
    { title: t("order.heading"), status: "all", icon: <FaList /> },
    // { title: "Payement", status: "payement", icon: <MdPayments /> },
    { title: t("order.heading2"), status: "transit", icon: <FaTruck /> },
    { title: t("order.heading3"), status: "shipped", icon: <FaShippingFast /> },
    { title: t("order.heading4"), status: "delivered", icon: <FaBox /> },
  ];

  const handleGetOrder = (status) => {
    setLoading(true);
    const api =
      status === "all"
        ? `${GetOrders}/${lastId}?status=winner`
        : `${GetOrders}/${lastId}?status=winner&orderstatus=${status}`;

    get(api)
      .then((res) => {
        if (res?.success && res?.applications?.length > 0) {
          setData(res?.applications);
          setCount(res?.count?.totalPage);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (lastId) {
      handleGetOrder(currentActiveButton);
    }
  }, [lastId]);

  const handleDetail = (item) => {
    router.replace(`/orders?id=${item?._id}`);
  };
  const handleinvoice = (item) => {
    router.replace(`/orders?invoice=${item?._id}`);
  };

  const columns = [
    {
      name: t("order.heading5"),
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize gap-2">
          <img
            src={row?.auction?.images[0]}
            alt
            className="w-[2rem] h-[2rem] rounded-[6px]"
          />
          {row?.auction?.name || ""}
        </div>
      ),
    },
    {
      name: t("order.heading6"),
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.auction?.category?.name || ""}
        </div>
      ),
    },

    {
      name: t("order.heading7"),
      minWidth: "200px",
      maxWidth: "400px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {moment
            .utc(row?.auction?.start_date)
            .local()
            .format("DD MMMM, YYYY h:mm A")}
        </div>
      ),
    },
    {
      name: t("order.heading8"),
      minWidth: "200px",
      maxWidth: "400px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {moment
            .utc(row?.auction?.end_date)
            .local()
            .format("DD MMMM, YYYY h:mm A")}
        </div>
      ),
    },
    {
      name: t("order.heading9"),
      minWidth: "140px",
      maxWidth: "300px",
      cell: (row) => (
        <>
          {row?.transaction?._id ? (
            <div
              onClick={() => handleinvoice(row)}
              className="h-6 md:h-10 px-2 flex items-center justify-center text-white cursor-pointer text-[0.8rem] rounded-[10px] w-fit shadow bg-gradient-to-r from-[#660000] to-[#993333] hover:from-[#550000] hover:to-[#800000] transition-all duration-300"
            >
              {t("order.heading10")}
            </div>
          ) : (
            <h4 className="text-center poppins_regular text-gray-400 italic">{t("order.heading11")}</h4>
          )}
        </>
      ),
    },
    {
      name: t("order.heading12"),
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`w-fit text-xs cursor-pointer poppins_medium rounded-[8px] px-3 py-1 text-center capitalize`}
        >
          {row?.status}
        </div>
      ),
    },
    {
      name: t("order.heading13"),
      minWidth: "100px",
      maxWidth: "120px",
      cell: (row) => (
        <>
          {/* {currentActiveButton !== "Payement" && ( */}
          <div
            className="text-center w-24 h-6 rounded-md flex items-center justify-center text-[10px] text_primary border-1 border-[#660000] poppins_medium capitalize cursor-pointer"
            onClick={() => {
              handleDetail(row);
            }}
          >
            {t("order.heading13")}
          </div>
          {/* )} */}
        </>
      ),
    },
  ];

  // get order detail by id
  const handlegetOrderById = () => {
    setDetailLoading(true);
    const api = `${orderGetbyid}/${urlId || urlInvoice}`;
    get(api)
      .then((res) => {
        if (res?.success) {
          setOrderDetail(res?.order);
        }
        setDetailLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDetailLoading(false);
      });
  };

  useEffect(() => {
    if (urlId || urlInvoice) {
      handlegetOrderById();
    }
  }, [urlId, urlInvoice]);

  // back to order list
  const backetoOrderList = () => {
    router.push("/orders");
    setOrderDetail("");
  };

  // handle payement
  const handleInvoicePayement = () => {
    setLoading(true);
    const api = `${getInvoice}/${lastId}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.transactions?.length > 0) {
          setData(res?.transactions);
          setCount(res?.count?.totalPage);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handlePageChange = () => {
    setData([]);
    setLastId(1);
    setCount(0);
    backetoOrderList();
    setPage(0);
  };

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("nav.orders")} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("nav.orders")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-2 p-md-2 rounded-[9px] mt-2 md:mt-4">
        <Row className="rounded-[9px] g-3">
          <Col md="3">
            <div className="flex flex-col gap-3  items-center justify-center">
              {sideButtons?.map((button) => {
                const isActive = currentActiveButton === button.status;
                return (
                  <button
                    key={button.title}
                    className={`${
                      isActive
                        ? "bg_primary text-white"
                        : "bg-[#F5F5F5] text-[#909495]"
                    } rounded-[10px] w-full flex items-center justify-start gap-2 p-3 capitalize`}
                    onClick={() => {
                      handlePageChange();
                      handleGetOrder(button.status);
                      setCurrentActiveButton(button.status);
                      // Check if the status is "payement"
                      // if (button?.status === "payement") {
                      //   handleInvoicePayement();
                      // } else {
                      //   handleGetOrder(button.status);
                      // }
                    }}
                  >
                    <div className="flex items-center w-full justify-between">
                      <div className="flex gap-3 items-center">
                        <div className="w-7 h-7">
                          <div
                            className={`w-100 h-100 sm:w-9 sm:h-9 ${
                              isActive ? "bg-white" : "bg_primary"
                            } flex items-center justify-center p-2 rounded-full`}
                          >
                            {React.cloneElement(button?.icon, {
                              color: isActive ? "#7D0303" : "#ffffff", // adjust color codes
                              size: 16,
                            })}
                          </div>
                        </div>

                        <div className="text-sm sm:text-base">
                          {button?.title}
                        </div>
                      </div>
                      <div
                        className={`${
                          isActive
                            ? "bg-white text_dark"
                            : "bg_primary text-white"
                        } flex items-center justify-center p-1 rounded-full`}
                      >
                        <FaArrowRight size={15} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Col>
          <Col md="9">
            {urlInvoice ? (
              <Invoice
                orderDetail={orderDetail}
                detailLoading={detailLoading}
                setData={setData}
                setOrderDetail={setOrderDetail}
                urlInvoice={urlInvoice}
              />
            ) : urlId ? (
              <OrderDetails
                orderDetail={orderDetail}
                detailLoading={detailLoading}
                backrout={"/orders"}
              />
            ) : (
              <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-1 py-md-2 px-2 px-md-5 rounded-[11px]">
                <ProductTable
                  rowHeading={t("order.heading")}
                  count={count}
                  loading={loading}
                  setCurrentPage={setPage}
                  currentPage={page}
                  columns={columns}
                  data={data}
                  setPageNumber={setPage}
                  type="search"
                  setLastId={setLastId}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
