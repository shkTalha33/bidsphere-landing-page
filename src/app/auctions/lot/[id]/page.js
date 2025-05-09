/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { getAuctionLot } from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import { avataruser, confirmBid, winBid } from "@/components/assets/icons/icon";
import AuctionConfirmationModal from "@/components/common/auctionConfirmationModal";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import { Avatar } from "antd";
import debounce from "debounce";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Heart, Maximize2, X } from "react-feather";
import { FaRegClock } from "react-icons/fa6";
import { TbLivePhoto } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
import { useSocket } from "@/components/socketProvider/socketProvider";

export default function Page() {
  const { get, userData } = ApiFunction();
  const [openBiddingConfirmationModal, setOpenBiddingConfirmationModal] =
    useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { formatPrice, convert } = useCurrency();
  const [currentLot, setCurrentLot] = useState(null);
  const { id } = useParams();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const confirmationItem = {
    title: "Confirm Bid",
    description:
      "You have placed a bid for $35,000. Should we place this as your Bid?",
    image: confirmBid,
    buttons: [
      {
        btnText: "Yes, Place My Bid",
        // onClick: () => router.push("/auctions/registration"),
        className:
          "rounded-[10px] bg_primary text-white poppins_medium text-xs sm:text-base md:text-lg border border-[#660000] w-full py-2 md:py-3",
      },
      {
        btnText: "Cancel",
        onClick: () => setOpenBiddingConfirmationModal(false),
        className:
          "rounded-[10px] bg-white text_primary border border-[#660000] poppins_medium text-xs sm:text-base md:text-lg w-full py-2 md:py-3",
      },
    ],
  };

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setPreviewModal(true);
  };

  const fetchAuctionDetail = () => {
    get(`${getAuctionLot}${id}`)
      .then((result) => {
        if (result?.success) {
          setCurrentLot(result?.lot);
        }
        setLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchAuctionDetail();
    }
  }, []);

  useEffect(() => {
    if (currentLot?.images?.length > 0) {
      setSelectedImage(currentLot.images[0]);
    }
  }, [currentLot]);

  return (
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
            description={"Here are your auctions whom you can join."}
            button={""}
          />
          <Container className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0">
            <Row className="g-3 h-full">
              <Col md="4" lg="2" className="flex md:flex-column ">
                <div className="flex md:flex-col gap-3 h-100 max-h-[700px] w-full overflow-y-auto">
                  {currentLot?.images?.map((image, index) => (
                    <div
                      key={index}
                      className="w-full md:w-full md:flex-grow-0 flex-shrink-0 h-[120px] mb-2"
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

              <Col md="8" lg="5" className="d-flex">
                <div
                  className="relative bg_white rounded-[10px] w-100 h-100 flex items-center justify-center cursor-pointer group overflow-hidden max-h-[700px]"
                  onClick={() => handleImagePreview(selectedImage)}
                >
                  {/* <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(10px)", // Blur effect only on background
                    }}
                  ></div> */}

                  {/* Sharp Image */}
                  <div className="relative z-10 p-3">
                    {selectedImage && (
                      <Image
                        src={selectedImage}
                        width={600}
                        height={400}
                        quality={100}
                        className="rounded-[10px] object-contain"
                        alt="auction item preview"
                      />
                    )}
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
                        {currentLot?.name}
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
                        Lot Price
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {formatPrice(convert(currentLot?.price, "LBP"))}
                      </p>
                    </Col>
                    <Col sm="6" className=" px-4">
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Lot Status
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {currentLot?.status}
                      </p>
                    </Col>
                    <Col sm="6" className="border-r border-gray-300 px-4">
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Category
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {currentLot?.category?.name}
                      </p>
                    </Col>
                    <Col sm="6" className=" px-4">
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Category Status
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {currentLot?.category?.status}
                      </p>
                    </Col>
                    <Col sm="12" className=" px-4">
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Lot Description
                      </p>
                      <div className="poppins_regular abDatadi">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: currentLot?.additionalinfo,
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

      {/* Modals */}
      <AuctionConfirmationModal
        openModal={openBiddingConfirmationModal}
        setOpenModal={setOpenBiddingConfirmationModal}
        item={confirmationItem}
      />

      {/* Image Preview Modal */}
      <Modal
        isOpen={previewModal}
        toggle={() => setPreviewModal(!previewModal)}
        size="lg"
        centered
        contentClassName="bg-transparent border-0"
      >
        <ModalBody className="p-0">
          <div className="relative">
            <button
              className="absolute top-4 right-4 bg-black/70 hover:bg-black rounded-full p-2 z-10 transition-colors duration-300"
              onClick={() => setPreviewModal(false)}
            >
              <X className="text-white" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                width={1200}
                height={800}
                className="w-full h-full !object-contain"
                alt="Preview"
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </main>
  );
}
