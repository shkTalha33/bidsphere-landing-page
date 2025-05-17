/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { getAuctionLot } from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import {
  avataruser,
  confirmBid,
  uploadfileIcon,
  winBid,
} from "@/components/assets/icons/icon";
import AuctionConfirmationModal from "@/components/common/auctionConfirmationModal";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import { Avatar, Result } from "antd";
import debounce from "debounce";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Heart, Maximize2, Plus, X } from "react-feather";
import { FaRegClock } from "react-icons/fa6";
import { TbLivePhoto } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { useSocket } from "@/components/socketProvider/socketProvider";
import toast from "react-hot-toast";
import { GiPodiumWinner } from "react-icons/gi";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SmileOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { allCountries } from "country-region-data";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import { uploadFile } from "@/components/api/uploadFile";

export default function Page() {
  const { get, userData } = ApiFunction();
  const [activeButton, setActiveButton] = useState("custom");
  const [openBiddingConfirmationModal, setOpenBiddingConfirmationModal] =
    useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { formatPrice, convert } = useCurrency();
  const [currentLot, setCurrentLot] = useState(null);
  const [recentBids, setRecentBids] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [auctionData, setAuctionData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [winnerLot, setWinnerLot] = useState(null);
  const token = useSelector((state) => state.auth?.accessToken);
  const [applicationData, setApplicationData] = useState(null);
  const [selectedIdentityFiles, setSelectedIdentityFiles] = useState([]);
  const [selectedFundsFiles, setSelectedFundsFiles] = useState([]);
  const [fileLoadingIdentity, setFileLoadingIdentity] = useState(false);
  const [fileLoadingFunds, setFileLoadingFunds] = useState(false);
  const socket = useSocket();
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [modalReject, setModalReject] = useState(false);

  const toggleReject = () => setModalReject(!modalReject);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  // console.log(applicationData, "applicationData");
  // console.log(auctionData, "auctionData");

  const confirmationItem = {
    title: "Confirm Bid",
    description: `You have placed a bid for ${formatPrice(
      convert(bidAmount || 0, "LYD")
    )}. Should we place this as your Bid?`,
    image: confirmBid,
    buttons: [
      {
        btnText: "Yes, Place My Bid",
        onClick: () => placeBid(),
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

  const [priceOptions, setPriceOptions] = useState([]);
  const getPriceOptions = () => {
    let basePrice = 0;
    const increment = Number(currentLot?.minincrement) || 1000;

    if (recentBids?.length > 0) {
      const latestBid = Number(recentBids[0]?.price || 0);
      basePrice = latestBid + increment;
    } else if (currentLot?.minprice) {
      basePrice = Number(currentLot?.minprice) + increment;
    }

    const options = Array.from({ length: 4 }, (_, i) =>
      String(basePrice + i * increment)
    );

    return options;
  };
  useEffect(() => {
    setPriceOptions(getPriceOptions());
  }, [recentBids, currentLot]);

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setPreviewModal(true);
  };
  useEffect(() => {
    if (currentLot?.item?.images?.length > 0) {
      setSelectedImage(currentLot?.item?.images[0]);
    }
  }, [currentLot]);

  useEffect(() => {
    if (socket?.connected) {
      socket.emit("join_auction", id, (response) => {
        if (response?.success) {
          setApplicationData(response?.application);
          setAuctionData(response?.auction);

          if (response?.auction?.current_lot) {
            const matchedLot = response?.auction?.lots.find(
              (lot) => lot?.item?._id === response?.auction?.current_lot
            );
            setCurrentLot(matchedLot || null);
          } else {
            setCurrentLot(response?.auction?.lots[0]);
          }
        }
      });

      // Listen for new bids
      socket.on("new_bid", (data) => {
        const newBid = data?.bid;
        if (!newBid) return;
        setRecentBids((prevBids) => [newBid]?.concat(prevBids));
      });

      socket.on("lot_winner_selected", (data) => {
        setWinnerLot(data);
        toggle();
      });

      // Listen for auction updates
      socket.on("auction", (data) => {
        // setAuctionData(data);
        if (data?.auction?.current_lot) {
          const matchedLot = data?.auction?.lots?.find(
            (lot) => lot?.item?._id === data?.auction?.current_lot
          );

          setCurrentLot(matchedLot || null);
        } else {
          setCurrentLot(data?.auction?.lots[0]);
        }
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

      // Listen for auction bids

      return () => {
        socket.off("new_bid");
        socket.off("auction");
        socket.off("user_joined");
        socket.off("lot_winner_selected");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket?.connected) {
      if (currentLot?.item?._id) {
        const bidAiData = {
          auctionId: id,
          lotId: currentLot?.item?._id,
          page: 1,
          limit: 100,
        };
        socket.emit("get_auction_bids", bidAiData, (response) => {
          if (response?.success) {
            setRecentBids(response?.bids);
          }
        });
      }
    }
  }, [socket, currentLot]);

  const placeBid = () => {
    if (!bidAmount) return;
    const data = {
      auctionId: id,
      lotId: currentLot?.item?._id,
      bidAmount: Number(bidAmount),
      name: userData?.fname,
      type: "user",
    };
    socket.emit("place_bid", data, (response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setBidAmount("");
      }
      setActiveButton("custom");
      setBidAmount("");
      setOpenBiddingConfirmationModal(false);
    });
  };

  // const button = {
  //   icon: <GiPodiumWinner className="w-5 h-5 mr-2 text-yellow-300" />,
  //   text: "Winner Announced",
  //   onClick: null, // disabled or no action
  //   className:
  //     "bg-gradient-to-r w-fit flex from-[#660000] via-[#800000] to-[#990000] text-white poppins_medium px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300",
  // };

  const winnerButton = {
    icon: <GiPodiumWinner className="w-5 h-5 mr-2 text-yellow-300" />,
    text: "Winner Announced",
    onClick: null,
    className:
      "bg-gradient-to-r w-fit flex from-[#660000] via-[#800000] to-[#990000] text-white poppins_medium px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300",
  };

  const rejectedButton = {
    icon: null,
    text: "Apply Again w",
    onClick: () => toggleReject(),
    className:
      "bg-gradient-to-r w-fit flex from-[#660000] via-[#800000] to-[#990000] text-white poppins_medium px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300",
  };

  // Choose button conditionally
  let topButton = undefined;

  if (currentLot?.status === "winner" || winnerLot?.bid) {
    topButton = winnerButton;
  } else if (applicationData?.status === "rejected") {
    topButton = rejectedButton;
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // chat navigate
  const handlechat = () => {
    router.push(`/auctionChat/${id}`);
  };

  // custom bid option
  const handleCustomBid = (type) => {
    const now = moment.utc();
    const startTime = moment.utc(auctionData?.start_date);

    if (applicationData?.status === "pending") {
      toast.error("Your application is pending. Please wait for approval.");
      return;
    }

    if (applicationData?.status === "rejected") {
      toast.error("Your application is rejected. Please apply again.");
      return;
    }

    if (now.isBefore(startTime)) {
      toast.error(
        `You can bid for this auction starting from ${startTime
          .local()
          .format("DD MMMM, YYYY h:mm A")}`
      );
      return;
    }

    if (!currentLot?.minprice || !currentLot?.minincrement) {
      toast.error("Lot information is missing.");
      return;
    }

    let minRequiredBid = 0;
    if (!recentBids || recentBids.length === 0) {
      minRequiredBid = currentLot.minprice;
    } else {
      minRequiredBid = recentBids[0].price + currentLot.minincrement;
    }

    if (bidAmount > 0) {
      if (type === "manual") {
        // Manual Bid: only check valid bidAmount
        setOpenBiddingConfirmationModal(true);
      } else if (type === "custom") {
        // Custom Bid: ensure bidAmount >= minRequiredBid
        if (bidAmount >= minRequiredBid) {
          setOpenBiddingConfirmationModal(true);
        } else {
          toast.error(
            `Your bid must be at least ${formatPrice(
              convert(minRequiredBid, "LYD")
            )}`
          );
        }
      }
    } else {
      toast.error("Please enter a valid bid amount.");
    }
  };

  // ///////////

  const schema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
    id_proof: Yup.array()
      .min(1, "At least one identity proof photo is required")
      .required("Identity proof photos are required"),
    funds_proof: Yup.array()
      .min(1, "At least one proof of funds photo is required")
      .required("Proof of funds photos are required"),
  });

  const [regions, setRegions] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      country: "",
      region: "",
      id_proof: [],
      funds_proof: [],
    },
  });

  useEffect(() => {
    if (applicationData) {
      Object.entries(applicationData).forEach(([key, value]) => {
        setValue(key, value || "");
      });

      const countryData = allCountries.find(
        ([name]) => name === applicationData.country
      );
      if (countryData) {
        setRegions(countryData[2]?.map(([r]) => r));
      }
    }
  }, [applicationData, setValue]);

  function getFileDetails(filename) {
    let parts = filename.split(".");
    return {
      title: parts.slice(0, -1).join("."),
      type: parts.pop(),
    };
  }

  const handleRemoveAll = (type) => {
    const isIdentity = type === "identity";
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

    setFiles([]);
    setValue(fieldName, [], { shouldValidate: true });
  };

  const handleFileChange = async (event, type) => {
    let files = Array.from(event.target.files);
    if (type === "identity") {
      const totalFiles = selectedIdentityFiles?.length + files.length;
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files");
      }
    }
    if (type === "funds") {
      const totalFiles = selectedFundsFiles.length + files.length;
      if (totalFiles > 5) {
        return toast.error("Cannot upload more than 5 files");
      }
    }
    if (files.length === 0) return;
    const isIdentity = type === "identity";
    const setLoading = isIdentity
      ? setFileLoadingIdentity
      : setFileLoadingFunds;
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const currentFiles = isIdentity
      ? selectedIdentityFiles
      : selectedFundsFiles;
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

    try {
      const uploadedUrls = [...currentFiles];
      let acceptPdf = true;
      setLoading(true);
      for (const file of files) {
        const { title, type } = getFileDetails(file?.name);
        const response = await uploadFile(file, acceptPdf);
        const imageData = {
          title,
          type,
          url: response.data.image || response.data.video,
        };
        uploadedUrls.push(imageData);
      }

      setFiles(uploadedUrls);
      setValue(fieldName, uploadedUrls, { shouldValidate: true });
      await trigger(fieldName);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const handleFileRemove = (index, type) => {
    const isIdentity = type === "identity";
    const setFiles = isIdentity
      ? setSelectedIdentityFiles
      : setSelectedFundsFiles;
    const currentFiles = isIdentity
      ? selectedIdentityFiles
      : selectedFundsFiles;
    const fieldName = isIdentity ? "id_proof" : "funds_proof";

    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue(fieldName, updatedFiles, { shouldValidate: true });
  };

  const handleCountryChange = (e, field) => {
    const selected = e.target.value;
    field.onChange(selected);
    const found = allCountries.find(([name]) => name === selected);
    setRegions(found ? found[2].map(([region]) => region) : []);
    setValue("region", "");
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <main className="bg_mainsecondary">
      <>
        <TopSection
          title={`${getGreeting()}, ${userData?.fname || ""} ${
            userData?.lname || ""
          }`}
          description={"Here are your auctions whom you can join."}
          button={topButton}
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
              <div className="bg_primary pt-4 py-16 px-3 sm:px-6 rounded-xl relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="poppins_medium text-xl sm:text-2xl text-white mb-0 capitalize">
                      {currentLot?.item?.name || userData?.lang === "en"
                        ? currentLot?.item?.name?.en
                        : currentLot?.item?.name?.ar}
                    </p>
                    <p className="poppins_regular text-sm text-white mb-0 capitalize">
                      Auction
                    </p>
                  </div>
                </div>
              </div>

              {/* Price and Bidding Status Section */}
              <div className="w-[90%] mx-auto relative -mt-10 mb-6">
                <Row className="py-4 bg-[#F3F2F2] rounded-[10px] mx-0">
                  <Col sm="6" className="border-r border-gray-300 px-4">
                    <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                      Bid price
                    </p>
                    <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                      {formatPrice(convert(currentLot?.minprice || 0, "LYD"))}
                    </p>

                    <div className="flex items-center justify-start mb-2 md:mb-0 mt-2 gap-1">
                      {participants?.slice(0, 3).map((user, index) => {
                        const initial = user?.fname
                          .trim()
                          .charAt(0)
                          .toUpperCase();
                        return (
                          <div
                            key={index}
                            className="bg-gray-300 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-sm font-bold text-black"
                          >
                            {initial}
                          </div>
                        );
                      })}

                      {participants?.length > 3 && (
                        <div className="bg-gray-300 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-sm font-bold text-black">
                          +{participants?.length - 3}
                        </div>
                      )}

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
                      {formatPrice(convert(recentBids?.[0]?.price || 0, "LYD"))}
                    </p>
                    <div>
                      <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                        Bid increment price
                      </p>
                      <p className="text-[#1B212C] mb-0 text-sm poppins_regular capitalize">
                        {formatPrice(
                          convert(currentLot?.minincrement || 0, "LYD")
                        )}
                      </p>
                    </div>
                  </Col>
                  <Col sm="6" className="border-r border-gray-300 px-4">
                    <p className="text-[#1B212C] mb-0 text-lg poppins_semibold capitalize">
                      Bid Starting time
                    </p>
                    <div className="poppins_regular text-sm">
                      {moment
                        .utc(auctionData?.start_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>

                  <Col sm="6" className="px-4">
                    <p className="text-[#1B212C] mb-0 text-base sm:text-lg poppins_semibold capitalize">
                      Bid End time
                    </p>
                    <div className="poppins_regular text-sm">
                      {moment
                        .utc(auctionData?.end_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>
                </Row>
              </div>

              {currentLot?.status === "winner" || winnerLot?.bid ? (
                <>
                  {userData?._id === currentLot?.winner ||
                  userData?._id === winnerLot?.winner?._id ? (
                    <div className="flex flex-col items-center justify-center bg-green-50 border border-green-200 p-6 rounded-2xl shadow-md text-center max-w-md mx-auto mt-6">
                      <CheckCircleOutlined className="text-green-500 text-5xl mb-4" />
                      <h2 className="text-xl poppins_medium text-green-600 mb-2">
                        Congratulations!
                      </h2>
                      <p className="text-gray-700">
                        🎉 You have won this lot!. You can no longer place a bid
                        for this item.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 p-6 rounded-2xl shadow-md text-center max-w-md mx-auto mt-6">
                        <CloseCircleOutlined className="text-red-500 text-5xl mb-4" />
                        <h2 className="text-xl poppins_medium text-red-600 mb-2">
                          Winner Announced
                        </h2>
                        <p className="text-gray-700">
                          This lot is now closed as a winner has been selected.
                          You can no longer place a bid for this item.
                        </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
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
                          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-dark poppins_medium text-lg">
                            {bid?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="poppins_regular text-base text_dark mb-0">
                              {bid?.name}
                            </p>
                          </div>
                        </div>
                        <p className="capitalize poppins_regular text-[14px] text-end mb-0">
                          {formatPrice(convert(bid?.price || 0, "LYD"))}
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
                          onClick={() => {
                            setActiveButton(price);
                            setBidAmount(price);
                          }}
                        >
                          {formatPrice(convert(price || 0, "LYD"))}
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
                          type="number"
                          placeholder="Enter your bid"
                          disabled={
                            currentLot?.status === "winner" || winnerLot?.bid
                          }
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="text-center py-2 md:py-3 rounded-2xl poppins_semibold text-[14px] bg-transparent border border-[#21CD9D] text_primary flex-grow"
                        />

                        <button
                          className="bg_primary flex items-center justify-center rounded-2xl p-2 md:p-3"
                          onClick={() => handleCustomBid("custom")}
                        >
                          <Check size={24} className="text-white" />
                        </button>

                        <button
                          className="bg_white flex items-center justify-center rounded-2xl p-2 md:p-3 border border-[#21CD9D]"
                          onClick={() => {
                            if (
                              currentLot?.status !== "winner" &&
                              !winnerLot?.bid
                            ) {
                              setActiveButton("");
                            } else {
                              toast.error(
                                "You are not allowed to bid on this lot anymore."
                              );
                            }
                          }}
                        >
                          <X size={24} className="text_primary" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="capitalize py-2 md:py-3 mt-3 poppins_medium bg_primary w-full text-white rounded-lg"
                        onClick={() => handleCustomBid("manual")}
                      >
                        Place Bid For{" "}
                        {formatPrice(convert(bidAmount || 0, "LYD"))}
                      </button>
                    )}
                  </div>
                </>
              )}

              <section className="mt-3">
                <div
                  onClick={handlechat}
                  className="bg-gradient-to-r w-fit flex from-[#660000] via-[#800000] to-[#990000] text-white poppins_medium px-4 py-2 rounded-[10px] cursor-pointer shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Live Chat
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </>

      {/* Modals */}
      <AuctionConfirmationModal
        openModal={openBiddingConfirmationModal}
        setOpenModal={setOpenBiddingConfirmationModal}
        item={confirmationItem}
        bidAmount={bidAmount}
      />

      {/* Image Preview Modal */}

      <Modal centered backdrop="static" isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          className={
            winnerLot?.bid?.user?._id === userData?._id
              ? "text-success"
              : "text-danger"
          }
        >
          {winnerLot?.bid?.user?._id === userData?._id
            ? "🎉 Congratulations!"
            : "❌ Bidding Closed"}
        </ModalHeader>

        <ModalBody>
          {winnerLot?.bid?.user?._id === userData?._id ? (
            <Result
              icon={
                <TrophyOutlined
                  style={{ color: "#FFC107", fontSize: "60px" }}
                />
              }
              title="You've won this auction!"
              subTitle="Congratulations on winning the lot! The auction has ended in your favor. Please proceed to complete the transaction if required."
              status="success"
            />
          ) : (
            <Result
              icon={
                <CloseCircleOutlined
                  style={{ color: "#ff4d4f", fontSize: "60px" }}
                />
              }
              title="The winner for this lot has been selected."
              subTitle="The winner has already been selected. You can no longer place a bid for this lot."
              status="error"
            />
          )}
        </ModalBody>
      </Modal>

      {/* reject request modal  */}
      <Modal
        isOpen={modalReject}
        centered
        backdrop="static"
        scrollable
        toggle={toggleReject}
      >
        <ModalHeader toggle={toggleReject}>Registration Form</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <Label>First Name</Label>
                <Controller
                  name="fname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={!!errors.fname}
                      placeholder="Enter First Name"
                    />
                  )}
                />
                <FormFeedback>{errors.fname?.message}</FormFeedback>
              </Col>

              <Col md={12}>
                <Label>Last Name</Label>
                <Controller
                  name="lname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={!!errors.lname}
                      placeholder="Enter Last Name"
                    />
                  )}
                />
                <FormFeedback>{errors.lname?.message}</FormFeedback>
              </Col>

              <Col md={12}>
                <Label>Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      {...field}
                      invalid={!!errors.email}
                      placeholder="Enter Email"
                    />
                  )}
                />
                <FormFeedback>{errors.email?.message}</FormFeedback>
              </Col>

              <Col md={12}>
                <Label>Phone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={!!errors.phone}
                      placeholder="Enter Phone Number"
                    />
                  )}
                />
                <FormFeedback>{errors.phone?.message}</FormFeedback>
              </Col>

              <Col md={12}>
                <Label>Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      invalid={!!errors.country}
                      onChange={(e) => handleCountryChange(e, field)}
                    >
                      <option value="">Select Country</option>
                      {allCountries.map(([name, code]) => (
                        <option key={code} value={name}>
                          {name}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                <FormFeedback>{errors.country?.message}</FormFeedback>
              </Col>

              <Col md={12}>
                <Label>Region</Label>
                <Controller
                  name="region"
                  control={control}
                  render={({ field }) => (
                    <Input type="select" {...field} invalid={!!errors.region}>
                      <option value="">Select Region</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                <FormFeedback>{errors.region?.message}</FormFeedback>
              </Col>

              {/* Identity Proof Upload Section */}
              <Col md={12} className="mt-3">
                <Label>
                  Upload Identity Proof (Passport, Driver's License)
                </Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "identity")}
                  className="mb-2"
                />
                {errors.id_proof && (
                  <FormFeedback className="d-block">
                    {errors.id_proof.message}
                  </FormFeedback>
                )}

                {/* Display selected identity files */}

                {selectedIdentityFiles.length > 0 && (
                  <div className="mt-3 d-flex gap-2 flex-wrap">
                    {selectedIdentityFiles?.map((file, index) => (
                      <div key={index} className="position-relative">
                        <>
                          <Link href={file?.url} target="_blank">
                            {file?.type === "pdf" ? (
                              <Image
                                src={pdfIcon}
                                key={index}
                                width={96}
                                height={96}
                                alt={`Upload ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                              />
                            ) : (
                              <Image
                                src={file?.url}
                                key={index}
                                width={96}
                                height={96}
                                alt={`Upload ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                              />
                            )}
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleFileRemove(index, "identity")}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6"
                          >
                            ×
                          </button>
                        </>
                      </div>
                    ))}
                  </div>
                )}
                {fileLoadingIdentity && (
                  <div className="w-24 h-24 border border-gray-200 flex justify-center items-center rounded">
                    <Spinner size="sm" color="red" />
                  </div>
                )}
              </Col>

              {/* Funds Proof Upload Section */}
              <Col md={12} className="mt-3">
                <Label>
                  Upload Proof of Funds (Bank Statement, Income Proof)
                </Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "funds")}
                  className="mb-2"
                />
                {errors.funds_proof && (
                  <FormFeedback className="d-block">
                    {errors.funds_proof.message}
                  </FormFeedback>
                )}

                {/* Display selected funds files */}
                {selectedFundsFiles.length > 0 && (
                  <div className="mt-3 d-flex gap-2 flex-wrap">
                    {selectedFundsFiles?.map((file, index) => (
                      <div key={index} className="position-relative">
                        <>
                          <Link href={file?.url} target="_blank">
                            {file?.type === "pdf" ? (
                              <Image
                                src={pdfIcon}
                                key={index}
                                width={96}
                                height={96}
                                alt={`Upload ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                              />
                            ) : (
                              <Image
                                src={file?.url}
                                key={index}
                                width={96}
                                height={96}
                                alt={`Upload ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                              />
                            )}
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleFileRemove(index, "funds")}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6"
                          >
                            ×
                          </button>
                        </>
                      </div>
                    ))}
                  </div>
                )}
                {fileLoadingFunds && (
                  <div className="w-24 h-24 border border-gray-200 flex justify-center items-center rounded">
                    <Spinner size="sm" color="red" />
                  </div>
                )}
              </Col>

              <Col md={12} className="mt-3">
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </main>
  );
}
