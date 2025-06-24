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
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t("auctionJoin.heading1");
    if (hour >= 12 && hour < 17) return t("auctionJoin.heading2");
    if (hour >= 17 && hour < 21) return t("auctionJoin.heading3");
    return t("auctionJoin.heading4");
  };

  const formatKey = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getValueBadge = (value) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue === "yes" || lowerValue === "good" || lowerValue === "new") {
      return "success";
    } else if (lowerValue === "no" || lowerValue === "bad") {
      return "danger";
    }
    return "info";
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
  }, [language]);

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
            className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0 overflow-hidden"
          >
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
                className="bg_white p-2 p-md-3 rounded-[9px] d-flex flex-column max-h-[700px] overflow-y-auto"
              >
                <Row>
                  <Col md="12">
                    <div className="p-2 rounded-[9px] relative">
                      <div className={`flex items-start justify-between`}>
                        <div>
                          <p
                            className={`poppins_medium text-xl sm:text-2xl  mb-0 capitalize ${
                              language === "ar" ? "text-right" : "text-left"
                            }`}
                          >
                            {item?.name}
                          </p>
                          <p
                            className={`poppins_regular text-sm  mb-0 capitalize ${
                              language === "ar" ? "text-right" : "text-left"
                            }`}
                          >
                            {item?.category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 mt-3 p-2">
                  <Col md="6" className="my-2">
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
                  <Col md="6" className="my-2">
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
                <Row className="justify-center my-2 mt-3 p-2">
                  <Col md="6">
                    <div
                      className={`poppins_medium text-base text_primary ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading")}
                    </div>
                    <div
                      className={`poppins_regular text-sm ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {moment
                        .utc(item?.start_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>

                  <Col md="6">
                    <div
                      className={`poppins_medium text-base text_primary ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading2")}
                    </div>
                    <div
                      className={`poppins_regular text-sm ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {moment
                        .utc(item?.end_date)
                        .local()
                        .format("DD MMMM, YYYY h:mm A")}{" "}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 p-2">
                  <Col md="6">
                    <div
                      className={`poppins_medium text-base text_primary ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading3")}
                    </div>
                    <div
                      className={`poppins_regular ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatPrice(convert(item?.depositamount, "LYD"))}
                    </div>
                  </Col>
                  <Col md="6">
                    <div
                      className={`poppins_medium text-base text_primary ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading7")}
                    </div>
                    <div
                      className={`poppins_regular ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {item?.status}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-center my-2 p-2">
                  <Col md="12">
                    <div
                      className={`poppins_medium text-[1.2rem] text-black ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("auctionDetails.heading4")}
                    </div>
                  </Col>
                  <Col md="12">
                    <div
                      className={`poppins_regular abDatadi text_dark ${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
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

          <Container
            fluid="xxl"
            className="bg_mainsecondary rounded-[9px] mt-4 mb-10 px-0 overflow-hidden"
          >
            <div className="bg-white rounded-[9px] shadow-xl overflow-hidden p-2 md:p-3">
              <h2 className="text-base sm:text-lg md:text-xl poppins_semibold text_primary px-[8px] sm:px-8  pt-2 md:pt-3">
                {t("auctionDetails.heading13")}
              </h2>

              {/* Content Section */}
              <div className="px-[12px] sm:px-8 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[24px]">
                  {Object.entries(item?.categoryInfo).map(([key, value]) => {
                    const matchedIcon = categoryIcons.find(
                      (icon) => icon.key === key
                    );
                    const Icon = matchedIcon?.icon || FaInfoCircle;
                    return (
                      <div
                        key={key}
                        className="group bg-gray-50 hover:bg-white rounded-xl p-2 p-md-3 transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-sm"
                      >
                        <div className="flex items-start gap-2">
                          {/* Icon */}
                          <div className="bg_primary rounded-full p-2 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                            <Icon className="text-white text-lg" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="poppins_medium text-base sm:text-lg mb-0">
                              {formatKey(key)}
                            </h3>
                            <div
                              className={`inline-flex items-center py-1 text-xs rounded-full sm:text-sm poppins_regular`}
                            >
                              {value}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>

          <Container fluid="xxl">
            <div>
              <p className={`poppins_medium text-2xl mb-0 `}>
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
