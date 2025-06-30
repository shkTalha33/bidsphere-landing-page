/* eslint-disable react/no-unescaped-entities */
import { fadeIn, staggerContainer } from "@/components/utils/motion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleour = () => {
    router.push("/auctions");
  };
  return (
    <main>
      <Container fluid className="px-0 relative pb-4 pb-sm-5">
        <motion.div
          className="relative overflow-hidden"
          variants={staggerContainer(0.2, 0.3)} // Pass stagger values
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="w-full h-[525px] md:h-[800px] relative bg-cover bg-center herobanner">
            <div className="bg-overlay2"></div>
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                className="text-[1.5rem] sm:text-3xl md:text-4xl lg:text-5xl poppins_semibold max-w-5xl leading-tight mb-6"
                variants={fadeIn("up", "tween", 0.3, 0.8)}
              >
                {t("homeSlider.title")}
              </motion.h1>

              <motion.p
                variants={fadeIn("down", "tween", 0.3, 0.8)}
                className="sm:text-lg md:text-xl mb-8 max-w-2xl text-[0.8rem] md:text-[1rem] poppins_regular"
              >
                {t("homeSlider.subTitle")}
              </motion.p>

              <motion.button
                onClick={handleour}
                variants={fadeIn("down", "tween", 0.3, 0.8)}
                className="bg-white text-black md:px-12 px-8 py-2 md:py-3 rounded-md sm:text-lg poppins_semibold hover:bg-gray-100 transition-colors text-[0.8rem] md:text-[1rem]"
              >
                {t("homeSlider.button")}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};

export default HeroSection;
