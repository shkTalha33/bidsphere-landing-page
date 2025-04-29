/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import {
  auctionDetail,
  createPaymentStripe,
  getstripKey,
} from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import { googlePay, paypal, stripe } from "@/components/assets/icons/icon";
import { setAuctionRegistrationData } from "@/components/redux/auctionRegistration";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "debounce";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import {
  selectKeysObject,
  setKeysObject,
} from "@/components/redux/stripKey/stripKey";
import { Spinner } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import StripPayment from "@/components/stripPayment/stripPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "antd";
import { FaCreditCard } from "react-icons/fa6";
import {
  selectProgress,
  selectRegisterData,
  setActiveStep,
  setRegisterData,
  setsliceProgress,
} from "@/components/redux/registrationSlice/resgiterSlice";

const PaymentDetail = ({
  setProgress,
  setIsCompleted,
  isCompleted,
  setActive,
}) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { get, post, userData } = ApiFunction();
  const pathname = usePathname();
  const stripKeysData = useSelector(selectKeysObject);
  const formData = useSelector(selectRegisterData);
  const progress = useSelector(selectProgress);

  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const urlStatus = urlParams.get("redirect_status");

  const fetchAuctionDetail = debounce(async () => {
    setLoading(true);
    await get(`${auctionDetail}${id}`)
      .then((result) => {
        // if (result?.success) {
        setItem(result?.auction);
        // }
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

  const handlenavoiu = () => {
    const data = {
      paymentId: stripKeysData?.paymentId,
      amount: item?.depositamount,
    };
    if (!isCompleted?.security) {
      if (progress === 66) {
        dispatch(setsliceProgress(34));
      }
      setIsCompleted((prev) => ({ ...prev, security: true }));
    }
    const mergedData = {
      ...formData,
      ...data,
    };
    // Encrypt and encode
    dispatch(setRegisterData(mergedData));
    dispatch(setActiveStep("review"));
  };

  // payment start strip

  const [clientSecret, setClientSecret] = useState("");
  const [stripeModal, setstripeModal] = useState(false);

  const [stripeKey, setstripeKey] = useState("");
  const stripePromise = loadStripe(stripeKey);

  const appearance = {
    theme: "minimal",
  };
  const options = {
    clientSecret,
    appearance,
    loader: "auto",
  };

  const [isLoading2, setIsLoading2] = useState(false);
  const [isTriger, setIsTriger] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // hadnle get key
  const handleGetKey = () => {
    const api = getstripKey;
    get(api)
      .then((res) => {
        if (res?.success) {
          setstripeKey(res?.publisheableKey);
        } else {
          handleError(res);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    handleGetKey();
  }, []);

  // create payment intent
  const handleCreatePayment = () => {
    const api = createPaymentStripe;
    const apiData = {
      amount: item?.depositamount?.toFixed(),
    };
    post(api, apiData)
      .then((res) => {
        if (res?.paymentIntent) {
          dispatch(setKeysObject(res));
          setClientSecret(res?.paymentIntent);
          setstripeModal(true);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <>
      <Container className="bg_white rounded-[9px] mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
        <Form
          // onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-2 w-100"
        >
          <Row className="g-8">
            <Col md="6">
              <div className="mb-3">
                <label className="poppins_medium" htmlFor="amount">
                  Amount
                </label>
                <input
                  id="amount"
                  type="text"
                  className="form-control"
                  value={item?.depositamount}
                  disabled
                  placeholder="Enter Here"
                />
              </div>
            </Col>
            <Col md="6" className="text-center">
              <div>
                {formData?.paymentId || urlStatus === "succeeded" ? (
                  <>
                    <div className="mb-3 text-lg poppins_semibold">
                      Payment Already Done with Strip
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3 text-lg poppins_semibold">
                      Payment with Stripe
                    </div>
                    <div
                      onClick={handleCreatePayment}
                      className="bg_primary w-fit cursor-pointer text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg flex items-center justify-center gap-2"
                    >
                      <FaCreditCard size={20} /> {/* Stripe icon */}
                      Pay with Stripe
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end mt-3">
                {urlStatus === "succeeded" && (
                  <>
                    <div
                      onClick={handlenavoiu}
                      className="bg_primary w-fit cursor-pointer text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
                    >
                      Next
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* strip modal */}

      <Modal
        open={stripeModal}
        onCancel={() => setstripeModal(false)}
        footer={false}
        centered
        style={{ zIndex: 9999 }}
        closeIcon={null}
      >
        <div className="flex flex-col overflow-hidden gap-3 mt-4 w-full">
          {stripKeysData && (
            <div className="w-full">
              <Elements options={options} stripe={stripePromise}>
                <StripPayment
                  setIsLoading={setIsLoading2}
                  isTriger={isTriger}
                  email={userData?.email}
                  redirectURL={pathname}
                  setDisable={setIsProcessing}
                />
              </Elements>
            </div>
          )}
          <button
            type="button"
            disabled={clientSecret === "" || isLoading2 || isProcessing}
            onClick={() => {
              setIsTriger(true);
            }}
            className="w-100 py-[12px] mt-3 w-full flex justify-center px-5 plusJakara_medium rounded-5 bg_primary text_white"
          >
            {isLoading2 ? <Spinner size={18} color="#fff" /> : "Pay Amount"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentDetail;
