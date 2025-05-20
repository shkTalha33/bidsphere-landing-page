/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { getFaqById, getFaqCategory } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { StaticImage } from "@/components/assets/icons/icon";
import TopSection from "@/components/common/TopSection";
import OptionsHelpCenter from "@/components/optionsHelpCenter";
import TabHeader from "@/components/tabHeader";
import { Divider } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { HashLoader } from "react-spinners";
/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "react-i18next";

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
    <main className="bg-gray-100 flex flex-col items-start">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <TopSection
            description="See your FAQs here.."
            mt={0}
            title= {t("profil.heading29")}
          />
          <div className="bg-white px-8 rounded-lg w-full shadow-sm">
            <div className="p-3 p-md-4 rounded-4 bg_white">
              <h6
                className={`text-lg md:text-xl text-center text-md-start mb-4 xl:text-2xl poppins_medium`}
              >
                {t("profil.heading25")}
              </h6>
              <div className="flex max-[900px]:flex-wrap gap-2">
                <div className="w-100 max-[900px]:w-100 min-[900px]:max-w-[300px]">
                  <div className="h-auto  max-h-[20rem] overflow-auto shadow-sm  p-2 bg_white">
                    {faqLoading ? (
                      <div className="m-2 text-center">
                        <HashLoader size={18} />
                      </div>
                    ) : faqCategory?.length > 0 ? (
                      faqCategory?.map((category, index) => (
                        <Fragment key={index}>
                          <div>
                            <h6
                              onClick={() => handlecatActive(category)}
                              className={`mb-0 text-[1.2rem] capitalize cursor-pointer py-2 ${
                                activeCategory === category?._id
                                  ? "text_primary poppins_medium"
                                  : "text_secondary poppins_regular"
                              }`}
                            >
                              {category?.title}
                            </h6>
                            {faqCategory?.length > 1 && (
                              <Divider className="my-2" />
                            )}
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <>
                        <div className="flex flex-col justify-center items-center p-3 gap-2">
                          <Image
                            src={StaticImage}
                            className="w-[4rem] h-[4rem]"
                            alt="No Data"
                          />
                          <h5 className="text-center text-gray-500">
                            {t("category.categoryNotFound")}
                          </h5>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="hidden lg:block contact-help-center rounded-2 bg-blue-700 mt-6">
                    <div className="p-4">
                      <p className="mb-2 sm:text-[12px] md:text-[15px] lg:text-[18px] poppins_medium text_white">
                        {t("profil.heading26")}
                      </p>
                      <p className="md:text-[10px] lg:text-[14px] poppins_normal text_white">
                        {t("profil.heading27")}
                      </p>
                      <button
                        onClick={() => navigate("/contactUS")}
                        className="rounded-none bg-white text-blue-700 px-4 py-2 mt-2 poppins_medium hover:bg-gray-100 transition-colors"
                      >
                        {t("nav.contactus")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto max-h-[30rem] overflow-auto">
                  {loading ? (
                    <div className="flex justify-center items-center pt-5">
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {FaqData?.length > 0 ? (
                        <>
                          {FaqData?.map((items, index) => (
                            <Fragment key={index}>
                              <OptionsHelpCenter items={items} />
                            </Fragment>
                          ))}
                          {faqLastId !== count && (
                            <div className="flex justify-center items-center pt-5">
                              <button
                                disabled={pagiLoading}
                                onClick={() => handleFaqById(faqLastId + 1)}
                                className="bg_primary text-white font-bold py-2 px-4 rounded"
                              >
                                {pagiLoading ? (
                                  <Spinner size="sm" color="#0066CC" />
                                ) : (
                                  "Load More"
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="flex flex-col justify-center items-center pt-5">
                              <Image
                                src={StaticImage}
                                className="w-[4rem] h-[4rem]"
                                alt="No Data"
                              />
                              <h1 className="text-center text-[1rem]">
                                {t("profil.heading28")}
                              </h1>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
