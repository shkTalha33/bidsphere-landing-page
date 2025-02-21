"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { checkMail, checkPhone, sendCode } from "@/components/api/ApiRoutesFile";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { setLogin, setTempData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setloading] = useState(false);
  const { post } = ApiFunction();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      type: "customer",
    };
    setloading(true);
    try {
      const response = await post(sendCode, data);
      if (response.message) {
        message.success(response?.message);
        const newData = {
          ...values,
          code: response.verificationCode,
        };
        dispatch(setTempData(newData));
        router.push("/auth/verify-code");
      }
    } catch (error) {
      message.error(error?.data?.message || "Signup failed");
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phone", "+" + value);
    trigger("phone");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailOnBlur = async (value) => {
    if (!value) {
      return;
    }
    if (!isValidEmail(value)) {
      setError("email", {
        type: "manual",
        message: "Please enter a valid email address.",
      });
      return;
    }else{
      clearErrors('email')
    }

    await post(checkMail, { email: value, type: "customer" })
      .then((result) => {
        setValue('email', value)
        clearErrors('email')
      })
      .catch((err) => {
        setError("email", {
          type: "manual",
          message: err?.response?.data?.message || err?.message,
        });
        // handleError(err);
      });
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
            <Label
              for="phone"
              className="mb-2 text-sm poppins_regular text_secondary2"
            >
              Phone Number
            </Label>
            <PhoneInput
              country={"ae"}
              enableSearch={true}
              value={phone}
              className={`phon_inp poppins_regular ${
                errors.phone ? "border-red-500" : ""
              }`}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
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
                  onBlur={(e) => {
                    field.onChange(e);
                    handleEmailOnBlur(e.target.value);
                  }}
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
