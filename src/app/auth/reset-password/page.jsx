"use client";

import ApiFunction from "@/components/api/apiFuntions";
import { forgotPassword } from "@/components/api/ApiRoutesFile";
import { handleError } from "@/components/api/errorHandler";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const forgotCode = useSelector((state) => state.auth?.forgotCode)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const { put } = ApiFunction()

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
      .required('Password is required')
      .min(8, 'Passwords must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], 'Confirm Password should match the password')
      .required('Please confirm your password'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(forgotCode);

  const onSubmit = async (values) => {
    setLoading(true);
    const data = {
      password: values.password,
      token: forgotCode?.token,
      code: forgotCode?.code,
    }
    try {
      const response = await put(forgotPassword, data)
      if (response.success) {
        message.success("Your password has been reset successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading heading={'Reset Password'} subHeading={'Enter your new password below'} />
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
                  placeholder={'New Password'}
                  name="password"
                  //     invalid={!!errors.password}
                  className={`peer h-8 w-full poppins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.password ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                    }`}
                />
              )}
            />
            <span className="absolute start-3 top-2 poppins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {'New Password'}
            </span>
          </Label>
          {errors.password && (
            <p className="text-red-500 text-xs m-1 poppins_regular">{errors.password.message}</p>
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
                  placeholder={'Confirm Password'}
                  name="confirmPassword"
                  // invalid={!!errors.confirmPassword}
                  className={`peer h-8 w-full poppins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.confirmPassword ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                    }`}
                />
              )}
            />
            <span className="absolute start-3 top-2 poppins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
              {'Confirm Password'}
            </span>
          </Label>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs m-1 poppins_regular">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
          <button disabled={loading} type="submit" className="btn1 primary w-100">
            {loading ? <BeatLoader color="#fff" size={10} /> : 'Reset Password'}
          </button>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Page