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
      className="bg-gray-100 min-h-screen flex flex-col items-center"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="bg_white rounded-[9px] p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("profil.heading29")} />
            <h3 className="text-xl sm:text-2xl poppins_medium text_dark">
              {t("profil.heading29")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container
        fluid="xxl"
        className="p-2 p-md-2 rounded-[9px] mt-2 md:mt-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <HelpCenterContent />
      </Container>
    </main>
  );
};

export default HelpCenterPage;
