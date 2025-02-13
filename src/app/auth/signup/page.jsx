"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { usePostMutation } from "@/components/redux/apiSlice2";
import { setLogin } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [createPost] = usePostMutation();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    phoneNumber: Yup
      .string()
      .required("Phone number is required")
      .test("isValidPhone", "Invalid phone number", (value) => value && value.length >= 10),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
  });

  const {
    handleSubmit,
    control, trigger, setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    dispatch(setLogin(true));
    router.push('/auth/verify-code');
    // Commented API integration code as per original file
    // try {
    //   const response = await createPost({
    //     endpoint: 'api/auth/signup',
    //     data: values,
    //     tag: 'Auth',
    //   }).unwrap();
    //   if (response.success) {
    //     message.success('You have successfully signed up');
    //     router.push('/auth/login');
    //   }
    // } catch (error) {
    //   message.error(error?.data?.message || 'Signup failed');
    //   console.log('error', error);
    // } finally {
    //   setloading(false);
    // }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phoneNumber", "+" + value);
    trigger("phoneNumber");
  };

  return (
    <AuthLayout src={'/assets/auth2.png'} title='Secure & Transparent Transactions' description='Bid confidently with encrypted payments and fraud protection.'>
      <>
        <AuthHeading heading="Sign up" subHeading="Sign up to your account" path={'/'} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 grid grid-cols-6 gap-3 auth-form"
        >
          <div className="col-span-6">
            <Label
              for="firstName"
              className="mb-2 text-sm popins_regular text_secondary2"
            >
              First Name
            </Label>
            <Controller
              id="firstName"
              name="firstName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="firstName"
                  placeholder="Your first name"
                  className={`h-12 w-full popins_regular sm:text-sm ${errors.firstName ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                    }`}
                />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.firstName.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="lastName"
              className="mb-2 text-sm popins_regular text_secondary2"
            >
              Last Name
            </Label>
            <Controller
              id="lastName"
              name="lastName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="lastName"
                  placeholder="Your last name"
                  className={`h-12 w-full popins_regular sm:text-sm ${errors.lastName ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                    }`}
                />
              )}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.lastName.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="phoneNumber"
              className="mb-2 text-sm popins_regular text_secondary2"
            >
              Phone Number
            </Label>
            <PhoneInput
              country={"ae"}
              enableSearch={true}
              value={phone}
              className={`phon_inp popins_regular ${errors.phoneNumber ? "border-red-500" : ""}`}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs popins_regular ms-1">{errors.phoneNumber.message}</span>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="email"
              className="mb-2 text-sm popins_regular text_secondary2"
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
                  placeholder="Your Email address"
                  className={`h-12 w-full popins_regular sm:text-sm ${errors.email ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                    }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.email.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="password"
              className="mb-2 text-sm popins_regular text_secondary2"
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
                    className={`h-12 w-full popins_regular sm:text-sm ${errors.password ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.password.message}</p>
            )}
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button disabled={loading} type="submit" className="btn1 primary w-100">
              {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
            </button>
          </div>
        </Form>
        <p className="pt-3 popins_regular text_secondary2">
          Already have an Account? <Link href="/auth/login" className="_link_underline popins_medium">
            Sign in
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default Page;