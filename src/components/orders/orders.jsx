"use client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Col, Container, Row } from "reactstrap";
import {
  allDark,
  allLight,
  avataruser,
  car1,
  deliveredDark,
  deliveredLight,
  shippedDark,
  shippedLight,
  transitDark,
  transitLight,
} from "../assets/icons/icon";
import Breadcrumbs from "../common/Breadcrumbs";
import ProductTable from "../common/dataTables/productTable";
import { useRouter } from "next/navigation";

export default function Orders() {
  const [currentActiveButton, setCurrentActiveButton] = useState("all orders");
  const [filterStatics, setFilterStatics] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
      name: "Payment",
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize cursor-pointer">
          {row?.payment}
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
        <div className="text-center w-24 h-6 rounded-md flex items-center justify-center text-[10px] text_primary border-1 border-[#21CD9D] poppins_medium capitalize cursor-pointer" onClick={() => router.push("/orders/detail")}>
            view details
        </div>
      ),
    },
  ];

const data = [
  {
    name: "Tesla Model 3",
    category: "Electric",
    invoice: "INV-2001",
    date: "2024-02-19 10:30 AM",
    payment: "$45,000",
    status: "shipped",
  },
  {
    name: "Ford Mustang",
    category: "Sports",
    invoice: "INV-2002",
    date: "2024-02-18 03:45 PM",
    payment: "$55,000",
    status: "intransit",
  },
  {
    name: "Toyota Prius",
    category: "Hybrid",
    invoice: "INV-2003",
    date: "2024-02-17 12:15 PM",
    payment: "$30,000",
    status: "delivered",
  },
  {
    name: "BMW X5",
    category: "SUV",
    invoice: "INV-2004",
    date: "2024-02-16 09:00 AM",
    payment: "$60,000",
    status: "shipped",
  },
  {
    name: "Honda Civic",
    category: "Sedan",
    invoice: "INV-2005",
    date: "2024-02-15 06:20 PM",
    payment: "$25,000",
    status: "intransit",
  },
  {
    name: "Mercedes-Benz GLE",
    category: "Luxury",
    invoice: "INV-2006",
    date: "2024-02-14 02:10 PM",
    payment: "$75,000",
    status: "delivered",
  },
  {
    name: "Chevrolet Camaro",
    category: "Sports",
    invoice: "INV-2007",
    date: "2024-02-13 11:30 AM",
    payment: "$50,000",
    status: "shipped",
  },
  {
    name: "Audi Q7",
    category: "SUV",
    invoice: "INV-2008",
    date: "2024-02-12 08:45 AM",
    payment: "$68,000",
    status: "intransit",
  },
];

  const filterButtons = ["all", "pending", "approve", "review"];

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
              {filterButtons.map((button) => {
                return (
                  <button
                    className={`${
                      filterStatics === button
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
            <div className="flex items-center justify-start gap-10 bg-[#FAFAFA] py-2 px-5 rounded-[11px] mt-3">
              <Col md="12" className="">
                <div className="bg-[#FAFAFA]">
                  <ProductTable
                    className="flex items-center justify-between flex-wrap p-6 md:gap-3 w-full bg-[#FAFAFA]"
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
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
