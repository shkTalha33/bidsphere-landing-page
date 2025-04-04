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
import AuctionTimer from "@/components/AuctionTimer/AuctionTimer";

export default function Page() {
  const { get, userData } = ApiFunction();
  const [activeButton, setActiveButton] = useState("custom");
  const [openWinBidModal, setOpenWinBidModal] = useState(false);
  const [openBiddingConfirmationModal, setOpenBiddingConfirmationModal] =
    useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { formatPrice, convert } = useCurrency();
  const [currentLot, setCurrentLot] = useState(null);
  const [recentBids, setRecentBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [participants, setParticipants] = useState([]);
  const [auctionData, setAuctionData] = useState("");
  const token = useSelector((state) => state.auth?.accessToken);
  const socket = useSocket();
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const [selectedImage, setSelectedImage] = useState(null);

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
        // onClick: () => router.push("/auctions/registration"),
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

  const winBidItem = {
    title: "win the bid",
    description: "You have won the bid of 3500$",
    image: winBid,
    buttons: [
      {
        btnText: "okay",
        onClick: () => setOpenWinBidModal(false),
        className:
          "rounded-[10px] bg_primary text-white poppins_medium text-lg border border-[#21CD9D] w-full py-3",
      },
    ],
  };

  const priceOptions = ["$20k", "$21k", "$22k", "$23k"];

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setPreviewModal(true);
  };
  useEffect(() => {
    if (currentLot?.item?.images?.length > 0) {
      setSelectedImage(currentLot?.item?.images[0]);
    }
  }, [currentLot]);

  // console.log(participants, "participants");
  // console.log(recentBids, "recentBids");
  // console.log(socket, "socket");
  // console.log(currentLot, "currentLot");
  // console.log(auctionData, "auctionData");

  useEffect(() => {
    if (socket?.connected) {
      socket.emit("authenticate", token);
      // Join the auction
      socket.emit("join_auction", id, (response) => {
        if (response?.success) {
          const matchedLot = response?.auction?.lots.find(
            (lot) => lot?.item?._id === response?.auction?.current_lot
          );
          // Set matching lot in state
          setCurrentLot(matchedLot || null);
          setRecentBids(response?.lastBids);
        }
      });

      // Listen for new bids
      socket.on("new_bid", (data) => {
        const newBid = data?.bid;
        if (!newBid) return;
        setRecentBids((prevBids) => [newBid]?.concat(prevBids));
      });

      // Listen for auction updates
      socket.on("auction", (data) => {
        setAuctionData(data?.auction);
      });

      // Listen for participant updates
      socket.on("user_joined", ({ user }) => {
        setParticipants((prev) => {
          const isUserExists = prev.some(
            (participant) => participant?._id === user?._id
          );
          return isUserExists ? prev : [...prev, user];
        });
      });

      return () => {
        socket.off("new_bid");
        socket.off("auction");
        socket.off("user_joined");
      };
    }
  }, [socket]);

  // current remaining time

  // console.log(currentLot, "currentLot");

  const placeBid = () => {
    if (!bidAmount) return;
    socket.emit(
      "place_bid",
      { id, lotId: currentLot?._id, bidAmount },
      (response) => {
        if (!response.success) {
          alert(response.message);
        } else {
          setBidAmount("");
        }
      }
    );
  };

  // console.log(currentLot, "iet");

  return (
    <main className="bg_mainsecondary p-2 md:py-4">
      {/* {loading ? (
        <div className="min-h-[100vh] flex items-center justify-center">
          {" "}
          <HashLoader color="#21CD9D" size={25} />{" "}
        </div>
      ) : (
      
      )} */}

      <>
        <TopSection
          title={`${getGreeting()}, ${userData?.fname} ${userData?.lname}`}
          description={"Here are your auctions whom you can join."}
          // button={button}
        />
        <Container className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0">
          <Row className="g-3 h-full">
            <Col md="4" lg="2" className="flex md:flex-column ">
              <div className="flex md:flex-col gap-3 h-100 max-h-[700px] w-full overflow-y-auto">
                {currentLot?.item?.images?.map((image, index) => (
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
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(10px)", // Blur effect only on background
                  }}
                ></div>

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
              <div className="bg_primary pt-4 py-16 px-3 sm:px-6 rounded-xl relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="poppins_medium text-xl sm:text-2xl text-white mb-0 capitalize">
                      {currentLot?.item?.name}
                    </p>
                    <p className="poppins_regular text-sm text-white mb-0 capitalize">
                      Auction
                    </p>
                  </div>
                  <div className="mb-0">
                    <ChevronRight className="text-white text-2xl" />
                  </div>
                </div>
              </div>

              {/* Price and Bidding Status Section */}
              <div className="w-[90%] mx-auto relative -mt-10 mb-6">
                <Row className="py-4 bg-[#F3F2F2] rounded-[10px] mx-0">
                  <Col sm="6" className="border-r border-gray-300 px-4">
                    <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                      Starting price
                    </p>
                    <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                      {formatPrice(convert(currentLot?.minprice || 0, "LBP"))}
                    </p>
                    <div className="flex items-center justify-start mb-2 md:mb-0 mt-2 gap-2">
                      <Avatar.Group
                        size="default"
                        maxCount={4}
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                      >
                        {participants?.map((user, index) => {
                          return (
                            <Image
                              src={user?.profilepicture || avataruser}
                              alt=""
                              key={index}
                              className="rounded-full w-[2rem] h-[2rem]"
                            />
                          );
                        })}
                      </Avatar.Group>
                      <p className="poppins_regular text-[15px] text-[#1C201F] mb-0">
                        are live
                      </p>
                    </div>
                  </Col>

                  <Col sm="6" className="px-4">
                    <p className="text-[#1B212C] mb-0 text-base sm:text-lg poppins_semibold capitalize">
                      Current Bid Price
                    </p>
                    <p className="text-[#1B212C] mb-0 text-xs sm:text-sm poppins_regular capitalize">
                      {formatPrice(convert(recentBids?.[0]?.price || 0, "LBP"))}
                    </p>
                    <p className="text-[#1B212C] mb-0 mt-2 text-[15px] poppins_regular capitalize flex items-center justify-start gap-2">
                      {/* <AuctionTimer
                        startDate={auctionData?.start_date}
                        endDate={auctionData?.end_date}
                      /> */}
                    </p>
                  </Col>
                </Row>
              </div>

              {/* Live Auction Header */}
              <Row className="px-6 items-center mx-0">
                <Col xs="8" sm="6" className="px-0">
                  <div className="flex items-center justify-start gap-2">
                    <TbLivePhoto size={20} />
                    <p className="capitalize poppins_semibold text-lg mb-0">
                      Live Auction
                    </p>
                  </div>
                </Col>
                <Col xs="4" sm="6" className="px-0">
                  <p className="capitalize poppins_regular text-[14px] text-end mb-0">
                    {recentBids?.length} Bids made
                  </p>
                </Col>
              </Row>

              {/* Bidders List */}

              <div className="space-y-4 w-[90%] mx-auto mt-3 mb-3 max-h-[15rem] h-auto overflow-auto flex-grow">
                {recentBids?.map((bid) => (
                  <div
                    key={bid?._id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-dark font-semibold text-lg">
                        {bid?.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="poppins_regular text-base text_dark mb-0">
                          {bid?.name}
                        </p>
                      </div>
                    </div>
                    <p className="capitalize poppins_regular text-[14px] text-end mb-0">
                      {formatPrice(convert(bid?.price || 0, "LBP"))}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bidding Controls */}
              <div className="w-[90%] mx-auto mt-auto bg-[#F3F2F2] rounded-[10px] p-4">
                {/* Bid Amount Options */}
                <div className="flex justify-evenly items-center gap-2 overflow-auto pb-3">
                  {priceOptions?.map((price) => (
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
                        : "border border-[#BDBDBD] text_dark"
                    }`}
                    onClick={() => setActiveButton("custom")}
                  >
                    Use Custom Bid
                  </button>
                </div>

                {/* Custom Bid Input or Bid Button */}
                {activeButton === "custom" ? (
                  <div className="flex items-center justify-start gap-3 mt-3">
                    <input
                      placeholder="e.g 45000"
                      className="text-center py-2 md:py-3 rounded-2xl poppins_semibold text-[14px] bg-transparent border border-[#21CD9D] text_primary flex-grow"
                    />
                    <button
                      className="bg_primary flex items-center justify-center rounded-2xl p-2 md:p-3"
                      onClick={() => setOpenBiddingConfirmationModal(true)}
                    >
                      <Check size={24} className="text-white" />
                    </button>
                    <button
                      className="bg_white flex items-center justify-center rounded-2xl p-2 md:p-3 border border-[#21CD9D]"
                      onClick={() => setActiveButton("")}
                    >
                      <X size={24} className="text_primary" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="capitalize py-2 md:py-3 mt-3 poppins_medium bg_primary w-full text-white rounded-lg"
                    onClick={() => setOpenBiddingConfirmationModal(true)}
                  >
                    Place Bid For $25k
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </>

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
