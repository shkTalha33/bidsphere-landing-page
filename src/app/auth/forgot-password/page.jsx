"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ApiFunction from "@/components/api/apiFuntions";
import { sendCodeForgotPassword } from "@/components/api/ApiFile";
import {
  setForgotCode,
  setIsForgotPassword,
} from "@/components/redux/loginForm";
import { message } from "antd";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setloading] = useState(false);
  const { t } = useTranslation();
  const { post } = ApiFunction();

  const router = useRouter();
  const dispatch = useDispatch();

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t("forgot.email_required"))
      .required(t("forgot.email_required")),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    setloading(true);
    const data = {
      email: values.email,
      type: "customer",
    };
    try {
      const response = await post(sendCodeForgotPassword, data);
      if (response.success) {
        dispatch(setIsForgotPassword(true));
        const data = {
          email: values?.email,
          token: response?.token,
          code: response?.verificationCode,
        };
        dispatch(setForgotCode(data));
        message.success(response?.message);
        router.push("/auth/verify-code");
      }
    } catch (error) {
      message.error(error?.data?.message || t("forgot.login_failed"));
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthLayout isCenter={true}>
      <>
        <AuthHeading
          heading={t("forgot.heading")}
          subHeading={t("forgot.sub_heading")}
        />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-4 auth-form"
        >
          <div className="col-span-6">
            <Label
              for="email"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="email"
                name="email"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("forgot.email_placeholder")}
                    className={`peer h-8 w-full poppins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${
                      errors.email
                        ? "border-red-500 ring-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 poppins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {t("forgot.email_placeholder")}
              </span>
            </Label>
            {errors.email && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button
              disabled={loading}
              type="submit"
              className="btn1 bg_primary text-white w-100"
            >
              {loading ? (
                <BeatLoader color="#fff" size={10} />
              ) : (
                t("forgot.send_code")
              )}
            </button>
          </div>
        </Form>
        <p className="pt-3 poppins_medium">
          {t("forgot.remembered")}{" "}
          <Link
            href="/auth/login"
            className="poppins_regular _link_underline text_primary"
          >
            {t("forgot.login")}
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default Page;
