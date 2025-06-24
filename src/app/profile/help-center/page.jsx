/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { getFaqById, getFaqCategory } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import TopSection from "@/components/common/TopSection";
import TabHeader from "@/components/tabHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
/* eslint-disable @next/next/no-img-element */
import HelpCenterContent from "@/components/common/HelpCenterContent";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const ProfilePage = () => {
  const { get } = ApiFunction();
  const [lastId, setLastId] = useState(1);
  const [faqCategory, setFaqCategory] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqLastId, setFaqLastId] = useState(1);
  const [FaqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [pagiLoading, setPagiLoading] = useState(false);
  const [count, setCount] = useState(0);
  const language = useSelector(getLanguage);
  const router = useRouter();
  const { t } = useTranslation();

  //   ////////

  const navigate = (path) => {
    router.push(path);
  };

  //   get faq categories
  const handlegetFaqCategory = () => {
    setFaqLoading(true);
    const api = `${getFaqCategory}/all`;
    get(api)
      .then((res) => {
        if (res?.success && res?.categories?.length > 0) {
          setFaqCategory(res?.categories);
          if (!activeCategory) {
            setActiveCategory(res?.categories[0]?._id);
          }
        }
        setFaqLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setFaqLoading(false);
      });
  };

  useEffect(() => {
    handlegetFaqCategory();
  }, []);

  const handlecatActive = (item) => {
    setFaqLastId(1);
    setFaqData([]);
    setActiveCategory(item?._id);
    setCount(0);
  };

  const handleFaqById = (pageNo = 1) => {
    if (pageNo === 1) {
      setLoading(true);
    } else {
      setPagiLoading(true);
    }
    const api = `${getFaqById}/${pageNo}?cat=${activeCategory}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.faqs?.length > 0) {
          if (pageNo === 1) {
            setFaqData(res?.faqs);
          } else {
            setFaqData((prevData) => [...prevData, ...res?.faqs]);
          }
          setFaqLastId(pageNo);
          setCount(res?.count?.totalPage);
        }

        setLoading(false);
        setPagiLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
        setPagiLoading(false);
      });
  };

  useEffect(() => {
    if (activeCategory) {
      handleFaqById();
    }
  }, [activeCategory]);

  return (
    <main
      className="bg-gray-100 flex flex-col items-start"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="mx-auto p-4 flex flex-col lg:flex-row gap-6"
      >
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description="See your FAQs here.."
            mt={"mt-0 md:mt-0"}
            title={t("profil.heading29")}
          />
          <HelpCenterContent />
        </div>
      </Container>
    </main>
  );
};

export default ProfilePage;
