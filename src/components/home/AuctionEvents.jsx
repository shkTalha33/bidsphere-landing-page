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
export default function AuctionEvents() {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();

  const { data, isLoading, error } = useGetAuctionsQuery({
    endpoint: `${getCategory}`,
  });

  const handleCatAuction = (item) => {
    router.push(`/category-auction/${item?._id}`);
  };
  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pb-4 md:pb-[5rem] bg-white overflow-hidden"
    >
      {data?.categories?.length > 0 ? (
        <Container>
          <Row className="g-3">
            {data?.categories?.[0] && (
              <Col md="6" className="d-flex">
                <motion.div
                  variants={slideIn("left", "damping", 0.3, 0.8)}
                  className="w-full rounded-2xl flex flex-col justify-between p-16"
                  style={{
                    background: `url(${data?.categories[0]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="poppins_regular text_white text-4xl capitalize">
                      {data?.categories[0]?.name}
                    </div>
                    <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                      {data?.categories[0]?.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCatAuction(data?.categories[0])}
                    className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
                  >
                    Bid Now
                  </button>
                </motion.div>
              </Col>
            )}

            {data?.categories?.[1] && (
              <Col md="6" className="d-flex">
                <motion.div
                  variants={slideIn("up", "damping", 0.3, 0.8)}
                  className="w-full rounded-2xl flex flex-col justify-between p-16"
                  style={{
                    background: `url(${data?.categories[1]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="poppins_regular text_white text-4xl capitalize">
                      {data?.categories[1]?.name}
                    </div>
                    <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                      {data?.categories[1]?.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCatAuction(data?.categories[1])}
                    className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36"
                  >
                    Bid Now
                  </button>
                </motion.div>
              </Col>
            )}

            {data?.categories?.[2] && (
              <Col md="4">
                <motion.div
                  variants={slideIn("up", "damping", 0.3, 0.8)}
                  className="w-full rounded-2xl flex flex-col justify-between px-8 py-16"
                  style={{
                    background: `url(${data?.categories[2]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="poppins_regular text_white text-4xl capitalize">
                      {data?.categories[2]?.name}
                    </div>
                    <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                      {data?.categories[2]?.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCatAuction(data?.categories[2])}
                    className="bg-[#FBD118] poppins_regular text-sm rounded-xl h-10 text-white w-36"
                  >
                    Bid Now
                  </button>
                </motion.div>
              </Col>
            )}

            {data?.categories?.[3] && (
              <Col md="4">
                <motion.div
                  variants={slideIn("up", "damping", 0.3, 0.8)}
                  className="w-full rounded-2xl flex flex-col justify-between px-8 py-16"
                  style={{
                    background: `url(${data?.categories[3]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="poppins_regular text_white text-4xl capitalize">
                      {data?.categories[3]?.name}
                    </div>
                    <div className="poppins_semibold text_white text-4xl mb-8 capitalize">
                      {data?.categories[3]?.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCatAuction(data?.categories[3])}
                    className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
                  >
                    Bid Now
                  </button>
                </motion.div>
              </Col>
            )}

            {data?.categories?.[4] && (
              <Col md="4">
                <motion.div
                  variants={slideIn("right", "damping", 0.3, 0.8)}
                  className="w-full rounded-2xl flex flex-col justify-between px-8 py-16"
                  style={{
                    background: `url(${data?.categories[4]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div>
                    <div className="poppins_semibold text_white text-4xl capitalize">
                      {data?.categories[4]?.name}
                    </div>
                    <div className="poppins_regular text_white text-lg mb-8 capitalize">
                      {data?.categories[4]?.subtitle}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCatAuction(data?.categories[4])}
                    className="bg_darkprimary poppins_regular text-sm rounded-xl h-10 text-white w-36"
                  >
                    Bid Now
                  </button>
                </motion.div>
              </Col>
            )}
          </Row>
        </Container>
      ) : (
        <>
          <div className="flex justify-center items-center h-[15rem] w-full">
            <div className="text-center flex justify-center items-center flex-col gap-2">
              <Image
                className="w-[5rem] h-[5rem]"
                src={StaticImage}
                alt="No Auction Events"
              />

              <h1 className="text-2xl font-bold mb-0">
                No Auction Events Available
              </h1>
              <p className="mb-0">Please check back later.</p>
            </div>
          </div>
        </>
      )}
    </motion.main>
  );
}
