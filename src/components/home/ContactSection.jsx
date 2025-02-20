/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import React from "react";
import { Container, Input } from "reactstrap";
import { fadeIn, staggerContainer } from "../utils/motion";

export default function ContactSection() {
  return (
    <>
      <div className="w-full h-[3rem] md:h-[4.75rem] bg_white "></div>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="md:px-3 pt-[2rem] md:pt-[4.875rem] pb-[2rem] md:pb-[4.175rem] bg-[#F3F3F9] plusJakara_regular text_white flex items-center justify-center text-center bg_mainsecondary overflow-hidden"
      >
        {" "}
        {/* Ensures content is above the overlay */}
        <Container className="">
          <div className="px-[1rem] bg_primary py-[2rem] md:py-[4rem] md:px-[4rem] w-full plusJakara_medium rounded-2xl">
            <motion.div
              className="flex items-center justify-center"
              variants={fadeIn("down", "tween", 0.3, 0.8)}
            >
              <div className="max-w-[50rem]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl poppins_semibold capitalize text-center m-auto mb-2 md:mb-4">
                  STAY UPTO DATE ABOUT OUR LATEST AUCTIONS
                </h2>
                <p className="m-auto poppins_regular text-center text-sm md:text-lg capitalize mb-3 md:mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
                <div className="bg_white p-[0.3rem] md:p-[0.5rem] max-w-[33rem] m-auto rounded-[6px] mb-2 md:mb-4">
                  <div className="flex">
                    <Input
                      placeholder="Your business email"
                      className="text_primary border-0 text-[0.8rem] sm:text-[1rem]"
                    />
                    <button className="bg_primary md:py-4 px-5 rounded-[6px] whitespace-nowrap text-base poppins_semibold">
                      Get Started
                    </button>
                  </div>
                </div>
                <p className="text-xs poppins_regular">
                  By clicking Sign Up you're confirming that you agree with our
                  <span className="text_white ms-1 underline cursor-pointer">
                    Terms and Conditions
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* <div className="w-full h-[3rem] md:h-[4.75rem] bg_white"></div> */}
    </>
  );
}
