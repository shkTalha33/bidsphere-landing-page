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
import { GetOrders } from "@/components/api/ApiFile";
import moment from "moment";
import ApiFunction from "@/components/api/apiFuntions";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductTable from "@/components/common/dataTables/productTable";
const Page = () => {
  const { get } = ApiFunction();
  const [currentActiveButton, setCurrentActiveButton] = useState("all orders");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const urlId = urlParams.get("id");
  
  const sideButtons = [
    { title: "all orders", status: "all", icon: <FaList /> },
    { title: "in transit", status: "transit", icon: <FaTruck /> },
    { title: "shipped", status: "shipped", icon: <FaShippingFast /> },
    { title: "delivered", status: "delivered", icon: <FaBox /> },
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
      handleGetOrder("all");
    }
  }, [lastId]);

  const handleDetail = (item) => {
    router.replace(`/orders?id=${item?._id}`);
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
      name: "Auction Name",
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
      name: "Category",
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.auction?.category?.name || ""}
        </div>
      ),
    },

    {
      name: "Start Date",
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
      name: "End Date",
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
      name: "Status",
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`flex items-center justify-center capitalize whitespace-nowrap rounded-full cursor-pointer bg-[#EAF5F2] px-4 py-1 ${
            row?.status === "shipped"
              ? "text-[#56CDAD] bg-[#EAF5F2]"
              : row.status === "intransit"
              ? "text-[#4640DE] bg-[#E8E7F7]"
              : " bg-[#EAF5F2] text-[#6DC1FE]"
          } capitalize`}
        >
          {row?.status}
        </div>
      ),
    },
    {
      name: "Action",
      minWidth: "100px",
      maxWidth: "120px",
      cell: (row) => (
        <div
          className="text-center w-24 h-6 rounded-md flex items-center justify-center text-[10px] text_primary border-1 border-[#660000] poppins_medium capitalize cursor-pointer"
          onClick={() => {
            handleDetail(row);
          }}
        >
          view details
        </div>
      ),
    },
  ];
  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Orders"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              Orders
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-2 p-md-5 rounded-[9px] mt-2 md:mt-4">
        <Row className="rounded-[9px] g-3">
          <Col md="3">
            <div className="flex flex-col gap-2 gap-md-4 items-center justify-center">
              {sideButtons?.map((button) => {
                const isActive = currentActiveButton === button.title;
                return (
                  <button
                    key={button.title}
                    className={`${
                      isActive
                        ? "bg_primary text-white"
                        : "bg-[#F5F5F5] text-[#909495]"
                    } rounded-[10px] w-full flex items-center justify-start gap-4 p-2 p-md-4 capitalize`}
                    onClick={() => {
                      setCurrentActiveButton(button.title),
                        handleGetOrder(button.status);
                      setData([]);
                      setLastId(1);
                      setCount(0);
                    }}
                  >
                    <div className="flex items-center w-full justify-between">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-7 h-7 sm:w-9 sm:h-9 ${
                            isActive ? "bg-white" : "bg_primary"
                          } flex items-center justify-center p-2 rounded-full`}
                        >
                          {React.cloneElement(button.icon, {
                            color: isActive ? "#7D0303" : "#ffffff", // adjust color codes
                            size: 16,
                          })}
                        </div>
                        <div className="text-sm sm:text-base">
                          {button.title}
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
            <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-1 py-md-2 px-2 px-md-5 rounded-[11px] mt-3">
              <ProductTable
                rowHeading="all orders"
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
