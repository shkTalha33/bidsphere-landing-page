/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { avataruser } from "@/components/assets/icons/icon";
import AlertSection from "@/components/common/alertSection";
import useCurrency from "@/components/hooks/useCurrency";
import { Skeleton } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { BsCash } from "react-icons/bs";
import { TbArrowBackUp, TbMessage } from "react-icons/tb";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";
import { uploadFile } from "@/components/api/uploadFile";
import { X } from "react-feather";
import ApiFunction from "@/components/api/apiFuntions";
import { getInvoiceDetail, invoicePayment } from "@/components/api/ApiFile";
import toast from "react-hot-toast";
import DownloadInvoice from "./downloadInvoice";
import { handleError } from "@/components/api/errorHandler";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const Invoice = ({
  orderDetail,
  detailLoading,
  setData,
  setOrderDetail,
  urlInvoice,
  accountDetail,
}) => {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { put, get } = ApiFunction();
  const language = useSelector((state) => state.language.language);
  // payment proof modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();
  const handleBakcOr = () => {
    router.push("/orders");
  };
  // payment proof modal
  const paymentOptions = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "Stripe", label: "Stripe" },
    { value: "Other", label: "Other" },
  ];

  const schema = yup.object().shape({
    proofImg: yup
      .string()
      .url(t("order.heading38"))
      .required(t("order.heading39")),
    paymentMethod: yup.string().required(t("order.heading40")),
    otherMethod: yup.string().when("paymentMethod", {
      is: (val) => val === "Other",
      then: (schema) => schema.required("Please specify other method"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      proofImg: "",
      paymentMethod: "",
      otherMethod: "",
    },
  });
  const handleClose = () => {
    reset();
    setShow(false);
  };
  const selectedPayment = watch("paymentMethod");

  // proof image upload
  const getimgUrl = watch("proofImg");
  const handleImageChange = async (e, setValue) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    try {
      if (files.length > 0) {
        const uploadedImageUrl = await uploadFile(files[0]);
        setValue(
          "proofImg",
          uploadedImageUrl?.data?.image || uploadedImageUrl?.data?.video
        );
        clearErrors("proofImg");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // proof image remove
  const handleimgeRemove = () => {
    setValue("proofImg", "");
    const input = document.getElementById("proofImg");
    if (input) {
      input.value = "";
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const api = `${invoicePayment}/${orderDetail?.transaction?._id}`;
    const apiData = {
      paymentImage: data?.proofImg,
      paymentMethodType: data?.otherMethod
        ? data?.otherMethod
        : data?.paymentMethod,
    };
    put(api, apiData)
      .then((res) => {
        if (res?.success) {
          setOrderDetail((prev) => ({
            ...prev,
            transaction: res?.transaction,
          }));
          // update the invoice in the table component

          setData((prevData) =>
            prevData.map((item) =>
              item?._id === urlInvoice
                ? { ...item, transaction: res?.transaction }
                : item
            )
          );
          handleClose();
          toast.success(t("order.heading43"));
        } else {
          toast.error(t("order.heading42"));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <Container className="bg_white rounded-[9px] p-2 p-md-4">
      {detailLoading ? (
        <Skeleton active />
      ) : (
        <>
          <section>
            <h4
              className={`poppins_semibold text-base md:text-xl text-[#202020] capitalize mb-4 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("order.heading44")}
            </h4>

            {/* Auction Info */}
            <Row className="bg_white rounded-[7px] border border-[#F8F9FA] shadow-sm items-start p-2 p-md-4 mb-4">
              <Col xs="10">
                <div className="flex items-start gap-2 gap-md-4">
                  <div>
                    <div className="md:h-[3rem] md:w-[3rem] h-[2rem] w-[2rem]">
                      <img
                        src={orderDetail?.auction?.images?.[0]}
                        alt="Auction"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 w-full justify-center">
                    <p className="text-[#25324B] poppins_semibold text-base sm:text-lg capitalize mb-1">
                      {orderDetail?.auction?.name}
                    </p>
                    <div
                      className="text-[#7C8493] poppins_medium text-xs md:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: orderDetail?.auction?.additionalinfo,
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col xs="2">
                <div className="flex items-center gap-2">
                  <div
                    onClick={handleBakcOr}
                    className="bg_lightsecondary md:w-9 md:h-9 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                  >
                    <TbArrowBackUp
                      color="#660000"
                      className="text-xl md:text-2xl"
                    />
                  </div>
                  {(orderDetail?.transaction?.status === "pending" ||
                    orderDetail?.transaction?.status === "rejected") && (
                    <div
                      onClick={handleShow}
                      className="text-[1rem] py-[5px] px-[10px] bg-[#660000] text-white rounded-[8px] poppins_regular whitespace-nowrap flex items-center gap-2 cursor-pointer"
                    >
                      <BsCash />
                      {t("order.heading45")}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <h3
              className={`text-[#25324B] mb-2 text-base md:text-[1.2rem] poppins_semibold ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("order.heading46")}
            </h3>
            <div className="grid md:grid-cols-2 gap-2 gap-md-4 mb-3 border-b pb-2">
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading47")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {accountDetail?.accountDetails?.bankname}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading48")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {accountDetail?.accountDetails?.acc_number}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading49")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {accountDetail?.accountDetails?.acc_name}
                </p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-2 gap-md-4 mb-4">
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading50")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.transaction?.invoice_num}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading51")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {moment(orderDetail?.transaction?.issue_date)
                    .local()
                    .format("LLL")}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading52")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {moment(orderDetail?.transaction?.expirey_date)
                    .local()
                    .format("LLL")}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading53")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.transaction?.paymentMethodType}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading54")}
                </p>
                <p
                  className={`text-[#28a745] poppins_semibold capitalize ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.transaction?.status}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading55")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {formatPrice(
                    convert(orderDetail?.transaction?.amount, "LYD")
                  )}
                </p>
              </div>
            </div>

            {/* Payment Proof Image */}
            {orderDetail?.transaction?.paymentImage && (
              <div className="mb-4">
                <p
                  className={`text-[#7C8493] text-sm mb-2 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading56")}
                </p>
                <img
                  src={orderDetail.transaction.paymentImage}
                  alt="Payment Proof"
                  className={`w-full max-w-xs rounded shadow ${
                    language === "ar" ? "ml-auto" : "mr-auto"
                  }`}
                />
              </div>
            )}

            {/* Shipping Info */}
            <div className="grid md:grid-cols-2 gap-2 gap-md-4">
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading57")}
                </p>
                <p className="text-[#25324B] poppins_medium">
                  {orderDetail?.user?.fname} {orderDetail?.user?.lname}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading58")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.user?.email}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading59")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.address}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading60")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {moment(orderDetail?.deliveryDate).local().format("LLL")}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading61")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {moment(orderDetail?.shippedDate).local().format("LLL")}
                </p>
              </div>
              <div>
                <p
                  className={`text-[#7C8493] text-sm mb-1 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("order.heading62")}
                </p>
                <p
                  className={`text-[#25324B] poppins_medium ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {orderDetail?.trackingnumber}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              {/* <DownloadInvoice invoiceID={orderDetail?._id} /> */}
            </div>
          </section>
        </>
      )}

      {/* payment modal */}

      <Modal show={show} backdrop="static" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="poppins_regular text-[1rem]">
            {t("order.heading45")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            {/* Username */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="px-4 text-center w-[100%] cursor-pointer border border-input relative py-2">
                <input
                  type="file"
                  id="proofImg"
                  accept="image/*"
                  disabled={isUploading}
                  className="form-control borderCus absolute opacity-0 rounded-md p-2"
                  onChange={(e) => handleImageChange(e, setValue)}
                />
                {t("order.heading63")}
              </div>
              <div className="relative flex shrink-0 overflow-hidden">
                {isUploading ? (
                  <>
                    <div className="flex items-center justify-center w-100">
                      <Spinner />
                    </div>
                  </>
                ) : (
                  <>
                    {getimgUrl && (
                      <>
                        <div className="h-[4rem] w-[4rem]">
                          <img
                            className="h-full w-full rounded-[10px] object-cover"
                            src={getimgUrl}
                          />
                        </div>
                        <div
                          onClick={handleimgeRemove}
                          className="absolute inset-0 cursor-pointer bg-black/50 w-fit h-fit rounded-[50%]"
                        >
                          <X className="text-white " size={18} />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {errors.proofImg && (
                <p className="text-red-500">{errors.proofImg.message}</p>
              )}
            </div>
            {/* Select payment method */}
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="paymentMethod  poppins_regular">
                {t("order.heading64")}
              </label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={paymentOptions}
                    placeholder="Select Method"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    } // just send value to form
                    value={paymentOptions.find(
                      (opt) => opt.value === field.value
                    )} // controlled value
                  />
                )}
              />
              {errors.paymentMethod && (
                <p className="text-red-500 text-[0.7rem]">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Show custom input if "Other" is selected */}
            {selectedPayment === "Other" && (
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="otherMethod poppins_regular">
                  {t("order.heading65")}
                </label>
                <Controller
                  name="otherMethod"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="otherMethod"
                      placeholder="Specify other method"
                      className="border p-2"
                      {...field}
                    />
                  )}
                />
                {errors.otherMethod && (
                  <p className="text-red-500 text-[0.7rem]">
                    {errors.otherMethod.message}
                  </p>
                )}
              </div>
            )}

            <Button
              disabled={loading || isUploading}
              className="w-full h-[3.5rem] mt-6 bg_primary border-0"
              type="submit"
            >
              {" "}
              {loading ? (
                <>{t("payment.heading22")}</>
              ) : (
                <>{t("order.heading66")}</>
              )}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Invoice;
