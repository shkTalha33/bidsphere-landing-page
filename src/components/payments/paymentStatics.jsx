/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "reactstrap";
import {
  car1,
  ClockDark,
  ClockWhite,
  depositDark,
  depositWhite,
  refundDark,
  refundWhite,
  topupWallet,
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";
import ProductTable from "../common/dataTables/productTable";

export default function PaymentStatics() {
  const [currentActiveButton, setCurrentActiveButton] =
    useState("deposit tracking");
  const [filterStatics, setFilterStatics] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const onChange = (key) => {
    console.log(key);
  };

  const sideButtons = [
    {
      title: "deposit tracking",
      lightImage: depositWhite,
      darkImage: depositDark,
    },
    { title: "payment history", lightImage: ClockWhite, darkImage: ClockDark },
    {
      title: "refund requests",
      lightImage: refundWhite,
      darkImage: refundDark,
    },
  ];

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
      name: "Item Name",
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize gap-2">
          <Image src={car1} className="w-8" />
          {row?.name || "John"}
        </div>
      ),
    },
    {
      name: "Category",
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.category || "Hybrid"}
        </div>
      ),
    },
    {
      name: "Invoice#",
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.invoice || "Hybrid"}
        </div>
      ),
    },
    {
      name: "Date & Time",
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {row?.date || "12/12/2000"}
        </div>
      ),
    },
    {
      name: "Deposit Amount",
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize cursor-pointer">
          {row?.depositAmount}
        </div>
      ),
    },
    {
      name: "Status",
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`flex items-center justify-center capitalize whitespace-nowrap rounded-full cursor-pointer bg-[#EAF5F2] px-4 py-1 ${row?.status === "approved"
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
    {
      name: "Action",
      minWidth: "80px",
      maxWidth: "100px",
      cell: (row) => (
        <div className="flex  items-center justify-between">
          <div
            className="p-1 bg_mainsecondary rounded-full ml-3 w-9 h-9 cursor-pointer flex items-center justify-center"
          //  onClick={() => handleLeadDetails(row)}
          >
            <div className="w-6 h-6 rounded-full bg-[#1ECD2D] flex items-center justify-center text-white">
              <IoMdCheckmark size={18} className="text_primary" color="#fff" />
            </div>
          </div>
          <div
            className="p-1 bg_mainsecondary rounded-full ml-3 w-9 h-9 cursor-pointer flex items-center justify-center"
          //  onClick={() => handleLeadDetails(row)}
          >
            <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
              <RxCross2 size={18} className="text_primary" color="#fff" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Laptop",
      category: "Electronics",
      invoice: "INV-1001",
      date: "2024-02-19 10:30 AM",
      depositAmount: "$1200",
      status: "approved",
    },
    {
      name: "Smartphone",
      category: "Electronics",
      invoice: "INV-1002",
      date: "2024-02-18 03:45 PM",
      depositAmount: "$800",
      status: "completed",
    },
    {
      name: "Coffee Table",
      category: "Furniture",
      invoice: "INV-1003",
      date: "2024-02-17 12:15 PM",
      depositAmount: "$300",
      status: "pending",
    },
    {
      name: "Washing Machine",
      category: "Appliances",
      invoice: "INV-1004",
      date: "2024-02-16 09:00 AM",
      depositAmount: "$950",
      status: "approved",
    },
    {
      name: "Gaming Chair",
      category: "Furniture",
      invoice: "INV-1005",
      date: "2024-02-15 06:20 PM",
      depositAmount: "$450",
      status: "completed",
    },
    {
      name: "Headphones",
      category: "Electronics",
      invoice: "INV-1006",
      date: "2024-02-14 02:10 PM",
      depositAmount: "$150",
      status: "pending",
    },
    {
      name: "Microwave Oven",
      category: "Appliances",
      invoice: "INV-1007",
      date: "2024-02-13 11:30 AM",
      depositAmount: "$500",
      status: "approved",
    },
    {
      name: "Office Desk",
      category: "Furniture",
      invoice: "INV-1008",
      date: "2024-02-12 08:45 AM",
      depositAmount: "$700",
      status: "completed",
    },
  ];

  const filterButtons = ["all", "pending", "approve", "review"];

  return (
    <>
      <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Payment"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">Payment</h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white p-3 p-md-4 rounded-[9px] mt-4">
        <div className="bg_primary p-4 rounded-[9px]">
          <div className="flex items-center flex-wrap gap-3 justify-between">
            <div className="flex gap-4 flex-wrap items-center">
              <p className="poppins_semibold text-3xl md:text-4xl text-white mb-0">
                $450.54
              </p>
              <p className="poppins_regular text-xl md:text-2xl text-white mb-0">
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
        </div>
        <Row className="rounded-[9px] mt-5 g-3">
          <Col lg="3">
            <div className="flex flex-col gap-4 items-center justify-center">
              {sideButtons.map((button) => {
                return (
                  <button
                    className={`${currentActiveButton === button?.title
                      ? "bg_primary text-white"
                      : "bg-[#F5F5F5] text-[#909495]"
                      } rounded-[10px] w-full flex items-center justify-start gap-4 p-4 capitalize`}
                    onClick={() => setCurrentActiveButton(button?.title)}
                  >
                    <div className="flex items-center w-full justify-between">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-9 h-9 ${currentActiveButton === button?.title
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
                        className={`${currentActiveButton === button?.title
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
          <Col lg="9" className="">
            <div className="flex items-center justify-start gap-4 md:gap-10 w-full no-scrollbar overflow-auto bg-[#FAFAFA] py-2 px-3 px-md-5 rounded-[11px]">
              {filterButtons.map((button) => {
                return (
                  <button
                    className={`${filterStatics === button
                      ? "bg_primary text_white"
                      : "bg-[#E2F5F0] text_primary"
                      } rounded-[16px] px-5 py-2 poppins_regular capitalize`}
                    onClick={() => setFilterStatics(button)}
                  >
                    {button}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-2 px-3 px-md-5 rounded-[11px] mt-3">
              <ProductTable
                rowHeading="deposit tracking"
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
}
