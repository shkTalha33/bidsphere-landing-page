"use client";
import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaServicestack } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { flipCard, slideIn, staggerContainer } from "../utils/motion";
import { promise1, promise2 } from "../assets/icons/icon";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const PromiseSection = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language?.language);
  return (
    <motion.div
      className="bg-white text-white py-4 sm:py-5 px-md-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container fluid="xxl">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-start">
          {/* Left Column */}
          <div>
            <div
              className={`flex gap-3 items-center justify-center md:justify-start mb-[10px] `}
            >
              <div className={`w-8 h-2 bg_primary rounded-full`}></div>
              <h6
                className={`text-[#202020] poppins_semibold text-xl capitalize mb-0`}
              >
                {t("promise.ourDifferences")}
              </h6>
            </div>
            <h4
              className={`text-2xl md:text-4xl text_primary poppins_medium capitalize mb-2 mb-md-4 flex items-center justify-center md:justify-start`}
            >
              {/* {t("promise.ourValue")}{" "} */}
              <span
                className={`text-black poppins_medium ${
                  language === "ar" ? "mr-2" : "ml-2"
                }`}
              >
                {t("promise.promises")}
              </span>
            </h4>

            <p
              className={`poppins_regular text-sm md:text-base text-[#8B8B8B] mb-3 mb-md-4`}
            >
              {t("promise.description")}
            </p>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Security Solutions Card */}
              <motion.div
                className="bg-[#ECE0E0] shadow-medium p-6 rounded-lg"
                variants={flipCard(0.2)}
              >
                <div className="flex gap-2 items-center mb-3">
                  <IoShieldCheckmarkSharp className="text_primary text-2xl" />
                  <h3 className="text_primary poppins_medium text-xl md:text-2xl mb-0">
                    {t("promise.ourMission")}
                  </h3>
                </div>
                <p className="text_primary text-sm leading-relaxed poppins_regular">
                  {t("promise.missionDescription")}
                </p>
              </motion.div>

              <motion.div
                className="bg-[#ECE0E0] shadow-medium p-6 rounded-lg"
                variants={flipCard(0.2)}
              >
                <div className="flex gap-2 items-center mb-3">
                  <FaServicestack className="text_primary text-2xl" />
                  <h3 className="text_primary poppins_medium text-xl md:text-2xl mb-0">
                    {t("promise.ourVision")}
                  </h3>
                </div>
                <p className="text_primary text-sm leading-relaxed poppins_regular">
                  {t("promise.visionDescription")}
                </p>
              </motion.div>
            </div>

            {/* Statistics */}
            <div className="space-y-6 w-2/3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <motion.span
                    variants={slideIn("left", 0.2)}
                    className="text_primary text-lg poppins_semibold"
                  >
                    {t("promise.clientsHappy")}
                  </motion.span>
                  <span className="text_primary text-base poppins_semibold">
                    75%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg_primary h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <motion.span
                    variants={slideIn("left", 0.2)}
                    className="text_primary text-lg poppins_semibold"
                  >
                    {t("promise.successRate")}
                  </motion.span>
                  <span className="text_primary text-base poppins_semibold">
                    90%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg_primary h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Building Image */}
            <motion.div
              className="relative rounded-lg mb-6"
              variants={slideIn("right", 0.2)}
            >
              <Image
                src={promise1}
                alt="promiseImage"
                className="w-full max-h-[550px] object-contain"
              />
              {/* Info Card */}
              <motion.div
                className={`hidden 2xl:block lg:absolute bottom-[-80px]  ${
                  language === "ar"
                    ? "xl:-left-28 lg:-left-40"
                    : "xl:-right-28 lg:-right-40"
                }  bg-[#ECE0E0] p-6 rounded-lg poppins_regular max-w-[340px]`}
              >
                <Image
                  src={promise2}
                  alt="promiseImage"
                  className="w-full max-h-[550px] h-[200px] object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default PromiseSection;
