/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Progress, Tabs } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import DocumentUpload from "./documentUpload";
import PaymentDetail from "./paymentDetail";
import PersonalInfo from "./personalInfo";
import ReviewAndSubmit from "./ReviewAndSubmit";
import {
  selectActiveStep,
  selectProgress,
  selectRegisterData,
  setActiveStep,
  setRegisterData,
  setsliceProgress,
} from "@/components/redux/registrationSlice/resgiterSlice";
import { useDispatch, useSelector } from "react-redux";
import ApiFunction from "@/components/api/apiFuntions";
import { getAuctionRegister } from "@/components/api/ApiFile";
import { useTranslation } from "react-i18next";
const RegistrationDetail = () => {
  const { get, userData } = ApiFunction();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const formData = useSelector(selectRegisterData);
  const { t } = useTranslation();
  // const [progress, setProgress] = useState(0);
  const progress = useSelector(selectProgress); // This should give the updated progress

  console.log(progress, "progress");

  const [data, setData] = useState({});
  // const [active, setActive] = useState("personal");
  const active = useSelector(selectActiveStep);
  // get register data
  const handleRegisterAuction = () => {
    const api = `${getAuctionRegister}/${userData?._id}`;
    get(api)
      .then((res) => {
        if (res?.success && res?.data) {
          dispatch(setRegisterData(res?.data));
          console.log(res?.data, "res?.data");

          if (progress === 0 && progress !== 66) {
            console.log("aya ay ");
            
            dispatch(setsliceProgress(33));
            setIsCompleted((prev) => ({ ...prev, personal: true }));
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!formData?.fname && userData?._id) {
      handleRegisterAuction();
    }
  }, [formData, userData]);

  const [isCompleted, setIsCompleted] = useState({
    personal: false,
    document: false,
    security: false,
  });

  const items = [
    {
      key: "personal",
      label: t("auctionRegistration.heading2"),
      children: (
        <PersonalInfo
          // setActive={setActive}
          setIsCompleted={setIsCompleted}
          isCompleted={isCompleted}
          active={active}
        />
      ),
    },
    {
      key: "document",
      label: t("auctionRegistration.heading6"),
      disabled: progress < 33,
      children: (
        <DocumentUpload
          // setActive={setActive}
          setIsCompleted={setIsCompleted}
          isCompleted={isCompleted}
        />
      ),
    },
    {
      key: "security",
      label: t("auctionRegistration.heading7"),
      disabled: progress < 66,
      children: (
        <PaymentDetail
          // setActive={setActive}
          setIsCompleted={setIsCompleted}
          isCompleted={isCompleted}
          progress={progress}
        />
      ),
    },
    {
      key: "review",
      label: t("auctionRegistration.heading8"),
      disabled: progress < 100,
      children: (
        <ReviewAndSubmit data={data} setData={setData} progress={progress} />
      ),
    },
  ];

  const onChange = (tab) => {
    dispatch(setActiveStep(tab));
    // setActive(tab);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const selectedTab = params.get("selected");
    if (selectedTab) {
      // setActive(selectedTab);
    } else {
      // params.set("selected", "personal");
      // window.history.replaceState(
      //   {},
      //   "",
      //   `${window.location.pathname}?${params}`
      // );
      // setActive("personal");
    }
  }, []);

  return (
    <>
      <Container className="bg_white rounded-[9px] p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Registration"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark">
              {t("auctionRegistration.heading")}
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white rounded-[9px] mt-2 md:mt-4 p-3 md:p-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md="12">
            <h3 className="capitalize poppins_semibold text-lg sm:text-xl md:text-2xl text_dark mb-1 md:mb-[10px]">
              {t("auctionRegistration.heading2")}
            </h3>
            <h3 className="capitalize poppins_regular text-xs sm:text-sm md:text-lg text_secondary2">
              {t("auctionRegistration.heading3")}
            </h3>
          </Col>
          <Col md="12" className="mt-2 md:mt-4">
            <h3 className="capitalize poppins_regular text-sm sm:text-lg md:text-xl text-[#8D8D8D] mb-[10px]">
              {t("auctionRegistration.heading4")}
            </h3>
            <h3 className="capitalize poppins_regular text-xs sm:text-base md:text-lg text_primary mb-2">
              {progress}% {t("auctionRegistration.heading5")}
            </h3>
            <div>
              <Progress
                percent={progress}
                strokeColor={"#660000"}
                size={["100%", 8]}
                showInfo={false}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="bg_mainsecondary rounded-[9px] mt-2 md:mt-4">
        <Row>
          <Col md="12" className="!px-0">
            <Tabs
              activeKey={active}
              size="large"
              items={items}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationDetail;
