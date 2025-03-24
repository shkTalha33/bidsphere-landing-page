/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { auctionDetail } from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import { googlePay, paypal, stripe } from "@/components/assets/icons/icon";
import { setAuctionRegistrationData } from "@/components/redux/auctionRegistration";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "debounce";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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

const paymentMethods = [
  {
    name: "googlePay",
    label: "Google Play",
    email: "aaronramsdale@gmail.com",
    icon: googlePay,
  },
  {
    name: "stripe",
    label: "Stripe",
    email: "aaronramsdale@gmail.com",
    icon: stripe,
  },
  {
    name: "paypal",
    label: "PayPal",
    email: "aaronramsdale@gmail.com",
    icon: paypal,
  },
];

const PaymentMethod = ({ method, currentMethod, onClick }) => (
  <div
    className={`border ${
      currentMethod === method.name
        ? "border-[#5B0F001C] bg-[#E7FAF4]"
        : "border-[#E7FAF4]"
    } rounded-2xl p-3 flex gap-4 cursor-pointer items-center`}
    onClick={() => onClick(method.name)}
  >
    <div
      className={`flex items-center justify-center h-12 w-12 rounded-full ${
        currentMethod === method.name ? "bg-white" : "bg-[#E7FAF4]"
      }`}
    >
      <Image
        src={method.icon}
        width={24}
        height={24}
        alt={method.label}
        className="w-6 h-6"
      />
    </div>
    <div>
      <h6 className="text-[#0D0D12] poppins_medium mb-1">{method.label}</h6>
      <p className="text-[#818898] text-sm mb-0">{method.email}</p>
    </div>
  </div>
);

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
  const { get } = ApiFunction();
  const schema = Yup.object().shape({
    paymentId: Yup.string().required("Payment Method is required"),
  });

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

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentId: "",
      amount: "",
    },
  });

  const currentMethod = watch("paymentId");

  const handleMethodSelect = (methodName) => {
    setValue("paymentId", methodName, { shouldValidate: true });
  };

  const onSubmit = async (formData) => {
    const data = {
      paymentId: formData?.paymentId,
      amount: item?.depositamount,
    };
    setProgress((prev) => {
      const newProgress = !isCompleted?.security ? parseInt(prev) + 34 : prev;
      if (newProgress >= 100) {
        setActive("review");
      }
      return newProgress;
    });

    if (!isCompleted?.security) {
      setIsCompleted((prev) => ({ ...prev, security: true }));
    }

    dispatch(setAuctionRegistrationData(data));
  };

  return (
    <Container className="bg_white rounded-[9px] mt-2 p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D] custom_form">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-2 w-100"
      >
        <Row className="g-8">
          <Col md="6">
            <Label className="poppins_medium" for="amount">
              Amount
            </Label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="amount"
                  disabled
                  value={item?.depositamount}
                  placeholder="Enter Here"
                  invalid={!!errors.amount}
                />
              )}
            />
            {errors.amount && (
              <FormFeedback>{errors.amount.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label className="form-label" for="paymentId">
                Payment Method
              </Label>
              <div className="flex flex-col gap-2">
                {paymentMethods.map((method) => (
                  <PaymentMethod
                    key={method.name}
                    method={method}
                    currentMethod={currentMethod}
                    onClick={handleMethodSelect}
                  />
                ))}
              </div>
              {errors.paymentId && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.paymentId.message}
                </p>
              )}
            </div>
          </Col>
        </Row>
        <Col md="6" className="text-end ml-auto">
          <button
            type="submit"
            disabled={loading}
            className="bg_primary text-white whitespace-nowrap px-5 py-2 rounded-lg poppins_medium text-base sm:text-lg"
          >
            Confirm Payment
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default PaymentDetail;
