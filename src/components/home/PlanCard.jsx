/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Image from "next/image";
import { Col } from "reactstrap";
import { fadeIn, slideIn } from "../utils/motion";

export default function PlansCard({ plan, index }) {
  return (
    <Col key={index}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col items-center bg-white py-[2rem] md:py-[4rem] px-1 md:px-6 h-full rounded-[15px] shadow"
        variants={fadeIn("down", "tween", (index + 1) * 0.1, 1)}
      >
        <div className="flex justify-center items-center">
          <img
            src={plan?.image}
            alt="Plan Icon"
            className="w-16 h-16 sm:w-20 sm:h-20 "
          />
        </div>
        {/* Text Content */}
        <div className="m-auto max-w-[18rem] text-center">
          <h6 className="poppins_semibold text-[1rem] md:text-[1.5rem] text_dark capitalize my-3">
            {plan?.name}
          </h6>
          <p className="mb-0 text-[#828282] poppins_regular text-[0.75rem]">
            {plan?.subtitle}
          </p>
        </div>
      </motion.div>
    </Col>
  );
}
