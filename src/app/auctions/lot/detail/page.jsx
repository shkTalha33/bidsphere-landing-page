/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Check, ChevronRight, Heart, Maximize2, X } from "react-feather";

import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Page = () => {
  const { get, userData } = ApiFunction();
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { formatPrice, convert } = useCurrency();
  const [currentLot, setCurrentLot] = useState(null);
  const searchParams = useSearchParams();
  const itemParam = searchParams.get("item");
  const userLanguage = useSelector(getLanguage);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (itemParam) {
      try {
        const parsedItem = JSON.parse(itemParam);
        setCurrentLot(parsedItem);
        setLoading(false);
      } catch (err) {
        console.error("Error parsing item:", err);
        setLoading(false);
      }
    }
  }, [itemParam]);

  const { id } = useParams();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t("auctionJoin.heading1");
    if (hour >= 12 && hour < 17) return t("auctionJoin.heading2");
    if (hour >= 17 && hour < 21) return t("auctionJoin.heading3");
    return t("auctionJoin.heading4");
  };

  const handleImagePreview = (image) => {
    const imageIndex = currentLot?.item?.images?.findIndex(
      (img) => img === image
    );
    setActiveImageIndex(imageIndex >= 0 ? imageIndex : 0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (currentLot?.item?.images?.length > 0) {
      setSelectedImage(currentLot?.item?.images[0]);
    }
  }, [currentLot]);

  useEffect(() => {
    if (currentLot?.item?.images?.length > 1 && !isPaused) {
      const timer = setInterval(() => {
        setSelectedImage((prevImage) => {
          if (!prevImage) return currentLot?.item?.images[1];
          const currentIndex = currentLot.item.images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % currentLot.item.images.length;
          return currentLot.item.images[nextIndex];
        });
      }, 3000); // 3-second interval

      return () => clearInterval(timer);
    }
  }, [currentLot?.item?.images, isPaused]);

  useEffect(() => {
    if (selectedImage && thumbnailRefs.current) {
      const index = currentLot.item.images.indexOf(selectedImage);
      const thumbnailEl = thumbnailRefs.current[index];
      if (thumbnailEl) {
        thumbnailEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedImage, currentLot?.item?.images]);

  return (
    <>
      <main className="bg_mainsecondary p-2 md:py-4">
        {loading ? (
          <div className="min-h-[100vh] flex items-center justify-center">
            {" "}
            <HashLoader color="#660000" size={25} />{" "}
          </div>
        ) : (
          <>
            <TopSection
              title={`${getGreeting()}, ${userData?.fname || ""} ${
                userData?.lname || ""
              }`}
              description={t("lotDetail.heading1")}
              button={""}
            />
            <Container
              fluid="xxl"
              className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0"
            >
              <Row className="g-3 h-full">
                <Col
                  md="4"
                  lg="2"
                  className="flex md:flex-column "
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    ref={thumbnailContainerRef}
                    className="flex md:flex-col gap-3 h-100 max-h-[700px] w-full overflow-y-auto"
                  >
                    {currentLot?.item?.images?.map((image, index) => (
                      <div
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        className={`w-full md:w-full md:flex-grow-0 flex-shrink-0 h-[120px] mb-2 p-1 rounded-[12px] border-2 ${
                          selectedImage === image
                            ? "border-[#8B0000]"
                            : "border-transparent"
                        } transition-all duration-300`}
                      >
                        <div
                          className="relative w-full h-full cursor-pointer group"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            src={image}
                            width={250}
                            height={250}
                            className="w-full h-full object-cover rounded-[10px]"
                            alt={`Auction item thumbnail ${index}`}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[10px]">
                            <Maximize2 className="text-white w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col
                  md="8"
                  lg="5"
                  className="d-flex"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    className="relative bg_white rounded-[10px] w-100 h-100 flex items-center justify-center cursor-pointer group overflow-hidden max-h-[700px]"
                    onClick={() => handleImagePreview(selectedImage)}
                  >
                    {/* Preloaded Images */}
                    <div className="relative z-10 w-full h-full">
                      {currentLot?.item?.images?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          fill
                          quality={100}
                          priority={index === 0}
                          className={`object-contain transition-opacity duration-300 rounded-[10px] ${
                            selectedImage === image
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                          alt="auction item preview"
                          sizes="(max-width: 768px) 100vw, (max-width: 992px) 66vw, 42vw"
                        />
                      ))}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[10px] z-20">
                      <Maximize2 className="text-white w-12 h-12" />
                    </div>
                  </div>
                </Col>

                <Col
                  md="12"
                  lg="5"
                  className="bg_white p-3 md:p-4 rounded-lg d-flex flex-column max-h-[700px] overflow-y-auto"
                >
                  {/* Green Header Section */}
                  <div className=" pt-4 py-4 px-3 sm:px-6 rounded-xl relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="poppins_medium text-xl sm:text-2xl  mb-0 capitalize">
                          {currentLot?.item?.name}
                        </p>
                      </div>
                      <div className="mb-0">
                        <ChevronRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Price and Bidding Status Section */}
                  <div className="w-[100%] mx-auto relative mb-2 mt-[1rem]">
                    <Row className="py-4 bg-[#F3F2F2] rounded-[10px] g-3 mx-0">
                      <Col sm="6" className="border-r border-gray-300 px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("order.heading36")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {formatPrice(convert(currentLot?.item?.price, "LYD"))}
                        </p>
                      </Col>
                      <Col sm="6" className=" px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading2")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {currentLot?.item?.status}
                        </p>
                      </Col>
                      <Col sm="6" className="border-r border-gray-300 px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading3")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {formatPrice(convert(currentLot?.minprice, "LYD"))}
                        </p>
                      </Col>
                      <Col sm="6" className=" px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading4")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {formatPrice(
                            convert(currentLot?.minincrement, "LYD")
                          )}
                        </p>
                      </Col>
                      <Col sm="6" className="border-r border-gray-300 px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading5")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {userLanguage === "en"
                            ? currentLot?.item?.category?.name?.en
                            : currentLot?.item?.category?.name?.ar}
                        </p>
                      </Col>
                      <Col sm="6" className=" px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading6")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {currentLot?.item?.category?.status}
                        </p>
                      </Col>
                      <Col sm="12" className=" px-4">
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("lotDetail.heading7")}
                        </p>
                        <div className="poppins_regular abDatadi">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: currentLot?.item?.additionalinfo,
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}

        {/* Image Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={currentLot?.item?.images?.map((image) => ({ src: image }))}
          index={activeImageIndex}
          on={{
            view: ({ index }) => setActiveImageIndex(index),
          }}
        />
      </main>
    </>
  );
};

export default Page;
