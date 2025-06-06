import React from "react";
import { Col } from "reactstrap";

export default function SectionHeadings({ title, heading1, heading2, description }) {
  return (
    <>
      {/* <Col md="12">
        <div className="flex justify-center items-center gap-1 mb-[18px]">
          <div className="w-8 h-2 bg_primary rounded-full"></div>
          <p className="text-[#202020] poppins_semibold text-2xl text-center capitalize">
            {title}
          </p>
        </div>
      </Col> */}
      <Col md="12">
        <h4 className="text_darkprimary poppins_medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center capitalize">{heading1} {" "} <span className="text_primary poppins_medium capitalize">{heading2}</span></h4>
        <p className="poppins_regular text-[#8F8F8F] text-center sm:w-[70%] mx-auto mt-[1rem] md:mt-[2rem] mb-[2rem] md:mb-[2rem]">
          {description}
        </p>
      </Col>
    </>
  );
}
