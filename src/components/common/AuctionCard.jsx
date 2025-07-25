import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../utils/motion";
// import { format, differenceInDays, differenceInHours } from "date-fns";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import useCurrency from "../hooks/useCurrency";
import { setAuctionProduct } from "../redux/auctionProduct";

export default function AuctionCard({ item, index }) {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item?._id}`);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[#F3F3F3F2] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 scale-100 hover:scale-105"
      style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
      variants={fadeIn("down", "tween", (index + 1) * 0.1, 1)}
      onClick={() => {
        handleAuctionDetail(item);
      }}
    >
      <Image
        src={item?.images[0]}
        alt={item?.name}
        width={300}
        height={200}
        className="w-full !h-[200px] max-h-[200px] object-cover cursor-pointer group-hover:scale-105 transition-all duration-300 ease-in-out"
      />
      <div className="p-2">
        <p className="poppins_regular text_darkprimary text-[10px] mt-2">
          <div className="poppins_regular gap-1 text_darkprimary text-[10px] mt-2">
            <CountdownTimer
              startDate={item?.start_date}
              endDate={item?.end_date}
            />
          </div>
        </p>

        <p className="poppins_semibold capitalize mt-[7px] leading-[1.2] text_darkprimary text-[1rem] md:text-[1.25rem]">
          {item?.name}
        </p>
        <div className="flex items-center justify-start gap-2 mt-[5px]">
          <span className="text-gray text-[0.8rem]">
            {t("ongoing.heading4")}
          </span>
          <h5 className="mb-0 text_darkprimary text-[0.8rem] md:text-lg">
            {" "}
            {formatPrice(convert(item?.depositamount, "LYD"))}
          </h5>
        </div>
      </div>
    </motion.div>
  );
}
