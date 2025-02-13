"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { usePostMutation } from "@/components/redux/apiSlice2";
import { setForgotCode, setIsForgotPassword } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [createPost] = usePostMutation();
  const [loading, setloading] = useState(false)
  const { t } = useTranslation()

  const router = useRouter()
  const dispatch = useDispatch()

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    email: Yup.string().email(t("auth.validation.invalidEmail")).required(t("auth.validation.emailRequired")),
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
    setloading(true)
    try {
      const response = await createPost({
        endpoint: 'api/auth/forget-password',
        data: values,
        tag: 'Auth',
      }).unwrap();
      if (response.success) {
        dispatch(setIsForgotPassword(true))
        const data = {
          email: values?.email,
          token: response?.token
        }
        dispatch(setForgotCode(data))
        message.success('We have sent an verification code in your email');
        router.push('/auth/verify-code');
      }
    } catch (error) {
      message.error(error?.data?.message || 'Login failed');
      console.log('console', error);
    } finally {
      setloading(false)
    }
  };


  return (
    <AuthLayout>
      <>
        <AuthHeading heading={t("auth.forgot_password.title")} subHeading={t("auth.forgot_password.subtitle")} />
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
                    placeholder={t("auth.forgot_password.email")}
                    // invalid={!!errors.email}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.email ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {t("auth.forgot_password.email")}
              </span>
            </Label>
            {errors.email && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.email.message}</p>
            )}
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button disabled={loading} type="submit" className="btn1 primary w-100">
              {loading ? <BeatLoader color="#fff" size={10} /> : t("auth.forgot_password.btnLabel")}
            </button>
          </div>
        </Form>
        <p className="pt-3 popins_medium text_secondary2">
        {t("auth.forgot_password.rememberPassword")}{" "}
          <Link href="/auth/login" className="no-underline popins_semibold">
          {t("auth.forgot_password.loginBtnLabel")}
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};
export default Page;