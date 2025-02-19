import React from "react";
import PaymentDetail from "@/components/payments/paymentDetail";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import PaymentStatics from "@/components/payments/paymentStatics";

export default function Page() {
  return (
    <main className="bg_mainsecondary p-4">
      {/* <Container className="bg_white rounded-[9px] mt-20 p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={"Payment"} />
            <h3 className="text-3xl poppins_medium text-[#1C201F]">Payment</h3>
          </Col>
        </Row>
      </Container> */}
      <PaymentStatics />
    </main>
  );
}
