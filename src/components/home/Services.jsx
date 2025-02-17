import React from "react";
import { Col, Container, Row } from "reactstrap";
import { deal, returnMoney, secure, shipping } from "../assets/icons/icon";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";

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
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="pb-4 md:pb-[5rem] bg_white overflow-hidden"
      >
        <Container>
          <Row>
            <Col md="12">
              <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {servicesData.map((service, index) => {
                  return (
                    <motion.div
                    variants={fadeIn("down", "tween", (index + 1)* 0.1 , 1)}
                      className="flex items-start justify-start  gap-3"
                      key={index}
                    >
                      <Image
                        src={service?.image}
                        className="w-10 md:w-[50px]"
                        alt={service?.image}
                      />
                      <div className="">
                        <p className="text-[#1B212C] text-xl poppins_medium">
                          {service?.title}
                        </p>
                        <p className="poppins_regular text-sm text-[#d4d4d4]">
                          {service?.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.main>
    </>
  );
}
