/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useRouter } from "next/navigation";

export default function PlansCard({ plan, index }) {
  const router = useRouter();

  const handleCatAuction = (item) => {
    router.push(`/category-auction/${item?._id}`);
  };

  return (
    <motion.div
      key={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn("up", "tween", (index + 1) * 0.1, 1)}
      onClick={() => handleCatAuction(plan)}
      className="relative h-[225px] sm:h-[300px] w-full rounded-xl overflow-hidden cursor-pointer group"
    >
      {/* Background Image */}
      <img
        src={plan?.image}
        alt={plan?.name}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
      />

      {/* Black Overlay (visible by default, hides on hover) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm bg-opacity-60 transition-all duration-500 group-hover:opacity-0 pointer-events-none"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-white text-lg md:text-xl poppins_semibold capitalize line-clamp-1">
          {plan?.name}
        </h3>
        <p className="text-white text-sm opacity-80 mt-1 poppins_regular line-clamp-2">
          {plan?.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
