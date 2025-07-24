/* eslint-disable @next/next/no-img-element */
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
import { useTranslation } from "react-i18next";
import { uploadFile } from "@/components/api/uploadFile";
import { FiUploadCloud } from "react-icons/fi";
const PaymentDetail = ({
  setProgress,
  setIsCompleted,
  isCompleted,
  setActive,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
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

  const [walletUsed, setWalletUsed] = useState(false);
  const [cashUsed, setCashUsed] = useState(false);
  const [bankUsed, setBankUsed] = useState(false);
  const [bankImage, setBankImage] = useState(null);
  const [bankImageUrl, setBankImageUrl] = useState("");
  const [bankUploading, setBankUploading] = useState(false);
  const [bankError, setBankError] = useState("");
  // Add a state to track the selected payment method
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlenavoiu = () => {
    let data;
    if (walletUsed) {
      data = {
        walletBalance: item?.depositamount,
        amount: item?.depositamount,
      };
    } else if (cashUsed) {
      data = {
        cash: true,
        amount: item?.depositamount,
      };
    } else if (bankUsed) {
      data = {
        bank: bankImageUrl,
        amount: item?.depositamount,
      };
    } else {
      data = {
        paymentId: stripKeysData?.paymentId,
        amount: item?.depositamount,
      };
    }

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

  // Determine if payment is already completed
  const paymentCompleted =
    !!formData?.paymentId ||
    !!formData?.walletBalance ||
    !!formData?.bank ||
    formData?.cash === true;

  // Update selection logic for payment methods
  // When a method is selected, set selectedMethod accordingly
  useEffect(() => {
    if (walletUsed) {
      setSelectedMethod("wallet");
    } else if (cashUsed) {
      setSelectedMethod("cash");
    } else if (bankUsed) {
      setSelectedMethod("bank");
    } else {
      setSelectedMethod(null);
    }
  }, [walletUsed, cashUsed, bankUsed]);

  return (
    <>
      <Container
        className={`bg_white rounded-[9px] mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form ${
          isRTL ? "text-right" : ""
        }`}
      >
        <Form
          // onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-2 w-100"
        >
          <Row className="g-8">
            <Col md="6">
              <div className="mb-3">
                <label className="poppins_medium" htmlFor="amount">
                  {t("payment.amount")}
                </label>
                <input
                  id="amount"
                  type="text"
                  className="form-control"
                  value={item?.depositamount}
                  disabled
                  placeholder={t("payment.enterHere")}
                />
              </div>
            </Col>
            <Col md="6" className="text-center">
              {/* Wallet Balance Display at Top */}
              <div
                className={`bg-gray-100 p-3 rounded-md mb-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div className="text-sm text-gray-700">
                  {t("payment.walletBalance")}:{" "}
                  <span className="font-bold text-black">
                    ${userData?.walletBalance || 0}
                  </span>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                {paymentCompleted ? (
                  <div className="mb-3 text-lg poppins_semibold text-green-600">
                    {t("payment.paymentDoneWith")}{" "}
                    <span className="font-bold">
                      {formData?.walletBalance
                        ? t("payment.paymentMethod.wallet")
                        : formData?.cash === true
                        ? t("payment.paymentMethod.cash")
                        : t("payment.paymentMethod.stripe")}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 text-lg poppins_semibold text-gray-800">
                      {t("payment.choosePaymentMethod")}
                    </div>

                    {/* Payment Method Selection UI */}
                    {selectedMethod === "bank" ? (
                      <div className="flex flex-col items-center w-full sm:w-auto bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-3 text-lg poppins_semibold text-purple-700">
                          {t("payment.payWithBank")}
                        </div>

                        {/* Upload Box with Icon */}
                        <label className="relative w-full max-w-xs h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition">
                          <FiUploadCloud
                            size={32}
                            className="text-gray-500 mb-2"
                          />
                          <span className="text-sm text-gray-500">
                            {t("payment.uploadProof")}
                          </span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            disabled={bankUploading}
                            onChange={async (e) => {
                              setBankError("");
                              const file = e.target.files[0];
                              if (!file) return;
                              setBankUploading(true);
                              try {
                                const response = await uploadFile(file);
                                const url =
                                  response.data.image || response.data.video;
                                setBankImageUrl(url);
                                setBankImage(file);
                              } catch (err) {
                                setBankError(t("order.heading38"));
                              }
                              setBankUploading(false);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </label>

                        {/* Uploading Spinner */}
                        {bankUploading && (
                          <Spinner size="sm" color="purple" className="mt-2" />
                        )}

                        {/* Uploaded Image Preview */}
                        {bankImageUrl && (
                          <div className="mt-2">
                            <a
                              href={bankImageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={bankImageUrl}
                                alt="Bank Proof"
                                style={{
                                  maxWidth: 120,
                                  maxHeight: 120,
                                  borderRadius: 8,
                                }}
                              />
                            </a>
                          </div>
                        )}

                        {/* Error Message */}
                        {bankError && (
                          <div className="text-red-500 text-sm mt-2">
                            {bankError}
                          </div>
                        )}

                        {/* Back Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMethod(null);
                            setBankUsed(false);
                            setBankImage(null);
                            setBankImageUrl("");
                            setBankError("");
                          }}
                          className="mt-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 poppins_medium"
                        >
                          {t("auctionJoin.heading46")}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-4 w-full">
                        {/* Stripe Button */}
                        <div
                          onClick={() => {
                            handleCreatePayment();
                            setWalletUsed(false);
                            setCashUsed(false);
                            setBankUsed(false);
                            setSelectedMethod("stripe");
                          }}
                          className={`flex-1 min-w-[150px] sm:min-w-[180px] text-center transition-all cursor-pointer text-white px-4 py-2 rounded-lg poppins_medium text-sm sm:text-base flex items-center justify-center gap-2 ${
                            selectedMethod === "stripe"
                              ? "bg_primary"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          <FaCreditCard size={18} />
                          {t("payment.payWithStripe")}
                        </div>

                        {/* Cash Button */}
                        <div
                          onClick={() => {
                            setCashUsed(true);
                            setWalletUsed(false);
                            setBankUsed(false);
                            setSelectedMethod("cash");
                          }}
                          className={`flex-1 min-w-[150px] sm:min-w-[180px] text-center transition-all cursor-pointer text-white px-4 py-2 rounded-lg poppins_medium text-sm sm:text-base ${
                            selectedMethod === "cash"
                              ? "bg_primary"
                              : "bg-yellow-600 hover:bg-yellow-700"
                          }`}
                        >
                          {t("payment.payWithCash")}
                        </div>

                        {/* Bank Transfer Button */}
                        <div
                          onClick={() => {
                            setBankUsed(true);
                            setWalletUsed(false);
                            setCashUsed(false);
                            setSelectedMethod("bank");
                          }}
                          className={`flex-1 min-w-[150px] sm:min-w-[180px] text-center transition-all cursor-pointer text-white px-4 py-2 rounded-lg poppins_medium text-sm sm:text-base ${
                            selectedMethod === "bank"
                              ? "bg_primary"
                              : "bg-purple-600 hover:bg-purple-700"
                          }`}
                        >
                          {t("payment.payWithBank")}
                        </div>

                        {/* Wallet Button */}
                        {userData?.walletBalance >= item?.depositamount ? (
                          <div
                            onClick={() => {
                              setWalletUsed(true);
                              setCashUsed(false);
                              setBankUsed(false);
                              setSelectedMethod("wallet");
                            }}
                            className={`flex-1 min-w-[150px] sm:min-w-[180px] text-center transition-all cursor-pointer text-white px-4 py-2 rounded-lg poppins_medium text-sm sm:text-base ${
                              selectedMethod === "wallet"
                                ? "bg_primary"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            {t("payment.payWithWallet")}
                          </div>
                        ) : (
                          <div className="text-red-500 text-sm mt-2 w-full text-center">
                            {t("payment.insufficientWalletBalance")}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* NEXT Button */}
              <div
                className={`flex ${
                  isRTL ? "justify-start" : "justify-end"
                } mt-3`}
              >
                {(urlStatus === "succeeded" ||
                  walletUsed ||
                  cashUsed ||
                  (bankUsed && bankImageUrl)) && (
                  <div
                    onClick={handlenavoiu}
                    className="bg_primary hover:bg-indigo-700 transition-all w-fit cursor-pointer text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
                  >
                    {t("common.next")}
                  </div>
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
            {isLoading2 ? (
              <Spinner size={18} color="#fff" />
            ) : (
              t("payment.payAmount")
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentDetail;
