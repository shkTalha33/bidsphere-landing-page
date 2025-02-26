"use client";
import {
  avataruser,
  car1,
  confirmBid,
  winBid,
} from "@/components/assets/icons/icon";
import AuctionConfirmationModal from "@/components/common/auctionConfirmationModal";
import TopSection from "@/components/common/TopSection";
import { Avatar, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Check, ChevronRight, Heart, X } from "react-feather";
import { FaRegClock } from "react-icons/fa6";
import { TbLivePhoto } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Page() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("custom");
  const [openBiddingConfirmationModal, setOpenBiddingConfirmationModal] =
    useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const item = useSelector(
    (state) => state.auctionProduct.auctionProductData || {}
  );

  const images = useMemo(() => {
    if (item?.images && item.images.length > 0) {
      return item.images;
    }
    return [car1, car1, car1, car1, car1];
  }, [item?.images]);

  const imageLayout = useMemo(() => {
    const totalImages = images.length;
    let col1Images = [];
    let col2Images = [];
    let showSeeAll = false;

    if (totalImages === 1) {
      col1Images = [images[0]];
      col2Images = [];
    } else if (totalImages === 2) {
      col1Images = [images[0]];
      col2Images = [images[1]];
    } else if (totalImages === 3) {
      col1Images = [images[0], images[1]];
      col2Images = [images[2]];
    } else if (totalImages === 4) {
      col1Images = [images[0], images[1], images[2]];
      col2Images = [images[3]];
    } else if (totalImages === 5) {
      col1Images = [images[0], images[1], images[2], images[3]];
      col2Images = [images[4]];
    } else if (totalImages > 5) {
      col1Images = [images[0], images[1], images[2], images[3]];
      col2Images = [images[4]];
      showSeeAll = true;
    }

    return { col1Images, col2Images, showSeeAll, totalImages };
  }, [images]);

  const bidders = [
    {
      id: 1,
      name: "Ronald Richards",
      bid: "$24.5k",
      avatar: avataruser,
      timeAgo: "2m",
    },
    {
      id: 2,
      name: "Cameron Williamson",
      bid: "$20k",
      avatar: avataruser,
      timeAgo: "1m",
    },
    {
      id: 3,
      name: "Guy Hawkins",
      bid: "$18k",
      avatar: avataruser,
      timeAgo: "2m",
    },
  ];

  const button = {
    icon: <Heart className="w-4 h-4 md:w-5 md:h-5 text-white" />,
    onClick: () => console.log("Heart clicked!"),
    className:
      "w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center",
  };

  const confirmationItem = {
    title: "Confirm Bid",
    description:
      "You have placed a bid for $35,000. Should we place this as your Bid?",
    image: confirmBid,
    buttons: [
      {
        btnText: "Yes, Place My Bid",
        onClick: () => router.push("/auctions/registration"),
        className:
          "rounded-[10px] bg_primary text-white poppins_medium text-xs sm:text-base md:text-lg border border-[#21CD9D] w-full py-2 md:py-3",
      },
      {
        btnText: "Cancel",
        onClick: () => setOpenBiddingConfirmationModal(false),
        className:
          "rounded-[10px] bg-white text_primary border border-[#21CD9D] poppins_medium text-xs sm:text-base md:text-lg w-full py-2 md:py-3",
      },
    ],
  };

  const priceOptions = ["$20k", "$21k", "$22k", "$23k"];

  // Function to open gallery modal
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setGalleryVisible(true);
  };

  return (
    <main className="bg_mainsecondary p-2 md:py-4">
      <TopSection
        title={"Good morning, Adnan"}
        description={"Here are your auctions whom you can join."}
        button={button}
      />

      <Container className="bg_mainsecondary rounded-[9px] mt-4 px-0">
        <Row className="g-2">
          {/* Column 1 - Main images */}
          <Col md="7" lg="4" className="h-full">
            <div className="flex flex-col h-full" style={{ minHeight: '500px' }}>
              {imageLayout.col1Images.length > 0 && (
                <>
                  {imageLayout.col1Images.length === 1 ? (
                    // Single image fills the whole column
                    <div className="bg_white rounded-[10px] mb-2 flex-grow">
                      <Image
                        src={imageLayout.col1Images[0]}
                        className="w-full h-full object-cover rounded-[10px]"
                        alt="auction item"
                        width={500}
                        height={300}
                        onClick={() => openGallery(0)}
                      />
                    </div>
                  ) : (
                    // Multiple images with different layouts
                    <>
                      <div className="bg_white rounded-[10px] mb-2 flex-1">
                        <Image
                          src={imageLayout.col1Images[0]}
                          className="w-full h-full object-cover rounded-[10px]"
                          alt="auction item"
                          width={500}
                          height={300}
                          onClick={() => openGallery(0)}
                        />
                      </div>
                      <div className="flex gap-2 flex-1">
                        {imageLayout.col1Images.length > 1 && (
                          <div className="flex-1">
                            <Image
                              src={imageLayout.col1Images[1]}
                              alt="auction item"
                              width={250}
                              height={150}
                              onClick={() => openGallery(1)}
                              className="w-full h-full object-cover rounded-[10px]"
                            />
                          </div>
                        )}
                        {imageLayout.col1Images.length > 2 && (
                          <div className="flex flex-col gap-2 flex-1">
                            {imageLayout.col1Images.slice(2).map((img, index) => (
                              <div key={index} className="relative flex-1">
                                <Image
                                  src={img}
                                  alt="auction item"
                                  width={250}
                                  height={75}
                                  className="w-full h-full object-cover rounded-[10px]"
                                  onClick={() => openGallery(index + 2)}
                                />
                                {/* See All button overlay */}
                                {imageLayout.showSeeAll &&
                                  index ===
                                    imageLayout.col1Images.slice(2).length -
                                      1 && (
                                    <div
                                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[10px] cursor-pointer"
                                      onClick={() => openGallery(0)}
                                    >
                                      <p className="text-white font-medium text-lg">
                                        See All ({imageLayout.totalImages})
                                      </p>
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Col>

          {/* Column 2 - Secondary image */}
          <Col md="5" lg="3" className="h-full">
            <div className="min-h-[600px]">
              {imageLayout.col2Images.length > 0 ? (
                <div className="bg_white rounded-[10px] w-full min-h-[600px]">
                  {console.log("runs")}
                  <div className="relative w-full h-full">
                    <Image
                      src={imageLayout.col2Images[0]}
                      alt="auction item"
                      className="object-cover rounded-[10px] min-h-[600px]"
                      fill
                      style={{ position: 'absolute' }}
                    />
                  </div>
                </div>
              ) : imageLayout.col1Images.length === 1 ? (
                <div className="hidden"></div>
              ) : (
                <>
                <div className="bg_white rounded-[10px] w-full h-full opacity-0"></div>
                </>
              )}
            </div>
          </Col>

          {/* Column 3 - Auction details (unchanged) */}
          <Col
            md="12"
            lg="5"
            className="bg_white p-2 md:p-4 rounded-lg d-flex flex-column gap-3"
          >
            <div className="bg_primary pt-2 py-10 px-3 sm:px-6 rounded-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="poppins_medium text-xl sm:text-2xl text-white mb-0">
                    {item?.title || "Fortuner new model car"}
                  </p>
                  <p className="poppins_regular text-sm text-white mb-0">
                    classic car auction
                  </p>
                </div>
                <div className="mb-0">
                  <ChevronRight className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="w-[90%] mx-auto relative -mt-10 mb-11">
              <Row className="py-4 bg-[#F3F2F2] rounded-[10px]">
                <Col sm="6" className="border-r border-gray-300 pr-4">
                  <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                    Starting price
                  </p>
                  <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                    $5000
                  </p>
                  <div className="flex items-center justify-start mb-2 md:mb-0  mt-2 gap-2">
                    <Avatar.Group
                      size="default"
                      max={{
                        count: 4,
                        style: {
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        },
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((user) => (
                        <Avatar
                          key={user}
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
                        />
                      ))}
                    </Avatar.Group>
                    <p className="poppins_regular text-[15px] text-[#1C201F]">
                      are live
                    </p>
                  </div>
                </Col>

                <Col sm="6" className="pl-4">
                  <p className="text-[#1B212C] mb-0 text-base sm:text-lg poppins_semibold capitalize">
                    Current Bid Price
                  </p>
                  <p className="text-[#1B212C] mb-0 text-xs sm:text-sm poppins_regular capitalize">
                    $24,500
                  </p>
                  <p className="text-[#1B212C] mb-0 mt-2 text-[15px] poppins_regular capitalize flex items-center justify-start gap-2">
                    {<FaRegClock size={"18"} color="#1C201F" />} 01: 23s
                    remaining
                  </p>
                </Col>
              </Row>
            </div>
            <Row className="px-6 items-center">
              <Col xs="8" sm="6" className="">
                <div className="flex items-center justify-start">
                  {<TbLivePhoto size={20} />}
                  <p className="capitalize poppins_semibold text-lg mb-0">
                    Live Auction
                  </p>
                </div>
              </Col>
              <Col xs="4" sm="6">
                <p className="capitalize poppins_regular text-[14px] text-end mb-0">
                  14 Bids made
                </p>
              </Col>
            </Row>
            {bidders.map((bid) => (
              <Row className="px-6 mt-7" key={bid?.id}>
                <Col md="6" className="">
                  <div className="flex items-center justify-start gap-3">
                    <Image
                      src={bid?.avatar}
                      className="w-9 h-9 rounded-full"
                      alt="bidder avatar"
                      width={36}
                      height={36}
                    />
                    <div className="">
                      <p className="poppins_regular text-base text_dark">
                        {bid?.name}
                      </p>
                      <p className="poppins_regular text-sm text_lightsecondary">
                        {bid?.timeAgo}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <p className="capitalize poppins_regular text-[14px] text-end">
                    {bid?.bid}
                  </p>
                </Col>
              </Row>
            ))}
            <Row className="">
              <div className="w-[90%] mx-auto relative mt-4 mb-11 bg-[#F3F2F2] rounded-[10px]">
                <Row className="pt-4 ">
                  <Col md="12">
                    <div className="flex justify-evenly items-center gap-2 overflow-auto">
                      {priceOptions.map((price) => (
                        <button
                          key={price}
                          className={`py-1 px-3 rounded-md poppins_regular whitespace-nowrap text-sm ${
                            activeButton === price
                              ? "border border-black bg_dark text-white"
                              : "border border-[#BDBDBD] text_dark"
                          }`}
                          onClick={() => setActiveButton(price)}
                        >
                          {price}
                        </button>
                      ))}
                      <button
                        className={`py-1 px-3 poppins_regular rounded-md text-sm whitespace-nowrap ${
                          activeButton === "custom"
                            ? "border border-black bg_dark text-white"
                            : "border border_dark text_dark"
                        }`}
                        onClick={() => setActiveButton("custom")}
                      >
                        Use Custom Bid
                      </button>
                    </div>
                  </Col>
                  {activeButton === "custom" ? (
                    <Col md="12">
                      <div className="flex items-center justify-start gap-3 overflow-auto">
                        <input
                          placeholder="e.g 45000"
                          className="text-center py-2 md:py-4 my-3 rounded-2xl poppins_semibold text-[14px] bg-transparent border-[1px] border-[21CD9D] text_primary md:flex md:flex-grow"
                        />
                        <button
                          className="bg_primary flex items-center justify-center rounded-2xl p-2 md:p-4"
                          onClick={() => setOpenBiddingConfirmationModal(true)}
                        >
                          {<Check size={24} className="text_white" />}
                        </button>
                        <button
                          className="bg_white flex items-center justify-center rounded-2xl p-2 :p-4"
                          onClick={() => setActiveButton("")}
                        >
                          {<X size={24} className="text_primary" />}
                        </button>
                      </div>
                    </Col>
                  ) : (
                    <Col md="12">
                      <button
                        className="capitalize py-2 py-md-3 my-3 poppins_medium bg_primary w-full text-white rounded-lg"
                        onClick={() => setOpenBiddingConfirmationModal(true)}
                      >
                        Place Bid For $25
                      </button>
                    </Col>
                  )}
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Image Gallery Modal */}
      <Modal
        visible={galleryVisible}
        onCancel={() => setGalleryVisible(false)}
        footer={null}
        width="80%"
        centered
        bodyStyle={{ padding: 0 }}
        className="image-gallery-modal"
      >
        <Swiper
          initialSlide={currentImageIndex}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-96 flex items-center justify-center bg-black">
                <Image
                  src={image}
                  alt={`Auction image ${index + 1}`}
                  className="max-h-full object-contain"
                  width={800}
                  height={600}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>

      <AuctionConfirmationModal
        openModal={openBiddingConfirmationModal}
        setOpenModal={setOpenBiddingConfirmationModal}
        item={confirmationItem}
      />
    </main>
  );
}