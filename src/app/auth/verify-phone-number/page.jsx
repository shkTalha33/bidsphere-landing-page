"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Form, Label } from "reactstrap";
import * as yup from "yup";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("isValidPhone", "Invalid phone number", (value) => value && value.length >= 10),
});

const Page = () => {
  const tempData = useSelector((state) => state.auth?.tempData)
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [phone, setPhone] = useState("");

  const onSubmit = async (values) => {
    setloading(true)
    const data = {
      email: tempData?.email,
    }
    // try {
    //   const response = await createPost({
    //     endpoint: 'api/auth/send-code',
    //     data: data,
    //     tag: 'Auth',
    //   }).unwrap();
    //   if (response.message) {
    //     message.success('We have sent an Code in your email.');
    //     dispatch(setTempData({ ...tempData, phoneNumber: values?.phoneNumber }))
    //     router.push('/auth/verify-code');
    //   }
    // } catch (error) {
    //   message.error(error?.data?.message || 'Login failed');
    // } finally {
    //   setloading(false)
    // }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phoneNumber", "+" + value);
    trigger("phoneNumber");
  };

  return (
    <AuthLayout>
      <>
        <AuthHeading heading={'Phone Number'} subHeading={'Please enter your Mobile number'} />
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 gap-6 auth-form">
          <div className="flex flex-col gap-1">
            <Label className="text-gray-600 poppins_regular">Phone number</Label>
            <PhoneInput
              country={"ae"}
              enableSearch={true}
              value={phone}
              className={`phon_inp poppins_regular ${errors.phoneNumber ? "border-red-500" : ""}`}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs poppins_regular ms-1">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div className="col-span-6 mt-5 sm:flex sm:items-center sm:gap-4 w-full">
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
