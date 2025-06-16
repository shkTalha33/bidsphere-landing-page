/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import {
  checkMail,
  checkPhone,
  checkPhoneNumber,
  sendCode,
} from "@/components/api/ApiFile";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { setLogin, setTempData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";
import { handleError } from "@/components/api/errorHandler";
import { useTranslation } from "next-i18next";

const Page = () => {
  const { t } = useTranslation();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setloading] = useState(false);
  const { post } = ApiFunction();
  const router = useRouter();
  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.auth.tempData);
  const language = useSelector((state) => state.language?.language);

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordHidden((prev) => !prev);
  };

  const schema = Yup.object().shape({
    fname: Yup.string()
      .required(t("validation.firstNameRequired"))
      .min(2, t("validation.firstNameMinLength")),
    lname: Yup.string()
      .required(t("validation.lastNameRequired"))
      .min(2, t("validation.lastNameMinLength")),
    phone: Yup.string()
      .required(t("validation.phoneRequired"))
      .test(
        "isValidPhone",
        t("validation.invalidPhone"),
        (value) => value && value.length >= 10
      ),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength")),
    confirmPassword: Yup.string()
      .required(t("validation.confirmPasswordRequired"))
      .oneOf([Yup.ref("password"), null], t("validation.passwordsMustMatch")),
  });

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emailWatch = watch("email");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (tempData) {
      setValue("fname", tempData?.fname);
      setValue("lname", tempData?.lname);
      setValue("phone", tempData?.phone);
      setValue("email", tempData?.email);
    }
  }, [tempData]);

  const handlePhoneOnBlur = async (value) => {
    if (!value) {
      return;
    }
    await post(checkPhoneNumber, { phone: value, type: "customer" })
      .then((result) => {
        setValue("phone", value);
        clearErrors("phone");
        setloading(false);
      })
      .catch((err) => {
        setError("phone", {
          type: "manual",
          message: err?.response?.data?.message || t("validation.phoneExists"),
        });
        setloading(false);
        throw {
          message: err?.response?.data?.message || t("validation.phoneExists"),
        };
        setValue("phone", "");
      });
  };

  const handleEmailOnBlur = async (value) => {
    if (!value) return;
    await post(checkMail, { email: value, type: "customer" })
      .then((result) => {
        setValue("email", value);
        clearErrors("email");
        setloading(false);
      })
      .catch((err) => {
        setError("email", {
          type: "manual",
          message: err?.response?.data?.message || t("validation.emailExists"),
        });
        setloading(false);
        throw {
          message: err?.response?.data?.message || t("validation.emailExists"),
        };
        setValue("email", "");
      });
  };

  const onSubmit = async (values) => {
    setloading(true);
    try {
      // First validate phone
      await handlePhoneOnBlur(values.phone);
      await handleEmailOnBlur(values.email);
      const data = {
        email: values.email,
        type: "customer",
      };
      const response = await post(sendCode, data);

      if (response.message) {
        message.success(response?.message);
        const newData = {
          ...values,
        };
        const datane = {
          email: newData?.email,
          phone: newData?.phone,
          fname: newData?.fname,
          lname: newData?.lname,
          password: newData?.password,
        };

        dispatch(setTempData(datane));
        router.push("/auth/verify-code");
      }
    } catch (error) {
      message.error(error?.message || t("messages.signupFailed"));
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthLayout
      src={"/assets/auth2.png"}
      title={t("auth.secureTransactions")}
      description={t("auth.bidConfidently")}
    >
      <>
        <AuthHeading
          heading={t("auth.signUp")}
          subHeading={t("auth.signUpToAccount")}
          path={"/"}
        />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 grid grid-cols-6 gap-3 auth-form"
        >
          <div className="col-span-6">
            <Label
              for="fname"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              {t("form.firstName")}
            </Label>
            <Controller
              id="fname"
              name="fname"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="fname"
                  placeholder={t("form.firstNamePlaceholder")}
                  className={`h-12 w-full poppins_regular sm:text-sm ${
                    errors.fname
                      ? "border-red-500 ring-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              )}
            />
            {errors.fname && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.fname.message}
              </p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="lname"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              {t("form.lastName")}
            </Label>
            <Controller
              id="lname"
              name="lname"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="lname"
                  placeholder={t("form.lastNamePlaceholder")}
                  className={`h-12 w-full poppins_regular sm:text-sm ${
                    errors.lname
                      ? "border-red-500 ring-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              )}
            />
            {errors.lname && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.lname.message}
              </p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="phone"
              className="mb-2 text-sm poppins_regular text_secondary2"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {t("form.phoneNumber")}
            </Label>
            <div dir="ltr">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PhoneInput
                    country={"ae"}
                    enableSearch={true}
                    value={field.value}
                    className={`phon_inp poppins_regular ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("phone", value);
                    }}
                    placeholder={t("form.phonePlaceholder")}
                  />
                )}
              />
            </div>

            {errors.phone && (
              <span className="text-red-500 text-xs poppins_regular ms-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="email"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              {t("form.emailAddress")}
            </Label>
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
                  placeholder={t("form.emailAddressPlaceholder")}
                  className={`h-12 w-full poppins_regular sm:text-sm ${
                    errors.email
                      ? "border-red-500 ring-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="password"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              {t("form.password")}
            </Label>
            <div className="relative">
              <button
                className={`absolute inset-y-0 my-auto ${
                  language === "ar" ? "left-5" : "right-5"
                }`}
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
                    placeholder={t("form.passwordPlaceholder")}
                    className={`h-12 w-full poppins_regular sm:text-sm ${
                      errors.password
                        ? "border-red-500 ring-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="confirmPassword"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              {t("form.confirmPassword")}
            </Label>
            <div className="relative">
              <button
                className={`absolute inset-y-0 my-auto ${
                  language === "ar" ? "left-5" : "right-5"
                }`}
                onClick={toggleConfirmPassword}
              >
                {!isConfirmPasswordHidden ? (
                  <BsEyeFill size={20} className="text_black" />
                ) : (
                  <BsEyeSlashFill size={20} className="text_black" />
                )}
              </button>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isConfirmPasswordHidden ? "password" : "text"}
                    id="confirmPassword"
                    placeholder={t("form.confirmPasswordPlaceholder")}
                    className={`h-12 w-full poppins_regular sm:text-sm ${
                      errors.confirmPassword
                        ? "border-red-500 ring-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                )}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs m-1 poppins_regular">
                {errors.confirmPassword.message}
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
                t("auth.signUp")
              )}
            </button>
          </div>
        </Form>
        <p className="pt-3 poppins_regular">
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            href="/auth/login"
            className="_link_underline poppins_medium text_primary"
          >
            {t("auth.signIn")}
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default Page;
