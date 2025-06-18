"use client";
import React from "react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/components/utils/motion";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Experience from "@/components/home/experience";
import OurOffer from "@/components/about/offers";
import DownloadSection from "@/components/home/DownloadSection";
import ContactSection from "@/components/home/ContactSection";
import PromiseSection from "@/components/about/promiseSection";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <motion.main
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="pb-4 md:pb-[4rem] bg_mainsecondary overflow-hidden"
    >
      <Container className="bg-white rounded-lg p-2 my-4 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("nav.about")} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text-gray-800">
              {t("nav.about")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Experience />
      <OurOffer />
      <PromiseSection />
      <DownloadSection />
      <ContactSection />
    </motion.main>
  );
}
