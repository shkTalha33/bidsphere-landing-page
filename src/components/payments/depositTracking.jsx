/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { format } from "date-fns";
import debounce from "debounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Col } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import { registrationTracking } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import ProductTable from "../common/dataTables/productTable";
import { formatPrice } from "../utils/formatPrice";

export default function DepositTracking() {
  const [filterStatics, setFilterStatics] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const { get } = ApiFunction();

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
      name: "Category",
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize">
          {row?.auction?.category?.name || "N/A"}
        </div>
      ),
    },
    {
      name: "Invoice#",
      minWidth: "120px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          {row?.invoiceId || "N/A"}
        </div>
      ),
    },
    {
      name: "Date & Time",
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
      name: "Amount",
      minWidth: "120px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center capitalize cursor-pointer">
          {formatPrice(row?.auction?.depositamount)}
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

  const filterButtons = [
    { name: "All", value: "" },
    { name: "Pending", value: "pending" },
    { name: "Under Review", value: "under-review" },
    { name: "Approved", value: "approved" },
    { name: "Rejected", value: "rejected" },
  ];

  const fetchAuctionRegistrations = debounce(async () => {
    setLoading(true);
    await get(`${registrationTracking}${lastId}?status=${filterStatics}`)
      .then((result) => {
        console.log(result);
        setData(result?.applications);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    fetchAuctionRegistrations();
  }, [filterStatics]);

  return (
    <>
      <Col lg="9" className="">
        <div className="flex items-center justify-start gap-4 md:gap-10 w-full no-scrollbar overflow-auto bg-[#FAFAFA] py-3 px-3 px-md-5 rounded-[11px]">
          {filterButtons.map((button) => {
            return (
              <button
                className={`${
                  filterStatics === button?.value
                    ? "bg_primary text_white"
                    : "bg-[#E2F5F0] text_primary"
                } rounded-[16px] px-5 py-2 poppins_regular capitalize whitespace-nowrap`}
                onClick={() => setFilterStatics(button?.value)}
              >
                {button?.name}
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
    </>
  );
}
