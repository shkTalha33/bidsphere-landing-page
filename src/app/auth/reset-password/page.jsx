"use client";

import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { usePostMutation } from "@/components/redux/apiSlice2";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const forgotCode = useSelector((state) => state.auth?.forgotCode)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [createPost] = usePostMutation();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation()

  const router = useRouter();

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.passwordConfirm")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const data = {
      new_password: values.password,
      token: forgotCode?.token,
    }
    try {
      const response = await createPost({
        endpoint: "api/auth/reset-password",
        data: data,
        tag: "Auth",
      }).unwrap();
      if (response.success) {
        message.success("Your password has been reset successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      message.error(error?.data?.message || "Password reset failed");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <>
        <AuthHeading heading={t("auth.reset_password.title")} subHeading={t('auth.reset_password.subtitle')} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-4 auth-form"
        >
          <div className="col-span-6">
            <Label
              for="password"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <button
                className="absolute right-3 inset-y-0 my-auto"
                onClick={togglePassword}
              >
                {!isPasswordHidden ? (
                  <BsEyeFill size={20} className="text_black" />
                ) : (
                  <BsEyeSlashFill size={20} className="text_black" />
                )}
              </button>
              <Controller
                id="password"
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isPasswordHidden ? "password" : "text"}
                    id="password"
                    placeholder={t("auth.reset_password.password")}
                    name="password"
                    //     invalid={!!errors.password}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.password ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {t("auth.reset_password.password")}
              </span>
            </Label>
            {errors.password && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.password.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="confirmPassword"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <button
                className="absolute right-3 inset-y-0 my-auto"
                onClick={toggleConfirmPassword}
              >
                {!isConfirmPasswordHidden ? (
                  <BsEyeFill size={20} className="text_black" />
                ) : (
                  <BsEyeSlashFill size={20} className="text_black" />
                )}
              </button>
              <Controller
                id="confirmPassword"
                name="confirmPassword"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isConfirmPasswordHidden ? "password" : "text"}
                    id="confirmPassword"
                    placeholder={t("auth.reset_password.confirmPassword")}
                    name="confirmPassword"
                    // invalid={!!errors.confirmPassword}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.confirmPassword ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {t("auth.reset_password.confirmPassword")}
              </span>
            </Label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button disabled={loading} type="submit" className="btn1 primary w-100">
              {loading ? <BeatLoader color="#fff" size={10} /> : t("auth.reset_password.btnLabel")}
            </button>
          </div>
        </Form>
      </>
    </AuthLayout>
  );
};

export default Page