"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { sendCode, signup } from "@/components/api/ApiRoutesFile";
import axiosInstance from "@/components/api/axiosInstance";
import { handleError } from "@/components/api/errorHandler";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { setAccessToken, setLogin, setLogout, setRefreshToken, setUserData } from "@/components/redux/loginForm";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Form } from "reactstrap";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fieldsRef = useRef();
  const router = useRouter()
  const { post } = ApiFunction()
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(60);
  const [loading, setloading] = useState(false)
  const tempData = useSelector((state) => state.auth.tempData)
  const isForgotPassword = useSelector((state) => state.auth?.isForgotPassword)
  const forgotCode = useSelector((state) => state.auth?.forgotCode)
  const userType = useSelector((state) => state.auth?.userType)
  const [showResendLink, setShowResendLink] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowResendLink(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResendCode = async () => {
    if (isForgotPassword) {
      const data = {
        email: forgotCode?.email,
        // token: forgotCode?.token,
      }
      // try {
      //   const response = await createPost({
      //     endpoint: 'api/auth/forget-password',
      //     data: data,
      //     tag: 'Auth',
      //   }).unwrap();
      //   if (response.success) {
      //     setTimer(60);
      //     setShowResendLink(false);
      //     message.success('We have sent an verification code in your email');
      //   }
      // } catch (error) {
      //   message.error(error?.data?.message || 'Login failed');
      //   console.log('console', error);
      // } finally {
      //   setloading(false)
      // }
    } else {
      const data = {
        email: tempData?.email,
        type: 'customer'
      }
      try {
        const response = await post(sendCode, data)
        if (response.message) {
          setTimer(60);
          setShowResendLink(false);
          message.success('We have sent an Code in your email.');
        }
      } catch (error) {
        message.error(error?.data?.message || 'Login failed');
      } finally {
      }
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1);
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    if (value && index < 3) {
      fieldsRef.current.children[index + 1].focus();
    }
  };

  const onSubmit = async (values) => {
    if (isForgotPassword) {
      setloading(true)
      const data = {
        email: forgotCode?.email,
        code: otpCode
      }
      try {
        const response = await createPost({
          endpoint: 'api/auth/verify-otp/forget-password',
          data: data,
          tag: 'Auth',
        }).unwrap();
        if (response.success) {
          message.success('Code verified Successfully!');
          router.push('/auth/reset-password');
        }
      } catch (error) {
        message.error(error?.data?.message || 'Login failed');
      } finally {
        setloading(false)
      }
    } else {
      if (tempData) {
        setloading(true)
        try {
          const response = await post(signup, tempData)
          if (response.success) {
            router.push('/auth/choose-location')
            dispatch(setUserData(response?.user))
            dispatch(setAccessToken(response?.token))
            localStorage.setItem('auction_user_token', response?.token)
            // dispatch(setLogin(true))
          }
        } catch (error) {
          handleError(error)
        } finally {
          setloading(false)
        }
      }
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otpCode[index]) {
      fieldsRef.current.children[index - 1].focus();
    }
  };

  return (
    <AuthLayout title='Exclusive & Diverse Listings' description='Discover rare collectibles, vehicles, and premium assets.'>
      <>
        <AuthHeading heading={' Verify Your Email'} subHeading={'We have sent you an verification code with a code to this email'} email={tempData?.email || forgotCode?.email} />
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 gap-6">
          <div className="mt-5">
            <label className="text_secondary2 poppins_regular">
              Enter Your OPT Code Here
            </label>
            <div ref={fieldsRef} className="mt-3 flex mb-2 items-center gap-x-2">
              {otpCode.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <div className="login_main py-3">
              {!showResendLink && (
                <h6 className="resend_buton text_secondary2 poppins_medium">
                  Resend Code in{" "}
                  <span className="text_dark poppins_semibold"> {timer}s</span>
                </h6>
              )}
              <div className="mt-3">
                {showResendLink ? (
                  <h6 className="counter_con poppins_regular flex-wrap">
                    Didn&rsquo;t receive the Code?
                    <span
                      className="text_primary underline ms-1 poppins_medium"
                      onClick={handleResendCode}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Resend Code
                    </span>
                  </h6>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="col-span-6 mt-3 sm:flex sm:items-center sm:gap-4 w-full">
            <button
              type="submit"
              disabled={loading}
              className="btn1 primary w-100"
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : 'Verify'}
            </button>
          </div>
        </Form>
      </>
    </AuthLayout>
  );
};

export default Page;
