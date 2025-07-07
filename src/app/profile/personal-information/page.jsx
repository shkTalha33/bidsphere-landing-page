/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import ApiFunction from "@/components/api/apiFuntions";
import { avataruser } from "@/components/assets/icons/icon";
import TabHeader from "@/components/tabHeader";
import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
import { updateProfile } from "@/components/api/ApiFile";
import { uploadFile } from "@/components/api/uploadFile";
import { getLanguage } from "@/components/redux/language/languageSlice";
import { setUserData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Autocomplete from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import * as yup from "yup";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userData, GoogleApiKey, put } = ApiFunction();
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [locationDetails, setLocationDetails] = useState({});
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  const schema = yup.object().shape({
    fname: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required(`${t("profil.heading13")}`),
    lname: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required(`${t("profil.heading14")}`),

    address: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required(`${t("profil.heading15")}`),

    phone: yup
      .string()
      .matches(
        /^\+?[0-9\s()-]{5,}$/,
        "Phone number must contain only digits and can include spaces, parentheses, or dashes"
      )
      .required(`${t("profil.heading16")}`),

    profile: yup
      .string()
      .url("Profile image must be a valid URL")
      .required(`${t("profil.heading17")}`),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fname: "",
      lname: "",
      address: "",
      phone: "",
      profile: "",
    },
  });

  const getimgUrl = watch("profile");

  useEffect(() => {
    if (userData) {
      setValue("fname", userData?.fname);
      setValue("lname", userData?.lname);
      setValue("address", userData?.address);
      setValue("phone", userData?.phone);

      setValue("profile", userData?.profile);
      setLocationDetails({
        lng: userData?.location?.coordinates[0],
        lat: userData?.location?.coordinates[1],
      });
    }
  }, []);

  // image upload
  const handleImageChange = async (e, setValue) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    try {
      if (files.length > 0) {
        const uploadedImageUrl = await uploadFile(files[0]);
        setValue(
          "profile",
          uploadedImageUrl?.data?.image || uploadedImageUrl?.data?.video
        );
        clearErrors("profile");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const api = updateProfile;
    const apiData = {
      fname: data?.fname,
      lname: data?.lname,
      location: {
        type: "Point",
        coordinates: [locationDetails?.lng, locationDetails?.lat],
      },
      address: data?.address,
      phone: data?.phone,
      email: data?.email,
      profile: data?.profile,
    };
    put(api, apiData)
      .then((res) => {
        if (res?.success) {
          dispatch(setUserData(res?.user));
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Profile NOT updated!");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <main
      className="flex flex-col items-start"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Container
        fluid="xxl"
        className="mx-auto p-2 p-md-4 flex flex-col lg:flex-row gap-3"
      >
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <div className="w-full bg-white p-3 p-md-4 flex justify-between items-center rounded-lg shadow-sm">
            <div className="flex flex-col w-full">
              <h1 className="text-lg md:text-2xl poppins_medium">
                {t("profil.heading")}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {t("profil.heading1")}
              </p>
            </div>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="ml-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-2 flex items-center justify-center text-sm md:text-base"
              aria-label={"Edit profile"}
            >
              {isEditing ? t("profil.cancle") : t("profil.edit")}
            </button>
          </div>
          <div className="bg-white p-3 p-md-4 rounded-lg w-full shadow-sm">
            {isEditing ? (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full mx-auto"
                >
                  {/* Username */}
                  <div className="flex gap-3 items-center mb-10">
                    <div className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20">
                      {isUploading ? (
                        <>
                          <div className="flex items-center justify-center w-100">
                            <Spinner />
                          </div>
                        </>
                      ) : (
                        <>
                          {getimgUrl ? (
                            <>
                              <img
                                className="aspect-square h-full w-full"
                                src={getimgUrl}
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                className="aspect-square h-full w-full"
                                src={avataruser}
                                alt=""
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="px-4  cursor-pointer  border border-input relative py-2">
                      <input
                        type="file"
                        id="profile"
                        accept="image/*"
                        disabled={isUploading}
                        className="form-control borderCus absolute opacity-0 rounded-md p-2"
                        onChange={(e) => handleImageChange(e, setValue)}
                      />

                      {t("profil.heading2")}
                      {errors.profile && (
                        <p className="text-red-500">{errors.profile.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="fname">{t("profil.heading3")}</label>
                    <Controller
                      name="fname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="fname"
                          placeholder={t("profil.heading4")}
                          className="border p-2"
                          {...field}
                        />
                      )}
                    />
                    {errors.fname && (
                      <p className="text-red-500 text-[0.7rem]">
                        {errors.fname.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="lname"> {t("profil.heading5")}</label>
                    <Controller
                      name="lname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="lname"
                          placeholder={t("profil.heading6")}
                          className="border p-2"
                          {...field}
                        />
                      )}
                    />
                    {errors.lname && (
                      <p className="text-red-500 text-[0.7rem]">
                        {errors.lname.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="address">{t("profil.heading7")} </label>
                    <Controller
                      name="address"
                      control={control}
                      rules={{ required: `${t("profil.heading8")}` }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Autocomplete
                          apiKey={GoogleApiKey}
                          className="form-control"
                          onPlaceSelected={(place) => {
                            const formattedAddress =
                              place?.formatted_address || "";
                            const lng = place?.geometry?.location.lng();
                            const lat = place?.geometry?.location.lat();
                            setLocationDetails({ lng, lat });
                            onChange(formattedAddress);
                          }}
                          options={{ types: ["address"] }}
                          defaultValue={value}
                          placeholder={t("profil.heading9")}
                          ref={ref}
                        />
                      )}
                    />

                    {errors.address && (
                      <p className="text-red-500 text-[0.7rem]">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col mb-4">
                    <label htmlFor="phone">{t("profil.heading10")}</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="phone"
                          placeholder={t("profil.heading11")}
                          className="border p-2"
                          {...field}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-[0.7rem]">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <Button
                    disabled={loading || isUploading}
                    className="w-full h-[3.5rem] mt-6 bg_primary border-0"
                    type="submit"
                  >
                    {" "}
                    {loading ? (
                      <>{t("payment.heading22")}</>
                    ) : (
                      <>{t("profil.heading12")}</>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col md:flex-row items-start w-full">
                    <div className="w-full md:w-1/2">
                      <h2 className="text-lg md:text-2xl poppins_medium mb-2">
                        {t("profil.heading18")}
                      </h2>
                      <p className="text-gray-700 poppins_medium text-sm md:text-base">
                        {t("profil.heading19")}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center gap-6 mt-4 md:mt-0">
                      <div className="min-w-24">
                        <div className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] rounded-full overflow-hidden bg-gray-300">
                          {userData?.profile ? (
                            <>
                              <img
                                src={userData?.profile}
                                width={96}
                                height={96}
                                alt="Profile"
                                className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] object-cover"
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src={avataruser}
                                width={96}
                                height={96}
                                alt="Profile"
                                className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] object-cover"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      {/* <div
                    onClick={handleImageClick}
                    className="w-full h-32 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div className="text-green-500 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <p className="text-green-500 poppins_medium">
                      Click to replace
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                    </p>
                  </div> */}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 w-full">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                      <h2 className="text-lg md:text-2xl poppins_semibold mb-2">
                        {t("profil.heading")}
                      </h2>
                      <p className="text-gray-700 text-sm md:text-base poppins_medium">
                        {t("profil.heading20")}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                      <div>
                        <h3 className="poppins_medium text-base md:text-lg text-gray-700 poppins_medium">
                          {t("profil.heading21")}
                        </h3>
                        <p className="text-gray-900 text-sm md:text-base poppins_regular">
                          {`${userData?.fname} ${userData?.lname}`}
                        </p>
                      </div>

                      <div>
                        <h3 className="poppins_medium text-base md:text-lg text-gray-700 poppins_medium">
                          {t("profil.heading7")}
                        </h3>
                        <p className="text-gray-900 text-sm md:text-base poppins_regular">
                          {userData?.address}
                        </p>
                      </div>
                      <div>
                        <h3 className="poppins_medium text-base md:text-lg text-gray-700 poppins_medium">
                          {t("profil.heading22")}
                        </h3>
                        <p className="text-gray-900 text-sm md:text-base poppins_regular">
                          {userData?.phone}
                        </p>
                      </div>
                      <div>
                        <h3 className="poppins_medium text-base md:text-lg text-gray-700 poppins_medium">
                          {t("profil.heading23")}
                        </h3>
                        <p className="text-gray-900 text-sm md:text-base poppins_regular">
                          {userData?.email}
                        </p>
                      </div>
                      <div className="border-t pt-6 mt-6">
                        <h3 className="poppins_medium text-base md:text-lg text-gray-700">
                          {t("profil.heading24")}
                        </h3>
                        <p className="text-[#16A34A] text-lg poppins_semibold">
                          ${userData?.walletBalance?.toFixed(2) || "0.00"} USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProfilePage;
