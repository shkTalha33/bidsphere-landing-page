"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { login } from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import {
  setAccessToken,
  setLogin,
  setUserData,
} from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { post } = ApiFunction();
  const dispatch = useDispatch();

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
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
      password: values.password,
      type: "customer",
    };
    try {
      const response = await post(login, data);
      if (response.success) {
        message.success("You have successfully logged in");
        dispatch(setLogin(true));
        dispatch(setAccessToken(response?.token));
        dispatch(setUserData(response?.user));
        localStorage.setItem("auction_user_token", response?.token);
        router.push("/");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <AuthLayout isCenter={true} src={"/assets/auth1.png"}>
      <>
        <AuthHeading
          heading="Login"
          subHeading="Login to your account"
          path={"/"}
        />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 grid grid-cols-6 gap-3 auth-form"
        >
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
                  name="email"
                  placeholder="Email"
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
                    name="password"
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
          <div className="col-span-6 flex justify-end w-full">
            <Link
              href={"/auth/forgot-password"}
              className="poppins_medium underline text_primary text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button
              disabled={loading}
              type="submit"
              className="btn1 bg_primary text-white w-100"
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Sign In"}
            </button>
          </div>
          {/* <div className="col-span-6 mt-3">
            <p className="text-lg poppins_medium">
              Sign in with another account
            </p>
            <div className="grid grid-cols-3 gap-x-3 mt-2">
              <button
                className="btn1 white"
                type="button"
                aria-label="Sign in with Google"
              >
                <Image
                  src={googleicon}
                  width={30}
                  height={30}
                  alt=""
                />
              </button>
              <button
                className="btn1 white"
                type="button"
                aria-label="Sign in with Facebook"
              >
                <Image
                  src={facebookicon}
                  width={30}
                  height={30}
                  alt=""
                />
              </button>
              <button
                className="btn1 white"
                type="button"
                aria-label="Sign in with Apple"
              >
                <Image
                  src={appleicon}
                  width={30}
                  height={30}
                  alt=""
                />
              </button>
            </div>
          </div> */}
        </Form>
        <p className="pt-3 poppins_regular">
          Create a New Account?{" "}
          <Link
            href="/auth/sign-up"
            className="_link_underline poppins_medium text_primary"
          >
            Sign up
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default Page;
