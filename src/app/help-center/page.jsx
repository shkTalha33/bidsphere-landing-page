"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import HelpCenterContent from "@/components/common/HelpCenterContent";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HelpCenterPage = () => {
  const { t } = useTranslation();
  const language = useSelector(getLanguage);
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="bg_white rounded-[9px] p-3 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Row>
          <Col md="12" className="">
            <Breadcrumbs pageTitle={t("profil.heading29")} />
            <h3 className="text-xl sm:text-2xl poppins_medium text_dark">
              {t("profil.heading29")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container
        fluid="xxl"
        className="p-3 p-md-4 bg_white rounded-[9px] mt-3 mt-md-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <HelpCenterContent />
      </Container>
    </main>
  );
};

export default HelpCenterPage;
