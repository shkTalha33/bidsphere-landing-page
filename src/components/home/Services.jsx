import React from "react";
import { Col, Container, Row } from "reactstrap";
import { deal, returnMoney, secure, shipping } from "../assets/icons/icon";
import Image from "next/image";

export default function Services() {
  const servicesData = [
    {
      image: shipping,
      title: "Free Shipping",
      description: "Free Ship Over $150",
    },
    {
      image: deal,
      title: "Best Deal Online",
      description: "We provide a free in-home.",
    },
    {
      image: returnMoney,
      title: "15 Days Return",
      description: "We provide a free in-home measure.",
    },
    {
      image: secure,
      title: "Secure Payment",
      description: "We provide a free in-home.",
    },
  ];
  return (
    <>
      <main className="pb-[5rem] bg_white">
        <Container>
          <Row>
            <Col md="12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {servicesData.map((service, index) => {
                  return (
                    <div className="flex items-start justify-start  gap-3" key={index}>
                      <Image src={service?.image} width={50} alt={service?.image} />
                      <div className="">
                        <p className="text-[#1B212C] text-xl poppins_medium">
                          {service?.title}
                        </p>
                        <p className="poppins_regular text-sm text-[#d4d4d4]">
                          {service?.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
