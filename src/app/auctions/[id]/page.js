/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { auctionDetail } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import { avataruser } from "@/components/assets/icons/icon";
import AuctionLots from "@/components/auction/auctionLots";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import { useSocket } from "@/components/socketProvider/socketProvider";
import { message } from "antd";
import { format } from "date-fns";
import debounce from "debounce";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Maximize2, Plus, X } from "react-feather";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
const AuctionDetailPage = () => {
  const router = useRouter();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const { get, userData } = ApiFunction();
  const { id } = useParams();
  const { formatPrice, convert } = useCurrency();
  const { t } = useTranslation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setPreviewModal(true);
  };

  const fetchAuctionDetail = () => {
    setLoading(true);
    get(`${auctionDetail}${id}`)
      .then((res) => {
        if (res?.success) {
          setItem(res?.auction);
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
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  const handleRegister = () => {
    const now = moment.utc();
    const startTime = moment.utc(item?.start_date);

    // if (item?.status === "active") {
    //   if (startTime.isBefore(now)) {
    //     toast.error("You can register once the admin starts the auction.");
    //   } else {
    //     toast.error(
    //       `You can register for this auction starting from ${startTime
    //         .local()
    //         .format("DD MMMM, YYYY h:mm A")}`
    //     );
    //   }
    //   return;
    // }

    if (userData) {
      router.push(`/auctions/${id}/registration`);
    } else {
      message.error("Please login to register the auction!");
    }
  };

  const handleJoin = () => {
    if (userData) {
      router.push(`/auctions/auction-join/${id}`);
    } else {
      message.error("Please login to join the auction!");
    }
  };

  const isRegister = !item?.applications || item?.applications?.length === 0;
  const [isExpired, setIsExpired] = useState(false);
  const isActive = item?.status === "active";

  
  const button = {
    icon: <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />,
    text: isRegister ? "Register Auction" : "Join Auction",
    onClick: isRegister ? handleRegister : handleJoin,

    className:
      "h-8 shadow md:h-10 bg_primary text-white rounded-[10px] px-[1rem] w-fit flex items-center justify-center",
  };
  console.log(item, "item");

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
            // button={button}
            // {...(item?.status === "start" && !isExpired && { button })}
            // {...(!isExpired && { button })}
            {...{ button }}
          />

          <Container className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0">
            <Row className="g-3 h-full">
              <Col md="4" lg="2" className="flex md:flex-column ">
                <div className="flex md:flex-col gap-3 h-100 max-h-[700px] w-full overflow-y-auto">
                  {item?.images?.map((image, index) => (
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
                  className="relative bg_white rounded-[10px] w-100 h-100 flex items-center justify-center cursor-pointer group overflow-hidden !h-[500px]"
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
                  <div className="relative z-10">
                    {selectedImage && (
                      <Image
                        src={selectedImage}
                        width={600}
                        height={600}
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
                className="bg_white p-3 rounded-lg d-flex flex-column max-h-[700px] overflow-y-auto"
              >
                <Row>
                  <Col md="12">
                    <div className="py-2 rounded-xl relative">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="poppins_medium text-xl sm:text-2xl  mb-0 capitalize">
                            {item?.name}
                          </p>
                          <p className="poppins_regular text-sm  mb-0 capitalize">
                            {item?.category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 mt-3">
                  <Col md="6">
                    <div className="poppins_medium text-base text-[#8B0000]">
                      Category
                    </div>
                    <div className="poppins_regular text-sm inline-block mt-2 px-3 py-1 border border-black-300 rounded-full  text-black">
                      {item?.category?.name}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="poppins_medium text-base text-[#8B0000]">
                      Sub Category
                    </div>
                    <div className="poppins_regular text-sm inline-block mt-2 px-3 py-1 border border-black-300 rounded-full  text-black">
                      {item?.subcategory?.title}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 mt-3">
                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      {t("auctionDetails.heading")}
                    </div>
                    <div className="poppins_regular text-sm">
                      {moment
                        .utc(item?.start_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      {t("auctionDetails.heading2")}
                    </div>
                    <div className="poppins_regular text-sm">
                      {moment
                        .utc(item?.end_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 ">
                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      {t("auctionDetails.heading3")}
                    </div>
                    <div className="poppins_regular">
                      {formatPrice(convert(item?.depositamount, "LYD"))}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      Status
                    </div>
                    <div className="poppins_regular">{item?.status}</div>
                  </Col>
                </Row>
                <Row className="justify-center my-2">
                  <Col md="12">
                    <div className="poppins_medium text-[1.2rem] text-black">
                      {t("auctionDetails.heading4")}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="poppins_regular abDatadi text_dark">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.additionalinfo,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container>
            <div>
              <p className="poppins_medium text-2xl mb-0 ">
                {t("auctionDetails.heading5")}({item?.lots?.length})
              </p>
            </div>
          </Container>
          <AuctionLots loading={loading} items={item} />
          <div className="opacity-0">
            <CountdownTimer
              startDate={item?.start_date}
              endDate={item?.end_date}
              onExpire={() => setIsExpired(true)}
            />
          </div>
        </>
      )}

      {/* Modals */}
      {/* <AuctionConfirmationModal
      openModal={openBiddingConfirmationModal}
      setOpenModal={setOpenBiddingConfirmationModal}
      item={confirmationItem}
    /> */}

      {/* Image Preview Modal */}
      <Modal
        isOpen={previewModal}
        toggle={() => setPreviewModal(!previewModal)}
        size="lg"
        centered
        contentClassName="bg-transparent border-0"
      >
        <ModalBody className="p-0 flex items-center justify-center">
          <div className="relative !max-w-[90vw] !max-h-[90vh]">
            <button
              className="absolute top-4 right-5 bg-black/70 hover:bg-black rounded-full p-2 z-10 transition-colors duration-300"
              onClick={() => setPreviewModal(false)}
            >
              <X className="text-white" />
            </button>
            <div className="flex items-center justify-center">
              <Image
                src={selectedImage}
                width={1200}
                height={600}
                className="w-full h-full !object-contain"
                alt="Preview"
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </main>
  );
};

export default AuctionDetailPage;
