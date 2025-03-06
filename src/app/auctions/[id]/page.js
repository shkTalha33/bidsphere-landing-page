"use client";
import { auctionDetail } from "@/components/api/ApiRoutesFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import { avataruser } from "@/components/assets/icons/icon";
import AuctionLots from "@/components/auction/auctionLots";
import TopSection from "@/components/common/TopSection";
import { formatPrice } from "@/components/utils/formatPrice";
import { format } from "date-fns";
import debounce from "debounce";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Maximize2, X } from "react-feather";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";

const AuctionDetailPage = () => {
  const router = useRouter();
  const [isShowAll, setIsShowAll] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [activeButton, setActiveButton] = useState("custom");
  const selectedData = useSelector(
    (state) => state?.auctionProduct?.auctionProductData
  );
  const { get } = ApiFunction();
  const { id } = useParams();

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

  const priceOptions = ["$20k", "$21k", "$22k", "$23k"];

  const handleShowAllFiles = () => {
    setSelectedFiles(selectedData?.images);
    setIsShowAll(false);
  };

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setPreviewModal(true);
  };

  const fetchAuctionDetail = debounce(async () => {
    setLoading(true);
    await get(`${auctionDetail}${id}`)
      .then((result) => {
        if (result?.success) {
          setItem(result?.auction);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    fetchAuctionDetail();
  }, []);

  useEffect(() => {
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  useEffect(() => {
    if (selectedData) {
      setSelectedFiles(selectedData?.images?.slice(0, 3) || []);
      setIsShowAll(true);
    }
  }, [selectedData]);

  const handleClick = () => {
    router.back();
  };

  // Format date for display

  const formatDate = (dateString) => {
    return dateString
      ? format(new Date(dateString), "dd-MM-yyyy HH:mm:ss")
      : "N/A";
  };

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return "$0.00";
    return `$${parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <main className="bg_mainsecondary p-2 md:py-4">
      {loading ? (
        <div className="min-h-[100vh] flex items-center justify-center">
          {" "}
          <HashLoader color="#21CD9D" size={25} />{" "}
        </div>
      ) : (
        <>
          <TopSection
            title={"Good morning, Adnan"}
            description={"Here are your auctions whom you can join."}
            // button={button}
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
                <Row className="">
                  <Col md="12">
                    <div className="bg_primary py-3 sm:px-6 rounded-xl relative">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="poppins_medium text-xl sm:text-2xl text-white mb-0 capitalize">
                            {item?.name}
                          </p>
                          <p className="poppins_regular text-sm text-white mb-0 capitalize">
                            {item?.category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-3">
                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      Starting Time
                    </div>
                    <div className="poppins_regular text-sm">
                      {formatDate(item?.start_date)}
                    </div>
                  </Col>
                  <Col md="6" className="">
                    <div className="poppins_medium text-base text_primary">
                      Ending Time
                    </div>
                    <div className="poppins_regular text-sm">
                      {formatDate(item?.end_date)}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-3">
                  <Col md="6">
                    <div className="poppins_medium text-base text_primary">
                      Deposit Amount
                    </div>
                  </Col>
                  <Col md="6" className="">
                    <div className="poppins_regular">
                      {formatPrice(item?.depositamount)}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-3">
                  <Col md="12">
                    <div className="poppins_medium text-base text_primary">
                      Description
                    </div>
                  </Col>
                  <Col md="12" className="">
                    <div className="poppins_regular text_dark">
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
            <div className="">
            <p className="poppins_medium text-2xl mb-0 ">
              All Lots({item?.lots?.length})
            </p>
            </div>
          </Container>
          <AuctionLots loading={loading} items={item} />
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
        className="!max-w-[90vw] !max-h-[90vh] object-fill"
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
