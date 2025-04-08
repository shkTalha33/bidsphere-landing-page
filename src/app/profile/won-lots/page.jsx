/* eslint-disable jsx-a11y/alt-text */
"use client";

import { car1 } from "@/components/assets/icons/icon";
import ProductTable from "@/components/common/dataTables/productTable";
import TopSection from "@/components/common/TopSection";
import TabHeader from "@/components/tabHeader";
import Image from "next/image";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
/* eslint-disable @next/next/no-img-element */

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
          <Image src={car1} width={32} height={32} className="w-8" />
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
      minWidth: "180px",
      maxWidth: "200px",
      cell: (row) => (
        <div
          className={`flex items-center justify-center capitalize min-w-36 whitespace-nowrap rounded-full cursor-pointer bg-[#EAF5F2] px-4 py-1 ${
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
      minWidth: "180px",
      maxWidth: "200px",
      cell: (row) => (
        <button className="px-2 py-1 rounded-lg border-[1px] text-xs border-[#660000] flex items-center justify-center text_primary">
          View Detail
        </button>
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

  return (
    <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description="See your Won lots here."
            mt={0}
            title="Won Lots"
          />
          <div className="bg-white px-8 rounded-lg w-full shadow-sm">
            <ProductTable
              rowHeading="won lots"
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
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
