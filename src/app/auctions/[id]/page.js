/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { auctionDetail } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { handleError } from "@/components/api/errorHandler";
import AuctionLots from "@/components/auction/auctionLots";
import TopSection from "@/components/common/TopSection";
import useCurrency from "@/components/hooks/useCurrency";
import { message } from "antd";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Maximize2, Plus, X } from "react-feather";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer";
import {
  FaCar,
  FaCogs,
  FaCubes,
  FaCalendarAlt,
  FaRoad,
  FaCarSide,
  FaChair,
  FaExchangeAlt,
  FaPalette,
  FaFileAlt,
  FaInfoCircle,
  FaGlobe,
  FaLeaf,
  FaFlag,
  FaWarehouse,
  FaCouch,
  FaRulerHorizontal,
  FaWindowMaximize,
  FaLock,
  FaSnowflake,
  FaCompactDisc,
  FaLightbulb,
  FaSun,
  FaCamera,
  FaKey,
  FaApple,
  FaAndroid,
  FaBluetooth,
  FaRoute,
  FaTv,
  FaWeight,
  FaUsers,
  FaHeartbeat,
  FaTransgender,
  FaAward,
  FaHorse,
  FaEye,
  FaHome,
  FaWrench,
} from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import {
  GiBoatEngine,
  GiSteeringWheel,
  GiSuspensionBridge,
} from "react-icons/gi";
import {
  MdOutlineSecurity,
  MdSensorDoor,
  MdOutlineTouchApp,
} from "react-icons/md";
import { GrDashboard } from "react-icons/gr";

const AuctionDetailPage = () => {
  const router = useRouter();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { get, userData } = ApiFunction();
  const { id } = useParams();
  const { formatPrice, convert } = useCurrency();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);

  const categoryIcons = [
    { key: "type", icon: FaCar },
    { key: "the_model", icon: FaCogs },
    { key: "category", icon: FaCubes },
    { key: "year_of_manufacture", icon: FaCalendarAlt },
    { key: "km", icon: FaRoad },
    { key: "body_type", icon: FaCarSide },
    { key: "number_of_seats", icon: FaChair },
    { key: "fuel_type", icon: BsFillFuelPumpFill },
    { key: "transmission", icon: FaExchangeAlt },
    { key: "engine_capacity", icon: GiBoatEngine },
    { key: "exterior_colour", icon: FaPalette },
    { key: "interior_colour", icon: FaPalette },
    { key: "the_color", icon: FaPalette },
    { key: "description", icon: FaFileAlt },
    { key: "car_condition", icon: FaInfoCircle },
    { key: "the_age", icon: FaCalendarAlt },
    { key: "country_of_manufacture", icon: FaGlobe },
    { key: "the_name", icon: FaLeaf },
    { key: "item_type", icon: FaCubes },
    { key: "imported", icon: FaFlag },
    { key: "local", icon: FaWarehouse },
    { key: "material", icon: FaCouch },
    { key: "product_age", icon: FaCalendarAlt },
    { key: "archaeological", icon: FaGlobe },
    { key: "modern", icon: FaPalette },
    { key: "engine_power", icon: GiBoatEngine },
    { key: "length", icon: FaRulerHorizontal },
    { key: "width", icon: FaRulerHorizontal },
    { key: "the_cars", icon: FaCar },
    { key: "information", icon: FaInfoCircle },
    { key: "transmission_type", icon: FaExchangeAlt },
    { key: "seat_memory", icon: FaChair },
    { key: "electric_rear_seat", icon: FaChair },
    { key: "electric_windows", icon: FaWindowMaximize },
    { key: "heated_steering_wheel", icon: GiSteeringWheel },
    { key: "central_lock", icon: FaLock },
    { key: "conditioning", icon: FaSnowflake },
    { key: "heated_seats", icon: FaChair },
    { key: "record_player", icon: FaCompactDisc },
    { key: "air_bags", icon: FaCogs },
    { key: "leather_seats", icon: FaCouch },
    { key: "electric_seat_control", icon: FaCogs },
    { key: "sports_seats", icon: FaCouch },
    { key: "steering_wheel_control", icon: GiSteeringWheel },
    { key: "cooled_seats", icon: FaSnowflake },
    { key: "sunroof", icon: FaSun },
    { key: "folding_mirrors", icon: FaCarSide },
    { key: "led_lamps", icon: FaLightbulb },
    { key: "daytime_running_light", icon: FaLightbulb },
    { key: "sports_version", icon: FaCarSide },
    { key: "spare_tire", icon: FaCarSide },
    { key: "front_sensors", icon: FaCamera },
    { key: "rear_sensors", icon: FaCamera },
    { key: "keyless_entry", icon: FaKey },
    { key: "abs", icon: MdOutlineSecurity },
    { key: "camera_360", icon: FaCamera },
    { key: "apple_carplay", icon: FaApple },
    { key: "rear_camera", icon: FaCamera },
    { key: "android_auto", icon: FaAndroid },
    { key: "e_s_c", icon: MdSensorDoor },
    { key: "bluetooth", icon: FaBluetooth },
    { key: "cruise_control", icon: FaRoute },
    { key: "air_pressure_sensor", icon: GrDashboard },
    { key: "sports_suspension", icon: GiSuspensionBridge },
    { key: "touch_screen", icon: MdOutlineTouchApp },
    { key: "navigation_system", icon: FaRoute },
    { key: "media_screen", icon: FaTv },
    { key: "the_condition", icon: FaInfoCircle },
    { key: "payload", icon: FaWeight },
    { key: "engine_type", icon: GiBoatEngine },
    { key: "gearbox", icon: FaCogs },
    { key: "number_of_working_hours", icon: GrDashboard },
    { key: "date_of_manufacture", icon: FaCalendarAlt },
    { key: "father", icon: FaUsers },
    { key: "mother", icon: FaUsers },
    { key: "grand_mother", icon: FaUsers },
    { key: "blood", icon: FaHeartbeat },
    { key: "sex", icon: FaTransgender },
    { key: "awards", icon: FaAward },
    { key: "type_of_cattle", icon: FaHorse },
    { key: "cattle_age", icon: FaCalendarAlt },
    { key: "health_condition", icon: FaHeartbeat },
    { key: "the_faction", icon: FaUsers },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedField, setSelectedField] = useState({ key: "", value: "" });

  // Define tab categories for vehicles/cars
  const vehicleTabCategories = {
    overview: {
      icon: FaEye,
      label: t("common.overview"),
      keys: [
        "the_cars",
        "information",
        "car_condition",
        "type",
        "the_model",
        "category",
        "year_of_manufacture",
        "km",
        "body_type",
        "fuel_type",
        "transmission_type",
        "engine_capacity",
      ],
    },
    exterior: {
      icon: FaCarSide,
      label: t("common.exterior"),
      keys: [
        "exterior_colour",
        "sunroof",
        "folding_mirrors",
        "led_lamps",
        "daytime_running_light",
        "sports_version",
        "spare_tire",
        "front_sensors",
        "rear_sensors",
      ],
    },
    interior: {
      icon: FaHome,
      label: t("common.interior"),
      keys: [
        "interior_colour",
        "number_of_seats",
        "seat_memory",
        "electric_rear_seat",
        "electric_windows",
        "heated_steering_wheel",
        "central_lock",
        "conditioning",
        "heated_seats",
        "record_player",
        "leather_seats",
        "electric_seat_control",
        "sports_seats",
        "steering_wheel_control",
        "cooled_seats",
      ],
    },
    technology: {
      icon: FaWrench,
      label: t("common.technology"),
      keys: [
        "keyless_entry",
        "abs",
        "camera_360",
        "apple_carplay",
        "rear_camera",
        "android_auto",
        "e_s_c",
        "bluetooth",
        "cruise_control",
        "air_pressure_sensor",
        "sports_suspension",
        "touch_screen",
        "navigation_system",
        "media_screen",
        "air_bags",
      ],
    },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t("auctionJoin.heading1");
    if (hour >= 12 && hour < 17) return t("auctionJoin.heading2");
    if (hour >= 17 && hour < 21) return t("auctionJoin.heading3");
    return t("auctionJoin.heading4");
  };

  const formatKey = (key) => {
    const translationKey = `auction.categoryInfo.${key}`;
    const translatedKey = t(translationKey);

    if (translatedKey && translatedKey !== translationKey) {
      return translatedKey;
    }

    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

  const handleSeeMore = (key, value) => {
    setSelectedField({ key, value });
    setShowModal(true);
  };

  useEffect(() => {
    if (id) {
      fetchAuctionDetail();
    }
  }, [language]);

  useEffect(() => {
    if (item?.images?.length > 0) {
      setSelectedImage(item.images[0]);
    }
  }, [item]);

  const handleRegister = () => {
    const now = moment.utc();
    const startTime = moment.utc(item?.start_date);

    if (userData) {
      router.push(`/auctions/${id}/registration`);
    } else {
      message.error(t("auctionDetails.heading8"));
    }
  };

  const handleJoin = () => {
    if (userData) {
      router.push(`/auctions/auction-join/${id}`);
    } else {
      message.error(t("auctionDetails.heading8"));
    }
  };

  const isRegister = !item?.applications || item?.applications?.length === 0;
  const [isExpired, setIsExpired] = useState(false);
  const isActive = item?.status === "active";

  const button = {
    icon: <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />,
    text: isRegister
      ? t("auctionDetails.heading10")
      : t("auctionDetails.heading11"),
    onClick: isRegister ? handleRegister : handleJoin,
    className:
      "h-8 shadow md:h-10 bg_primary text-white rounded-[10px] px-[1rem] w-fit flex items-center justify-center",
  };

  // Check if category is vehicle/car related
  const isVehicleCategory =
    language === "ar"
      ? item?.category?.name?.toLowerCase() === "سيارة مركبة"
      : item?.category?.name?.toLowerCase() === "vehicle car";

  // Filter category info based on active tab
  const getFilteredCategoryInfo = () => {
    if (!isVehicleCategory) {
      return item?.categoryInfo || {};
    }

    const tabData = vehicleTabCategories[activeTab];
    if (!tabData) return {};

    const filtered = {};
    tabData.keys.forEach((key) => {
      if (item?.categoryInfo?.[key]) {
        filtered[key] = item.categoryInfo[key];
      }
    });
    return filtered;
  };

  const renderCategoryInfoSection = () => {
    const filteredInfo = getFilteredCategoryInfo();

    if (isVehicleCategory) {
      return (
        <Container
          fluid="xxl"
          className="bg-white rounded-[12px] overflow-hidden my-4"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {/* Enhanced Tab Navigation */}
          <div className="p-2 p-sm-3">
            <div className="flex overflow-x-auto scrollbar-hide">
              {Object.entries(vehicleTabCategories).map(([key, tab]) => {
                const Icon = tab.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`
                      flex items-center justify-center gap-3 p-3 whitespace-nowrap poppins_medium text-sm md:text-base
                      transition-all duration-300 border-b-3 relative overflow-hidden group
                      ${
                        isActive
                          ? "text-[#8B0000] border-[#8B0000] bg-white"
                          : "text-gray-600 border-transparent hover:text-[#8B0000] hover:bg-white/50"
                      }
                    `}
                  >
                    <div
                      className={`
                      p-2 rounded-full transition-all duration-300
                      ${
                        isActive
                          ? "bg-[#8B0000] text-white shadow-lg"
                          : "bg-gray-200 text-gray-600 group-hover:bg-[#8B0000] group-hover:text-white"
                      }
                    `}
                    >
                      <Icon className="text-sm" />
                    </div>
                    <span className="poppins_medium hidden md:block">
                      {tab.label}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] to-red-600"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced Tab Content */}
          <div className="p-2 p-sm-3">
            {Object.keys(filteredInfo).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(filteredInfo).map(([key, value]) => {
                  const matchedIcon = categoryIcons?.find(
                    (icon) => icon?.key === key
                  );
                  const Icon = matchedIcon?.icon || FaInfoCircle;
                  const isLongText = value && value.length > 40; // Adjust limit as needed

                  return (
                    <div
                      key={key}
                      className="group shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-xl p-3 transition-all duration-500 hover:shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#8B0000]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

                      <div className="flex items-start gap-2 relative z-10">
                        <div className="bg-gradient-to-br from-[#8B0000] to-red-700 rounded-xl p-2 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-[#8B0000]/25">
                          <Icon className="text-white text-base" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="poppins_semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-[#8B0000] transition-colors duration-300">
                            {formatKey(key)}
                          </h4>

                          <div className="rounded-lg mb-0">
                            <span className="text-gray-700 text-sm poppins_regular group-hover:text-gray-900 mb-0 line-clamp-1">
                              {value?.length > 40
                                ? value?.slice(0, 40) + "..."
                                : value}
                            </span>
                            {isLongText && (
                              <span className="">
                                <button
                                  className={`text-xs text_primary poppins_medium mt-1 hover:underline`}
                                  onClick={() => handleSeeMore(key, value)}
                                >
                                  See More
                                </button>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#8B0000] to-red-600 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <FaInfoCircle className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500 poppins_medium">
                  No information available for this section
                </p>
              </div>
            )}
          </div>
        </Container>
      );
    }

    // Non-vehicle category - show all info in overview tab
    return (
      <Container
        fluid="xxl"
        className="bg-white rounded-[12px] overflow-hidden my-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="p-2 p-sm-3">
          <h3 className="text-lg md:text-xl poppins_semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#8B0000] to-red-600 rounded-full">
              <FaEye className="text-white text-lg" />
            </div>
            {t("common.overview")}
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-[#8B0000] to-red-600 rounded-full mt-2"></div>
        </div>

        <div className="p-2 p-sm-3">
          {Object.keys(item?.categoryInfo || {}).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(item?.categoryInfo || {}).map(([key, value]) => {
                const matchedIcon = categoryIcons?.find(
                  (icon) => icon?.key === key
                );
                const isLongText = value && value.length > 40;
                const Icon = matchedIcon?.icon || FaInfoCircle;
                return (
                  <div
                    key={key}
                    className="group shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-xl p-3 transition-all duration-500 hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#8B0000]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

                    <div className="flex items-start gap-2 relative z-10">
                      <div className="bg-gradient-to-br from-[#8B0000] to-red-700 rounded-xl p-2 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-[#8B0000]/25">
                        <Icon className="text-white text-base" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="poppins_semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-[#8B0000] transition-colors duration-300">
                          {formatKey(key)}
                        </h4>

                        <div className="rounded-lg mb-0">
                          <span className="text-gray-700 text-sm poppins_regular group-hover:text-gray-900 mb-0 line-clamp-1">
                            {value?.length > 40
                              ? value?.slice(0, 40) + "..."
                              : value || "N/A"}
                          </span>
                          {isLongText && (
                            <div className="mr-auto">
                              <button
                                className={`text-xs text_primary poppins_medium mt-1 hover:underline`}
                                onClick={() => handleSeeMore(key, value)}
                              >
                                See More
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#8B0000] to-red-600 group-hover:w-full transition-all duration-500"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <FaInfoCircle className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-500 poppins_medium">
                {t("auction.categoryInfo.noInfo")}
              </p>
            </div>
          )}
        </div>
      </Container>
    );
  };

  return (
    <main
      className="bg_mainsecondary p-2 md:py-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
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
            description={t("auctionDetails.heading12")}
            // button={button}
            // {...(item?.status === "start" && !isExpired && { button })}
            // {...(!isExpired && { button })}
            {...{ button }}
          />

          <Container
            fluid="xxl"
            className="bg_mainsecondary rounded-[9px] my-4 px-0 overflow-hidden"
          >
            <Row className="g-3 h-full">
              <Col md="4" lg="2" className="flex md:flex-column ">
                <div className="flex md:flex-col gap-3 h-100 max-h-[700px] w-full overflow-y-auto">
                  {item?.images?.map((image, index) => (
                    <div
                      key={index}
                      className="flex-grow-0 flex-shrink-0 h-[120px] mb-2"
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
                  className="relative bg_white rounded-[10px] w-100 h-100 flex items-center justify-center cursor-pointer group overflow-hidden md:!h-[500px] p-0 p-md-2"
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
                className="bg_white p-2 p-md-3 rounded-[9px] d-flex flex-column max-h-[700px] overflow-y-auto"
              >
                <Row>
                  <Col md="12">
                    <div className="p-2 rounded-[9px] relative">
                      <div className={`flex items-start justify-between`}>
                        <div>
                          <p
                            className={`poppins_medium text-xl sm:text-2xl  mb-0 capitalize`}
                          >
                            {item?.name}
                          </p>
                          <p
                            className={`poppins_regular text-sm  mb-0 capitalize`}
                          >
                            {item?.category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center p-2">
                  <Col md="6" className="">
                    <div
                      className={`poppins_medium text-base text-[#8B0000] ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("order.heading6")}
                    </div>
                    <div
                      className={`poppins_regular text-sm mt-2 py-1  text-black ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="px-3 mt-2 py-1 rounded-full border border-black-300">
                        {item?.subcategory?.title}
                      </span>
                    </div>
                  </Col>
                  <Col md="6" className="">
                    <div
                      className={`poppins_medium text-base text-[#8B0000] ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading6")}
                    </div>
                    <div
                      className={`poppins_regular text-sm mt-2 py-1  text-black ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="px-3 mt-2 py-1 rounded-full border border-black-300">
                        {item?.subcategory?.title}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center p-2">
                  <Col md="6">
                    <div className={`poppins_medium text-base text_primary`}>
                      {t("auctionDetails.heading")}
                    </div>
                    <div className={`poppins_regular text-sm`}>
                      {moment
                        .utc(item?.start_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className={`poppins_medium text-base text_primary`}>
                      {t("auctionDetails.heading2")}
                    </div>
                    <div className={`poppins_regular text-sm`}>
                      {moment
                        .utc(item?.end_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center p-2">
                  <Col md="6">
                    <div className={`poppins_medium text-base text_primary`}>
                      {t("auctionDetails.heading3")}
                    </div>
                    <div className={`poppins_regular`}>
                      {formatPrice(convert(item?.depositamount, "LYD"))}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className={`poppins_medium text-base text_primary`}>
                      {t("auctionDetails.heading7")}
                    </div>
                    <div className={`poppins_regular`}>{item?.status}</div>
                  </Col>
                </Row>
                <Row className="justify-center p-2">
                  <Col md="12">
                    <div className={`poppins_medium text-[1.2rem] text-black`}>
                      {t("auctionDetails.heading4")}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className={`poppins_regular abDatadi text_dark`}>
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

          {item?.categoryinfo && renderCategoryInfoSection()}
          <Container fluid="xxl">
            <div>
              <p className={`poppins_medium text-lg sm:text-2xl mb-0 `}>
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

      {/* Image Preview Modal */}
      <Modal
        isOpen={previewModal}
        toggle={() => setPreviewModal(!previewModal)}
        size="lg"
        centered
        contentClassName="bg-transparent border-0"
        style={{ zIndex: 999 }}
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          style={{ zIndex: 999 }}
        >
          <div className="bg-white rounded-xl p-4 w-[90%] max-w-md shadow-lg relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg text-gray-800 mb-0 poppins_semibold">
                {formatKey(selectedField.key)}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-600 text-lg"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap poppins_regular">
              {selectedField.value}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default AuctionDetailPage;
