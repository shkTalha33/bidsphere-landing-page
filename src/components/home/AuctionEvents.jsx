/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { slideIn, staggerContainer } from "../utils/motion";
import useCurrency from "../hooks/useCurrency";
import { useGetAuctionsQuery } from "../redux/apiSlice";
import { getCategory } from "../api/ApiFile";
import Image from "next/image";
import { StaticImage } from "../assets/icons/icon";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SectionHeadings from "../common/sectionHeadings";
export default function AuctionEvents() {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isLoading, error } = useGetAuctionsQuery({
    endpoint: `${getCategory}`,
  });

  const handleCatAuction = (item) => {
    router.push(`/category-auction/${item?._id}`);
  };
  return (
    <>
      <Container>
        <Col md="12">
          <div className="flex justify-center items-center flex-col gap-1 mb-[18px]">
            <div className="w-8 h-2 bg_primary rounded-full"></div>
            <p className="text-[#202020] poppins_semibold text-2xl text-center capitalize">
              Our Services
            </p>
          </div>

          {/* Cards Section */}
          <Row className="justify-center gap-y-6">
            {/* Card 1 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 h-full cursor-pointer hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-4"></div>
                <h3 className="text-xl poppins_semibold mb-2 text-[#1a1a1a]">
                  Comprehensive Auction Display
                </h3>
                <p className="text-[#555] text-sm poppins_medium leading-relaxed">
                  A large physical site that allows the display of hundreds of
                  heavy equipment, vehicles, horses and livestock, in addition
                  to real estate, office and home furniture, antiques, and
                  agricultural products.
                </p>
              </div>
            </Col>

            {/* Card 2 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 h-full cursor-pointer hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full mb-4"></div>
                <h3 className="text-xl poppins_semibold mb-2 text-[#1a1a1a]">
                  Digital Bidding & Accurate Valuation
                </h3>
                <p className="text-[#555] text-sm poppins_medium leading-relaxed">
                  Live online auctions for remote bidding through our digital
                  platform. Accurate valuation services for sellers to determine
                  the true value of their items.
                </p>
              </div>
            </Col>

            {/* Card 3 */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 h-full cursor-pointer hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-4"></div>
                <h3 className="text-xl poppins_semibold mb-2 text-[#1a1a1a]">
                  Expert Consulting & Support
                </h3>
                <p className="text-[#555] text-sm poppins_medium leading-relaxed">
                  Consulting: Personalized support and guidance throughout the
                  process. We assist you in every step of the auction lifecycle.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md="12" className="mt-[3rem]">
          <div className="flex justify-center items-center flex-col mb-[18px]">
            <div className="w-8 h-2 bg_primary rounded-full mb-2"></div>
            <p className="text-[#202020] poppins_semibold text-2xl text-center capitalize">
              Vision & Mission
            </p>
            <h5 className="poppins_regular text-[#8F8F8F] text-center sm:w-[70%] mx-auto mt-[1rem]">
              To become a leading auction house in Libya and the region, driven
              by transparency, trust, and technology. To provide a fair and
              accessible platform for everyone to showcase goods and participate
              in auctions with confidence.
            </h5>
          </div>
        </Col>
      </Container>
    </>
    // <motion.main
    //   variants={staggerContainer}
    //   initial="hidden"
    //   whileInView="show"
    //   viewport={{ once: true, amount: 0.1 }}
    //   className="pb-4 md:pb-[5rem] bg-white overflow-hidden mt-3"
    // >
    //   {data?.categories?.length > 0 ? (
    //     <Container>
    //       <Row className="g-3">
    //         {data?.categories?.[0] && (
    //           <Col md="6" className="d-flex">
    //             <motion.div
    //               variants={slideIn("left", "damping", 0.3, 0.8)}
    //               className="w-full rounded-2xl flex flex-col justify-between p-16 border"
    //               style={{
    //                 background: `url(${data?.categories[0]?.image})`,
    //                 backgroundSize: "100% 100%",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //             >
    //               <div>
    //                 <div className="poppins_semibold text_white text-4xl capitalize">
    //                   {data?.categories[0]?.name}
    //                 </div>
    //                 <div className="poppins_regular line-clamp-1 text_white text-3xl mb-8 capitalize">
    //                   {data?.categories[0]?.subtitle}
    //                 </div>
    //               </div>
    //               <button
    //                 onClick={() => handleCatAuction(data?.categories[0])}
    //                 className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
    //               >
    //                 {t("homeSlider.button")}
    //               </button>
    //             </motion.div>
    //           </Col>
    //         )}

    //         {data?.categories?.[1] && (
    //           <Col md="6" className="d-flex">
    //             <motion.div
    //               variants={slideIn("up", "damping", 0.3, 0.8)}
    //               className="w-full rounded-2xl flex flex-col justify-between p-16 border"
    //               style={{
    //                 background: `url(${data?.categories[1]?.image})`,
    //                 backgroundSize: "100% 100%",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //             >
    //               <div>
    //                 <div className="poppins_semibold text_white text-4xl capitalize">
    //                   {data?.categories[1]?.name}
    //                 </div>
    //                 <div className="poppins_regular text_white text-4xl mb-8 capitalize line-clamp-1">
    //                   {data?.categories[1]?.subtitle}
    //                 </div>
    //               </div>
    //               <button
    //                 onClick={() => handleCatAuction(data?.categories[1])}
    //                 className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36"
    //               >
    //                 {t("homeSlider.button")}
    //               </button>
    //             </motion.div>
    //           </Col>
    //         )}

    //         {data?.categories?.[2] && (
    //           <Col md="4">
    //             <motion.div
    //               variants={slideIn("up", "damping", 0.3, 0.8)}
    //               className="w-full rounded-2xl flex flex-col justify-between px-8 py-16 border"
    //               style={{
    //                 background: `url(${data?.categories[2]?.image})`,
    //                 backgroundSize: "100% 100%",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //             >
    //               <div>
    //                 <div className="poppins_semibold text_white text-4xl capitalize">
    //                   {data?.categories[2]?.name}
    //                 </div>
    //                 <div className="poppins_regular text_white text-4xl mb-8 capitalize line-clamp-1">
    //                   {data?.categories[2]?.subtitle}
    //                 </div>
    //               </div>
    //               <button
    //                 onClick={() => handleCatAuction(data?.categories[2])}
    //                 className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36"
    //               >
    //                 {t("homeSlider.button")}
    //               </button>
    //             </motion.div>
    //           </Col>
    //         )}

    //         {data?.categories?.[3] && (
    //           <Col md="4">
    //             <motion.div
    //               variants={slideIn("up", "damping", 0.3, 0.8)}
    //               className="w-full rounded-2xl flex flex-col justify-between px-8 py-16 border"
    //               style={{
    //                 background: `url(${data?.categories[3]?.image})`,
    //                 backgroundSize: "100% 100%",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //             >
    //               <div>
    //                 <div className="poppins_semibold text_white text-4xl capitalize">
    //                   {data?.categories[3]?.name}
    //                 </div>
    //                 <div className="poppins_regular text_white text-4xl mb-8 capitalize line-clamp-1">
    //                   {data?.categories[3]?.subtitle}
    //                 </div>
    //               </div>
    //               <button
    //                 onClick={() => handleCatAuction(data?.categories[3])}
    //                 className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
    //               >
    //                 {t("homeSlider.button")}
    //               </button>
    //             </motion.div>
    //           </Col>
    //         )}

    //         {data?.categories?.[4] && (
    //           <Col md="4">
    //             <motion.div
    //               variants={slideIn("right", "damping", 0.3, 0.8)}
    //               className="w-full rounded-2xl flex flex-col justify-between px-8 py-16 border"
    //               style={{
    //                 background: `url(${data?.categories[4]?.image})`,
    //                 backgroundSize: "100% 100%",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //             >
    //               <div>
    //                 <div className="poppins_semibold text_white text-4xl capitalize">
    //                   {data?.categories[4]?.name}
    //                 </div>
    //                 <div className="poppins_regular text_white text-lg mb-8 capitalize">
    //                   {data?.categories[4]?.subtitle}
    //                 </div>
    //               </div>
    //               <button
    //                 onClick={() => handleCatAuction(data?.categories[4])}
    //                 className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
    //               >
    //                 {t("homeSlider.button")}
    //               </button>
    //             </motion.div>
    //           </Col>
    //         )}
    //       </Row>
    //     </Container>
    //   ) : (
    //     <>
    //       <div className="flex justify-center items-center h-[15rem] w-full">
    //         <div className="text-center flex justify-center items-center flex-col gap-2">
    //           <Image
    //             className="w-[5rem] h-[5rem]"
    //             src={StaticImage}
    //             alt="No Auction Events"
    //           />

    //           <h1 className="text-2xl font-bold mb-0">
    //             {t("ongoing.heading2")}
    //           </h1>
    //           <p className="mb-0"> {t("ongoing.heading3")}</p>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </motion.main>
  );
}
