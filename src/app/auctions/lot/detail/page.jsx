/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Maximize2 } from "react-feather";

import { getLanguage } from "@/components/redux/language/languageSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Row } from "reactstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getAuctionLot } from "@/components/api/ApiFile";

const Page = () => {
  const { get, userData } = ApiFunction();
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

  const fetchLotDetail = async () => {
    try {
      const response = await get(`${getAuctionLot}${itemParam}`);

      setCurrentLot(response?.lot);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lot detail:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotDetail();
  }, [userLanguage]);

  const { id } = useParams();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t("auctionJoin.heading1");
    if (hour >= 12 && hour < 17) return t("auctionJoin.heading2");
    if (hour >= 17 && hour < 21) return t("auctionJoin.heading3");
    return t("auctionJoin.heading4");
  };

  const handleImagePreview = (image) => {
    const imageIndex = currentLot?.images?.findIndex((img) => img === image);
    setActiveImageIndex(imageIndex >= 0 ? imageIndex : 0);
    setLightboxOpen(true);
  };

  // Fixed: Initialize selectedImage when currentLot changes
  useEffect(() => {
    if (currentLot?.images?.length > 0 && !selectedImage) {
      setSelectedImage(currentLot.images[0]);
    }
  }, [currentLot, selectedImage]);

  // Fixed: Auto-rotation logic
  useEffect(() => {
    if (currentLot?.images?.length > 1 && !isPaused) {
      const timer = setInterval(() => {
        setSelectedImage((prevImage) => {
          if (!prevImage || !currentLot?.images) return currentLot?.images?.[0];
          const currentIndex = currentLot.images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % currentLot.images.length;
          return currentLot.images[nextIndex];
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [currentLot?.images, isPaused]);

  // Fixed: Thumbnail scrolling
  useEffect(() => {
    if (selectedImage && thumbnailRefs.current && currentLot?.images) {
      const index = currentLot.images.indexOf(selectedImage);
      const thumbnailEl = thumbnailRefs.current[index];
      if (thumbnailEl) {
        thumbnailEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedImage, currentLot?.images]);

  return (
    <>
      <main
        className="bg_mainsecondary p-2 md:py-4"
        dir={userLanguage === "ar" ? "rtl" : "ltr"}
      >
        {loading ? (
          <div className="min-h-[100vh] flex items-center justify-center">
            <HashLoader color="#9F1E24" size={25} />
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
                {/* Fixed: Thumbnail section with better mobile layout */}
                <Col
                  xs="12"
                  md="4"
                  lg="2"
                  className=""
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    ref={thumbnailContainerRef}
                    className="flex md:flex-col gap-2 md:gap-3 h-auto md:h-100 max-h-[120px] md:max-h-[700px] w-full overflow-x-auto md:overflow-y-auto overflow-y-hidden md:overflow-x-hidden pb-2 md:pb-0"
                  >
                    {currentLot?.images?.map((image, index) => (
                      <div
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        className={`flex-shrink-0 w-[100px] h-[100px] md:w-full md:h-[120px] mb-0 md:mb-2 p-1 rounded-[12px]
                                            border-2 ${
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
                            <Maximize2 className="text-white w-4 h-4 md:w-6 md:h-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>

                {/* Fixed: Main image section with better mobile display */}
                <Col
                  xs="12"
                  md="8"
                  lg="5"
                  className=""
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    className="relative bg_white rounded-[10px] w-100 h-[300px] md:h-100 flex items-center justify-center cursor-pointer group overflow-hidden max-h-[300px] md:max-h-[700px]"
                    onClick={() => handleImagePreview(selectedImage)}
                  >
                    {/* Fixed: Better image display logic */}
                    <div className="relative z-10 w-full h-full">
                      {selectedImage && (
                        <Image
                          src={selectedImage}
                          fill
                          quality={100}
                          priority
                          className="object-contain transition-opacity duration-300 rounded-[10px]"
                          alt="auction item preview"
                          sizes="(max-width: 768px) 100vw, (max-width: 992px) 66vw, 42vw"
                        />
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[10px] z-20">
                      <Maximize2 className="text-white w-8 h-8 md:w-12 md:h-12" />
                    </div>
                  </div>
                </Col>

                {/* Details section */}
                <Col
                  xs="12"
                  md="12"
                  lg="5"
                  className="order-3 bg_white p-3 md:p-4 rounded-lg d-flex flex-column max-h-none lg:max-h-[700px] overflow-y-auto"
                >
                  {/* Green Header Section */}
                  <div className="rounded-xl relative mb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="poppins_medium text-base sm:text-lg md:text-xl capitalize text-center md:text-start">
                          {currentLot?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price and Bidding Status Section */}
                  <div className="w-[100%] mx-auto relative mb-2 mt-[1rem]">
                    <Row className="pb-3 py-md-4 bg-[#F3F2F2] rounded-[10px] g-3 mx-0">
                      <Col
                        xs="12"
                        sm="6"
                        className="border-r-0 sm:border-r border-gray-300 px-3 px-md-4 mb-3 sm:mb-0"
                      >
                        <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                          {t("order.heading36")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {formatPrice(convert(currentLot?.price, "LYD"))}
                        </p>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        className="border-r-0 sm:border-r border-gray-300 px-3 px-md-4 mb-3 sm:mb-0"
                      >
                        <p className="text-[#1B212C] mb-0 text-base md:text-lg poppins_medium capitalize">
                          {t("lotDetail.heading3")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {currentLot?.status}
                        </p>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        className="border-r-0 sm:border-r border-gray-300 px-3 px-md-4 mb-3 sm:mb-0"
                      >
                        <p className="text-[#1B212C] mb-0 text-base md:text-lg poppins_medium capitalize">
                          {t("lotDetail.heading6")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {currentLot?.category?.name}
                        </p>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        className="border-r-0 sm:border-r border-gray-300 px-3 px-md-4 mb-3 sm:mb-0"
                      >
                        <p className="text-[#1B212C] mb-0 text-base md:text-lg poppins_medium capitalize">
                          {t("lotDetail.heading8")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          {currentLot?.subcategory?.title[userLanguage]}
                        </p>
                      </Col>
                      <Col xs="12" sm="6" className="px-3 px-md-4">
                        <p className="text-[#1B212C] mb-0 text-base md:text-lg poppins_medium capitalize">
                          {t("lotDetail.heading7")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: currentLot?.additionalinfo,
                            }}
                          />
                        </p>
                      </Col>
                      <Col xs="12" sm="6" className="px-3 px-md-4">
                        <p className="text-[#1B212C] mb-0 text-base md:text-lg poppins_medium capitalize">
                          {t("auction.lotnumber")}
                        </p>
                        <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                          #{currentLot?.lotNumber}
                        </p>
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
          slides={currentLot?.images?.map((image) => ({ src: image }))}
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
