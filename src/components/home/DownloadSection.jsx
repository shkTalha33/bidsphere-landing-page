/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "reactstrap";
import {
  appleStore,
  appstore,
  AppStoreIcon,
  downloadApp,
  googlePlay,
  phones,
  playstore,
  PlayStoreIcon,
} from "../assets/icons/icon";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "../utils/motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function DownloadSection() {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language?.language);

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pt-[1.81rem] pb-4 md:pb-[3.81rem] bg-[#F3F3F9] overflow-hidden"
    >
      <Container fluid="xxl">
        <Row>
          <Col md="6">
            <motion.div variants={slideIn("up", "tween", 0.3, 0.8)}>
              <Row className="items-center justify-center h-full">
                <Col md="9">
                  <div
                    className={`flex gap-3 items-center mb-[10px] ${
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
                      {t("mobileSection.heading")}
                    </h6>
                  </div>
                  <div className="my-3 md:my-7">
                    <h3
                      className={`poppins_medium text_primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("mobileSection.heading2")}{" "}
                      <span
                        className={`text-black poppins_medium capitalize ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("mobileSection.heading3")}
                      </span>
                    </h3>
                  </div>
                  <p
                    className={`poppins_regular text-xs sm:text-sm text-[#767E94] mb-3 md:mb-7 capitalize ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("mobileSection.heading4")}
                  </p>

                  <div
                    className={`flex gap-3 mb-4 flex-wrap items-center
              ${
                language === "ar"
                  ? "justify-end text-right"
                  : "justify-start text-left"
              }
              `}
                  >
                    <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
                      <Image
                        alt="Play Store"
                        src={PlayStoreIcon}
                        className={`h-[35px] w-[35px] object-contain ${
                          language === "ar" ? "order-2" : "order-1"
                        }`}
                      />
                      <div
                        className={`flex flex-column ${
                          language === "ar" ? "order-1" : "order-2"
                        }`}
                      >
                        <h5 className="color-0 poppins_regular text-[0.8rem]">
                          {t("mobileSection.heading5")}{" "}
                        </h5>
                        <h4 className="poppins_medium whitespace-nowrap text-[1.2rem] color-0">
                          {t("mobileSection.heading6")}
                        </h4>
                      </div>
                    </div>
                    <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
                      <Image
                        alt="Play Store"
                        src={AppStoreIcon}
                        className={`h-[35px] w-[35px] object-contain ${
                          language === "ar" ? "order-2" : "order-1"
                        }`}
                      />
                      <div
                        className={`flex flex-column ${
                          language === "ar" ? "order-1" : "order-2"
                        }`}
                      >
                        <h5 className="color-0 poppins_regular text-[0.8rem]">
                          {t("mobileSection.heading7")}
                        </h5>
                        <h4 className="poppins_medium whitespace-nowrap text-[1.2rem] color-0">
                          {t("mobileSection.heading8")}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </Col>
          <Col md="6">
            <motion.div variants={slideIn("up", "tween", 0.3, 0.8)}>
              <Image
                src={downloadApp}
                alt="Phones"
                className="max-h-[30rem] w-auto -auto h-full mb-3"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
