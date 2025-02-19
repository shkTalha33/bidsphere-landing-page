/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
"use client";
import {
  avataruser,
  car1,
  car2,
  car3,
  car4,
  car5,
  confirmBid,
  winBid,
} from "@/components/assets/icons/icon";
import AuctionConfirmationModal from "@/components/common/auctionConfirmationModal";
import TopSection from "@/components/common/TopSection";
import { Avatar } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronRight, Heart, X } from "react-feather";
import { FaRegClock } from "react-icons/fa6";
import { TbLivePhoto } from "react-icons/tb";
import { Col, Container, Row } from "reactstrap";

export default function Page() {
  const [activeButton, setActiveButton] = useState("custom");
  const [openModal, setOpenModal] = useState(false);
  const [openWinBidModal, setOpenWinBidModal] = useState(false);
  const [openBiddingConfirmationModal, setOpenBiddingConfirmationModal] =
    useState(false);

  const router = useRouter();

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

  const selectedItem = {
    image: car1,
    title: "Fortuner new model car",
    description: `Etiam senectus integer pharetra tempor lacinia ut. Magna dolor sed ut amet, adipiscing nunc. Nec morbi dolor, adipiscing lacus, tortor magna gravida sem. Lacus, praesent nibh mattis quam id ultrices. Scelerisque amet elementum pulvinar cum sit. Fusce et justo quam purus viverra vitae. Est, felis nunc nunc, placerat ultrices et porttitor. Lobortis feugiat neque luctus odio pulvinar dui sit tempus. Vulputate ac et nisl, malesuada aliquam tellus vestibulum congue quam. Lobortis sapien, et amet, id interdum bibendum aliquet faucibus.
Orci, non sit tempus pellentesque nunc. Ac neque, sagittis cursus nec eu. At interdum condimentum purus sem vitae elementum quis neque. Tincidunt
Etiam senectus integer pharetra tempor lacinia ut. Magna dolor sed ut amet, adipiscing nunc. Nec morbi dolor, adipiscing lacus, tortor magna gravida sem. Lacus, praesent nibh mattis quam id ultrices. Scelerisque amet elementum pulvinar cum sit. Fusce et justo quam purus viverra vitae. Est, felis nunc nunc, placerat ultrices et porttitor. Lobortis feugiat neque luctus odio pulvinar dui sit tempus. Vulputate ac et nisl, malesuada aliquam tellus vestibulum congue quam. Lobortis sapien, et amet, id interdum bibendum aliquet faucibus.
Orci, non sit tempus pellentesque nunc. Ac neque, sagittis cursus nec eu. At interdum condimentum purus sem vitae elementum quis neque. Tincidunt..
Orci, non sit tempus pellentesque nunc. Ac neque, sagittis cursus nec eu. At interdum condimentum purus sem vitae elementum quis neque. Tincidunt..`,
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

  return (
    <main className="bg_mainsecondary p-2  md:py-4">
      <TopSection
        title={"Good morning, Adnan"}
        description={"Here are your auctions whom you can join."}
        button={button}
      />

      <Container className="bg_mainsecondary rounded-[9px] mt-4 px-0">
        <Row className="g-2">
          {/* First Column */}
          <Col md="7" lg="4" className="h-full flex flex-col">
            <div className="bg_white rounded-[10px] mb-2 flex-grow">
              <Image
                src={car1}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
              />
            </div>
            <div className="flex gap-2 flex-grow">
              <div className="flex-1">
                <Image
                  src={car4}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Image
                  src={car2}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
                <Image
                  src={car3}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                />
              </div>
            </div>
          </Col>

          {/* Second Column */}
          <Col md="5" lg="3" className="h-full flex">
            <div className="bg_white rounded-[10px] w-full flex-grow">
              <Image
                src={car5}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
              />
            </div>
          </Col>

          {/* Third Column */}
          <Col
            md="12"
            lg="5"
            className="bg_white p-2 md:p-4 rounded-lg d-flex flex-column gap-3"
          >
            <div className="bg_primary pt-2 py-10 px-3 sm:px-6 rounded-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="poppins_medium text-xl sm:text-2xl text-white mb-0">
                    Fortuner new model car
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
                      {[1, 2, 3, 4, 5, 6, 7].map((user) => {
                        return (
                          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
                        );
                      })}
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
            {bidders.map((bid, index) => {
              return (
                <Row className="px-6 mt-7" key={bid?.id}>
                  <Col md="6" className="">
                    <div className="flex items-center justify-start gap-3">
                      <Image
                        src={bid?.avatar}
                        className="w-9 h-9 rounded-full"
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
              );
            })}
            <Row className="">
              <div className="w-[90%] mx-auto relative mt-4 mb-11 bg-[#F3F2F2] rounded-[10px]">
                <Row className="pt-4 ">
                  <Col md="12">
                    <div className="flex justify-evenly items-center gap-2 overflow-auto">
                      {priceOptions.map((price) => {
                        return (
                          <button
                            className={`py-1 px-3 rounded-md poppins_regular whitespace-nowrap text-sm  ${
                              activeButton === price
                                ? "border border-black bg_dark text-white"
                                : "border border-[#BDBDBD] text_dark"
                            }`}
                            onClick={() => setActiveButton(price)}
                          >
                            {price}
                          </button>
                        );
                      })}
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
                          className="text-center py-2  md:py-4 my-3 rounded-2xl poppins_semibold text-[14px] bg-transparent border-[1px] border-[21CD9D] text_primary md:flex md:flex-grow"
                        />
                        <button
                          className="bg_primary flex items-center justify-center rounded-2xl p-2 md:p-4"
                          // onClick={() => setOpenModal(true)}
                          // onClick={() => setOpenBiddingConfirmationModal(true)}
                          onClick={() => setOpenBiddingConfirmationModal(true)}
                        >
                          {<Check size={24} className="text_white" />}
                        </button>
                        {console.log("openModal", openModal)}
                        <button
                          className="bg_white flex items-center justify-center rounded-2xl p-2 md:p-4"
                          onClick={() => setActiveButton("")}
                        >
                          {<X size={24} className="text_primary" />}
                        </button>
                      </div>
                    </Col>
                  ) : (
                    <Col md="12">
                      <button
                        className="capitalize py-2 md:py-3 my-3 poppins_medium bg_primary w-full text-white rounded-lg"
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
      {/* <AuctionItemDetailModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={selectedItem}
      /> */}
      <AuctionConfirmationModal
        openModal={openBiddingConfirmationModal}
        setOpenModal={setOpenBiddingConfirmationModal}
        item={confirmationItem}
      />
      {/* <AuctionConfirmationModal
        openModal={openWinBidModal}
        setOpenModal={setOpenWinBidModal}
        item={winBidItem}
      /> */}
    </main>
  );
}
