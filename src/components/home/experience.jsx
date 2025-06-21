/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { experience } from "../assets/icons/icon";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Experience() {
  const { t } = useTranslation();
  const features = [
    t("about.heading5"),
    t("about.heading6"),
    t("about.heading7"),
    t("about.heading8"),
  ];

  const language = useSelector((state) => state.language?.language);

  return (
    <section className="">
      <main className="pb-4 md:pb-[4rem] bg_mainsecondary overflow-hidden">
        <Container fluid="xxl">
          <Row>
            <Col md="6">
              <motion.div
                variants={slideIn("left", "tween", 0.1, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <Image src={experience} alt="experience" width={"90%"} />
              </motion.div>
            </Col>
            <Col md="6">
              <motion.div
                className="flex justify-center flex-col h-full"
                variants={slideIn("right", "tween", 0.1, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div
                  className={`flex gap-3 items-center  mb-[10px] ${
                    language === "ar"
                      ? "justify-end"
                      : "justify-center md:justify-start"
                  }`}
                >
                  <div
                    className={`w-8 h-2 bg_primary rounded-full ${
                      language === "ar" ? "order-2" : "order-1"
                    }`}
                  ></div>
                  <h6
                    className={`text-[#202020] poppins_semibold text-xl capitalize ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("about.heading")}
                  </h6>
                </div>
                <h4
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text_primary poppins_medium capitalize mb-2 md:mb-8 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("about.heading2")} <br />
                  <span
                    className={`text-black poppins_medium ${
                      language === "ar"
                        ? "text-right"
                        : "text-center md:text-start"
                    }`}
                  >
                    {t("about.heading3")}
                  </span>
                </h4>
                <p
                  className={`poppins_regular text-base sm:text-lg md:text-xl text-[#8B8B8B] mb-3 md:mb-8 ${
                    language === "ar"
                      ? "text-right"
                      : "text-start md:text-start"
                  }`}
                >
                  {t("about.heading4")}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 md:mb-5">
                  {features.map((feature, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-start gap-3 ${
                          language === "ar" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <FaCheck
                          className={`text-[#909495] ${
                            language === "ar" ? "order-2" : "order-1"
                          }`}
                          size={20}
                        />
                        <p
                          className={`text_primary poppins_medium text-sm sm:text-base md:text-xl ${
                            language === "ar"
                              ? "text-right order-1"
                              : "text-left order-2"
                          }`}
                        >
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <motion.button className="poppins_semibold my-3 text-sm md:text-lg text_white w-1/2 py-3 mx-auto bg_primary rounded-lg">
                  Read More
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </main>
    </section>
  );
}
