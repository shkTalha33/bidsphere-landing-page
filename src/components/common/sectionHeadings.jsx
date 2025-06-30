import React from "react";
import { Col } from "reactstrap";

export default function SectionHeadings({
  heading1,
  heading2,
  heading,
  description,
}) {
  return (
    <>
      <Col md="12">
        <h4 className="text_darkprimary poppins_medium text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center capitalize">
          {heading ? heading : heading1}
          {!heading && (
            <span className="text_primary poppins_medium capitalize">
              {` ${heading2}`}
            </span>
          )}
        </h4>
        <p className="poppins_regular text-[#8F8F8F] text-center sm:w-[70%] mx-auto mt-[1rem] md:mt-[2rem] mb-[1rem] md:mb-[2rem]">
          {description}
        </p>
      </Col>
    </>
  );
}
