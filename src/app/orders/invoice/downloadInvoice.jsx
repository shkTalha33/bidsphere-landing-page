"use client";
import { getInvoiceDetail } from "@/components/api/ApiFile";
import React, { useState } from "react";
import ApiFunction from "@/components/api/apiFuntions";
const DownloadInvoice = ({ invoiceID }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const { get } = ApiFunction();

  const handleDownloadInvoice = () => {
    const api = `${getInvoiceDetail}/${invoiceID}`;
    get(api)
      .then((res) => {
        if (res?.success) {
          setInvoiceData(res?.order);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <>
      <div
        onClick={() => {
          handleDownloadInvoice(invoiceID);
        }}
        className="text-[1rem] py-[5px] px-[12px] bg-[#660000] text-white rounded-[8px] poppins_regular whitespace-nowrap flex items-center gap-2 cursor-pointer"
      >
        Download Invoice
      </div>
    </>
  );
};

export default DownloadInvoice;
