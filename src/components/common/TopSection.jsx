import React from "react";
import { Col, Container, Row } from "reactstrap";

export default function TopSection({ title, description, button, mt = 20 }) {
  return (
    <Container className={`bg_white rounded-[9px] mt-${mt} p-4 shadow-[0px_4px_22.9px_0px_#0000000D]`}>
      <Row>
        <Col md="12">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl poppins_medium text-[#1C201F] capitalize mb-2">
              {title}
            </h3>
            {button && (
              <button className={button.className} onClick={button.onClick}>
                {button.icon}
              </button>
            )}
          </div>
          <p className="text-lg poppins_medium text-[#909495] capitalize">
            {description}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
