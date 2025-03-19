import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../utils/motion";
import { format, differenceInDays, differenceInHours } from "date-fns";
import { useDispatch } from "react-redux";
import { setAuctionProduct } from "../redux/auctionProduct";
import { useRouter } from "next/navigation";
import useCurrency from "../hooks/useCurrency";
export default function AuctionCard({ item, index }) {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();
  const dispatch = useDispatch();
  const formatTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);

    const days = differenceInDays(end, now);
    const hours = differenceInHours(end, now) % 24;

    return `Time left ${days}d ${hours}h (${format(end, "EEE, hh:mm a")})`;
  };

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item?._id}`);
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[#F3F3F3F2] rounded-xl overflow-hidden"
      variants={fadeIn("down", "tween", (index + 1) * 0.1, 1)}
    >
      <Image
        src={item?.images[0]}
        alt={item?.name}
        width={300}
        height={200}
        className="w-full !h-[200px] max-h-[200px] object-cover cursor-pointer"
        onClick={() => {
          handleAuctionDetail(item);
        }}
      />
      <div className="p-2">
        <p className="poppins_regular text_darkprimary text-[10px] mt-2">
          {formatTimeLeft(item?.end_date)}
        </p>
        <p className="poppins_mediumtext_darkprimary text-[1.25rem]">
          {item?.name}
        </p>
        <div className="flex items-center justify-start gap-2">
          <p className="mb-0 text_darkprimary text-lg">
            {" "}
            {formatPrice(convert(item?.lots[0]?.minprice, "LBP"))}
          </p>
          <p className="mb-0 text_seccondary text-sm">
            {formatPrice(convert(item?.lots[0]?.minincrement, "LBP"))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
