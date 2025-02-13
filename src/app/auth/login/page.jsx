"use client";
import { appleicon, facebookicon, googleicon } from "@/components/assets/icons/icon";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { usePostMutation } from "@/components/redux/apiSlice2";
import { setAccessToken, setLogin, setRefreshToken, setUserData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [createPost] = usePostMutation();
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    email: Yup.string().email(t("validation.invalidEmail")).required(t("validation.emailRequired")),
    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin")),
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
        endpoint: 'api/auth/login',
        data: values,
        tag: 'Auth',
      }).unwrap();
      if (response.success) {
        message.success('You have successfully logged in');
        dispatch(setUserData(response?.user))
        dispatch(setAccessToken(response?.accessToken))
        localStorage.setItem('setofshops_user_token', response?.accessToken)
        dispatch(setRefreshToken(response?.refreshToken))
        // create('setofshops_user_token', response?.accessToken)
        dispatch(setLogin(true));
        if (response?.user?.role === 'influencer' || response?.user?.role === 'brand') {
          router.push('/vender/dashboard');
        } else {
          router.push('/');
        }
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
        <AuthHeading heading={t('auth.login.title')} subHeading={t('auth.login.subtitle')} path={'/'} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-3 auth-form"
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
                    placeholder={t('auth.login.email')}
                    // invalid={!!errors.email}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.email ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {t('auth.login.email')}
              </span>
            </Label>
            {errors.email && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.email.message}</p>
            )}
          </div>
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
                  <BsEyeFill size={20} className=" text_black" />
                ) : (
                  <BsEyeSlashFill size={20} className=" text_black" />
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
                    placeholder={t('auth.login.password')}
                    name="password"
                    //     invalid={!!errors.password}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.password ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {t('auth.login.password')}
              </span>
            </Label>
            {errors.password && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.password.message}</p>
            )}
          </div>
          <div className="col-span-6 flex justify-end w-full">
            <Link
              href={"/auth/forgot-password"}
              className=" popins_medium underline text_secondary2 text-sm"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button disabled={loading} type="submit" className="btn1 primary w-100">
              {loading ? <BeatLoader color="#fff" size={10} /> : `${t('auth.login.submit')}`}
            </button>
          </div>
          <div className="col-span-6 mt-3">
            <p className="text-lg popins_medium">
              {t('auth.login.signInAnotherAccount')}
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
          </div>
        </Form>
        <p className="pt-3 popins_regular text_secondary2">
          {t('auth.login.noAccount')} <Link href="/auth/signup" className=" _link_underline popins_medium">
            {t('auth.login.signUp')}
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};
export default Page;