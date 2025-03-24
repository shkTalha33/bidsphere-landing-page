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

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setloading] = useState(false);
  const { post } = ApiFunction();
  const router = useRouter();
  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.auth.tempData);

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    fname: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lname: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .test(
        "isValidPhone",
        "Invalid phone number",
        (value) => value && value.length >= 10
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
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
          message:
            err?.response?.data?.message || "Phone number already exists",
        });
        setloading(false);
        throw {
          message:
            err?.response?.data?.message || "Phone number already exists",
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
          message: err?.response?.data?.message || "Email already exists",
        });
        setloading(false);
        throw {
          message: err?.response?.data?.message || "Email already exists",
        };
        setValue("email", "");
      });
  };

  const onSubmit = async (values) => {
    setloading(true);
    try {
      // Pehle phone validate hoga
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
          // code: response.verificationCode,
        };
        dispatch(setTempData(newData));
        router.push("/auth/verify-code");
      }
    } catch (error) {
      // Agar kisi bhi validation me error aya to yah handle karega
      message.error(error?.message || "Signup failed");
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthLayout
      src={"/assets/auth2.png"}
      title="Secure & Transparent Transactions"
      description="Bid confidently with encrypted payments and fraud protection."
    >
      <>
        <AuthHeading
          heading="Sign up"
          subHeading="Sign up to your account"
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
              First Name
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
                  placeholder="Your first name"
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
              Last Name
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
                  placeholder="Your last name"
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
                    setValue("phone", value); // React Hook Form state update karega
                  }}
                  // onBlur={() => handlePhoneOnBlur(field.value)} // API call karega
                  placeholder="Enter phone number"
                />
              )}
            />

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
              Email Address
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
                  // onBlur={(e) => {
                  //   field.onChange(e);
                  //   handleEmailOnBlur(e.target.value);
                  // }}
                  placeholder="Your Email address"
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
              Password
            </Label>
            <div className="relative">
              <button
                className="absolute right-5 inset-y-0 my-auto"
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
                    placeholder="Password"
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

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button
              disabled={loading}
              type="submit"
              className="btn1 primary w-100"
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
            </button>
          </div>
        </Form>
        <p className="pt-3 poppins_regular">
          Already have an Account?{" "}
          <Link
            href="/auth/login"
            className="_link_underline poppins_medium text_primary"
          >
            Sign in
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default Page;
