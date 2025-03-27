import React from "react";
import { Col, Container, Row } from "reactstrap";

export default function TopSection({ title, description, button, mt = 20 }) {
  return (
    <Container
      className={`bg_white rounded-[9px] mt-${mt} p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]`}
    >
      <Row>
        <Col md="12">
          <div className="flex min-[567px]:items-center min-[567px]:justify-between max-[567px]:flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-2xl poppins_medium text-[#1C201F] capitalize ">
                {title}
              </h3>
              <p className="text-xs sm:text-base poppins_medium text-[#909495] capitalize">
                {description}
              </p>
            </div>
            {button && (
              <button className={button.className} onClick={button.onClick}>
                {button.icon}
                {button.text}
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
