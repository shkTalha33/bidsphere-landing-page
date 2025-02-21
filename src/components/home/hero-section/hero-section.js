/* eslint-disable react/no-unescaped-entities */
import { bounce, fadeIn, slideIn, staggerContainer, zoomIn } from "@/components/utils/motion";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

const HeroSection = () => {
  return (
    <main>
      <Container fluid className="px-0 relative pb-5">
        <motion.div
          className="relative overflow-hidden"
          variants={staggerContainer(0.2, 0.3)} // Pass stagger values
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div
            className="w-full h-[853px] relative bg-cover bg-center"
            style={{
              backgroundImage: `url(/assets/landingimage.png)`,
            }}
          >
            <div className="bg-overlay2"></div>
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight mb-6"
                variants={fadeIn("up", "tween", 0.3, 0.8)}
              >
                Bid With Confidence, Win With Security & Experience The Future
                Of Auctions
              </motion.h1>

              <motion.p variants={fadeIn("down", "tween", 0.3, 0.8)} className="sm:text-lg md:text-xl mb-8 max-w-2xl">
                Join a trusted marketplace where every bid is protected and
                every transaction is seamless.
              </motion.p>

              <motion.button variants={fadeIn("down", "tween", 0.3, 0.8)} className="bg-white text-black px-12 py-2 md:py-3 rounded-md sm:text-lg font-semibold hover:bg-gray-100 transition-colors">
                Bid Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};

export default HeroSection;
