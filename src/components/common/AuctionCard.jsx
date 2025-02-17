import { Divider } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../utils/motion";
export default function AuctionCard({ item, index }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[#F3F3F3F2] p-2 rounded-xl"
      variants={fadeIn("down", "tween", (index + 1)* 0.1 , 1)}
    >
      <Image src={item.image} alt="image1" className="w-full" />
      <Divider />
      <p className="poppins_regular text_darkprimary text-[11px]">
        Time left {item.time}
      </p>
      <p className="poppins_mediumtext_darkprimary text-[21px]">
        {item.product}
      </p>
      <div className="flex items-center justify-start gap-2">
        <p className="mb-0 text_darkprimary text-lg">{item.price}</p>
        <p className="mb-0 text_seccondary text-sm">{item.bids}</p>
      </div>
    </motion.div>
  );
}
