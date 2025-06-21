"use client";
import OurOffer from "@/components/about/offers";
import PromiseSection from "@/components/about/promiseSection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactSection from "@/components/home/ContactSection";
import DownloadSection from "@/components/home/DownloadSection";
import Experience from "@/components/home/experience";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getLanguage } from "@/components/redux/language/languageSlice";

export default function About() {
  const { t } = useTranslation();
  const language = useSelector(getLanguage);
  return (
    <main className="pb-4 md:pb-[4rem] bg_mainsecondary overflow-hidden">
      <Container
        fluid="xxl"
        className="bg-white rounded-lg p-2 my-4 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
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
    </main>
  );
}
