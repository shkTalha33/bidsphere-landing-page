import Image from "next/image";
import React from "react";
import { noData } from "../assets/icons/icon";

export default function NoData({ description }) {
  return (
    <div className="flex items-center py-5 gap-2 flex-col">
      <Image src={noData} alt="No Data" width={120} height={120} />
      <p className="poppins_medium text_dark">{description}</p>
    </div>
  );
}