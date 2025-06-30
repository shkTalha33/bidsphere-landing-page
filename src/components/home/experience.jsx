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
      <main
        className="pb-4 md:pb-[4rem] bg_mainsecondary overflow-hidden"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
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
                <div className={`flex gap-3 items-center  mb-[10px]`}>
                  <div className={`w-8 h-2 bg_primary rounded-full`}></div>
                  <h6
                    className={`text-[#202020] poppins_semibold text-xl capitalize mb-0`}
                  >
                    {t("about.heading")}
                  </h6>
                </div>
                <h4
                  className={`text-2xl md:text-4xl text_primary poppins_medium capitalize mb-2 mb-md-4`}
                >
                  {t("about.heading2")} <br />
                  <span className={`text-black poppins_medium`}>
                    {t("about.heading3")}
                  </span>
                </h4>
                <h4
                  className={`poppins_regular text-sm md:text-base text-[#8B8B8B] mb-3 md:mb-8`}
                >
                  {t("about.heading4")}
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-4 mb-md-4">
                  {features.map((feature, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-start gap-3`}
                      >
                        <FaCheck className={`text-[#909495]`} size={20} />
                        <p
                          className={`text_primary poppins_medium text-sm md:text-xl`}
                        >
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <motion.button className="poppins_medium my-3 text-sm md:text-lg text_white px-5 py-[10px] mx-auto bg_primary rounded-lg">
                  {t("common.readMore")}
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </main>
    </section>
  );
}
