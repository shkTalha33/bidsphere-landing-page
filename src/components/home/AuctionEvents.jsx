/* eslint-disable react/no-unescaped-entities */
"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { getLanguage } from "../redux/language/languageSlice";
export default function AuctionEvents() {
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  return (
    <>
      <Container fluid="xxl" dir={language === "ar" ? "rtl" : "ltr"}>
        <Col md="12">
          <div className="flex justify-center items-center flex-col gap-1 mt-4 mb-[8px] md:mb-[18px]">
            <div className="w-8 h-2 bg_primary rounded-full"></div>
            <p className="text-[#202020] poppins_semibold text-lg sm:text-2xl text-center capitalize">
              {t("services.services")}
            </p>
          </div>

          {/* Cards Section */}
          <Row className="justify-center gap-y-6">
            {/* Card 1 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-3 p-md-4 h-full hover:-translate-y-1 border border-gray-100">
                <h3
                  className={`text-lg sm:text-xl poppins_semibold mb-2 text-[#1a1a1a]`}
                >
                  {t("services.heading")}
                </h3>
                <p
                  className={`text-[#555] text-sm poppins_medium leading-relaxed  `}
                >
                  {t("services.heading1")}
                </p>
              </div>
            </Col>

            {/* Card 2 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-3 p-md-4 h-full hover:-translate-y-1 border border-gray-100">
                <h3
                  className={`text-lg sm:text-xl poppins_semibold mb-2 text-[#1a1a1a]`}
                >
                  {t("services.heading2")}
                </h3>
                <p
                  className={`text-[#555] text-sm poppins_medium leading-relaxed  `}
                >
                  {t("services.heading3")}
                </p>
              </div>
            </Col>

            {/* Card 3 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-3 p-md-4 h-full hover:-translate-y-1 border border-gray-100">
                <h3
                  className={`text-lg sm:text-xl poppins_semibold mb-2 text-[#1a1a1a]`}
                >
                  {t("services.heading4")}
                </h3>
                <p
                  className={`text-[#555] text-sm poppins_medium leading-relaxed  `}
                >
                  {t("services.heading5")}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md="12" className="mt-[2.5rem] md:mt-[3rem]">
          <div className="flex justify-center items-center flex-col mb-[18px]">
            <div className="w-8 h-2 bg_primary rounded-full mb-2"></div>
            <p className="text-[#202020] poppins_semibold text-lg sm:text-2xl text-center capitalize">
              {t("services.heading6")}
            </p>
            <h5 className="poppins_regular text-[#8F8F8F] text-center sm:w-[70%] mx-auto mt-[1rem] text-sm">
              {t("services.heading7")}
            </h5>
          </div>
        </Col>
      </Container>
    </>
  );
}
