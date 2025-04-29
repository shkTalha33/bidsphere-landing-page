/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { getAuctionLot, getLiveChat } from "@/components/api/ApiFile";
import TopSection from "@/components/common/TopSection";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useSocket } from "@/components/socketProvider/socketProvider";
import { TiArrowBack } from "react-icons/ti";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ChatBox from "./ChatBox";
import { IoMdSend } from "react-icons/io";
import { Skeleton } from "antd";
import Image from "next/image";
import { ChevronRight, Maximize2 } from "react-feather";
import useCurrency from "@/components/hooks/useCurrency";

export default function Page() {
  const { get, userData } = ApiFunction();
  const token = useSelector((state) => state.auth?.accessToken);
  const socket = useSocket();
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [chatMessage, setChatMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auctionData, setAuctionData] = useState({});
  const { formatPrice, convert } = useCurrency();
  const schema = yup.object().shape({
    message: yup.string().trim().required("Message is required"),
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  //   get chat auction data

  const handleChatGet = () => {
    setLoading(true);
    const api = `${getLiveChat}/${id}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.messages?.length > 0) {
          setChatMessage([...res?.messages].reverse());
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleChatGet();
    }
  }, [id]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // real-time validation
    resolver: yupResolver(schema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data) => {
    const message = data?.message.trim();
    if (!message) return;
    socket.emit("send-message", {
      auction: id,
      message: message,
    });
    reset();
  };

  useEffect(() => {
    if (!socket?.connected) return;
    socket.emit("join_auction", id, (response) => {
      if (response?.success) {
        const matchedLot = response?.auction?.lots.find(
          (lot) => lot?.item?._id === response?.auction?.current_lot
        );
        setAuctionData(matchedLot || null);
      }
    });

    socket.on("new-chat", (data) => {
      setChatMessage((prevMessages) => [...prevMessages, data?.msg]);
    });

    return () => {
      socket.off("new-chat");
      socket.off("join_auction");
    };
  }, [socket]);

  const backnavi = () => {
    router.push(`/auctions/auction-join/${id}`);
  };
  const button = {
    icon: <TiArrowBack className="w-5 h-5 mr-2 text-yellow-300" />,
    text: "Back",
    onClick: backnavi,
    className:
      "bg-gradient-to-r w-fit flex from-[#660000] via-[#800000] to-[#990000] text-white font-semibold px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300",
  };

  return (
    <main className="bg_mainsecondary p-2 md:py-4">
      <>
        <TopSection
                title={`${getGreeting()}, ${userData?.fname || ""} ${userData?.lname || ""}`}
          description={
            "you can do the live chat between the auctioneer and bidders."
          }
          button={button}
        />

        <Container className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0">
          {loading ? (
            <>
              <div className="flex justify-center items-center h-[50vh]">
                <Skeleton active />
              </div>
            </>
          ) : (
            <>
              <Row className="g-3 h-full">
                <Col
                  sm={12}
                  md={8}
                  lg={6}
                  xl={8}
                  className="d-flex flex-column"
                >
                  <div
                    className="flex-grow-1 overflow-auto border rounded mb-1 relative"
                    style={{ background: "#f9f9f9" }}
                  >
                    <div className="absolute inset-0 bg_primary w-full h-fit z-40 p-2">
                      <div className="flex items-center ms-4 gap-2">
                        <div className=" w-[3rem] h-[3rem]">
                          <img
                            className="rounded-[50%] object-cover w-[100%] h-[100%]"
                            alt=""
                            src={auctionData?.item?.images[0]}
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-[1.2rem] poppins_medium">
                            {auctionData?.item?.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <ChatBox
                      messages={chatMessage}
                      userData={userData}
                      setChatMessage={setChatMessage}
                      id={id}
                    />
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex gap-2"
                  >
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        placeholder="Enter your message"
                        {...register("message")}
                        className={`form-control h-[3.5rem] ${
                          errors.message ? "is-invalid" : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="invalid-feedback">
                          {errors.message.message}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      disabled={!isValid}
                      style={{
                        background: "#660000",
                        color: "white",
                      }}
                    >
                      <IoMdSend className="text-[1.2rem]" />
                    </button>
                  </form>
                </Col>

                <Col
                  md={4}
                  lg={6}
                  xl={4}
                  className="bg_white max-[767px]:!hidden p-3 md:p-4 rounded-lg d-flex flex-column max-h-[700px] overflow-y-auto"
                >
                  <h5 className="text-[1.5rem] poppins_medium mb-3">
                    Lot Details
                  </h5>
                  {auctionData?.item?.images?.map((image, index) => (
                    <div
                      key={index}
                      className="w-full md:w-full md:flex-grow-0 flex-shrink-0 h-[15rem] mb-2"
                    >
                      <div className="relative w-full h-full cursor-pointer group">
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
                  <section>
                    <div className="bg_primary pt-4 py-16 px-3 sm:px-6 rounded-xl relative">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="poppins_medium text-xl sm:text-2xl text-white mb-0 capitalize">
                            {auctionData?.item?.name}
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
                    <div className="bg-[#F3F2F2] mt-3 p-2 rounded-[10px]">
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Starting price
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {formatPrice(
                          convert(auctionData?.minprice || 0, "LBP")
                        )}
                      </p>
                    </div>
                  </section>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </>
    </main>
  );
}
