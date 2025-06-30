"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, slideIn } from "../utils/motion";
import { offer1, offer2, offer3 } from "../assets/icons/icon";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function OurOffer() {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);
  const [readMore, setReadMore] = useState({
    1: false,
    2: false,
    3: false,
  });
  const auctionData = [
    {
      id: 1,
      date: t("offers.auction1.date"),
      title: t("offers.auction1.title"),
      description: t("offers.auction1.description"),
      image: offer1,
      readTime: t("offers.auction1.readTime"),
    },
    {
      id: 2,
      date: t("offers.auction2.date"),
      title: t("offers.auction2.title"),
      description: t("offers.auction2.description"),
      image: offer2,
      readTime: t("offers.auction2.readTime"),
    },
    {
      id: 3,
      date: t("offers.auction3.date"),
      title: t("offers.auction3.title"),
      description: t("offers.auction3.description"),
      image: offer3,
      readTime: t("offers.auction3.readTime"),
    },
  ];

  return (
    <>
      <motion.section
        className="bg_mainsecondary text-white pb-4 md:pb-[4rem]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Container fluid="xxl">
          <h4 className="text_darkprimary poppins_medium text-2xl md:text-4xl text-center capitalize mb-5">
            {t("offers.heading")} <br /> {t("offers.subHeading")}
          </h4>
          <motion.div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctionData.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg group"
                variants={slideIn(
                  index === 0 ? "left" : index === 1 ? "up" : "right",
                  0.2 * article.id
                )}
              >
                <div className="p-3">
                  <div className="relative group overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-500"
                    />

                    {/* Overlay just on image */}
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                </div>

                <div className="p-3 lg:p-6  h-full">
                  <div className="text-black transition-all duration-300 text-lg mb-3 poppins_medium">
                    {article.title}
                  </div>
                  <p className="text-black text-base poppins_regular mb-4 leading-snug transition-colors duration-300">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      className="text-brand-secondary poppins_medium text-sm transition-colors duration-300 underline"
                      onClick={() =>
                        setReadMore({
                          ...readMore,
                          [article.id]: !readMore[article.id],
                        })
                      }
                    >
                      {readMore[article.id]
                        ? t("offers.readLess")
                        : t("offers.readMore")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>
    </>
  );
}
