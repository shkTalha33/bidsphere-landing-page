/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import ApiFunction from "@/components/api/apiFuntions";
import { avataruser } from "@/components/assets/icons/icon";
import TabHeader from "@/components/tabHeader";
import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import { Check, Edit2, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { uploadFile } from "@/components/api/uploadFile";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { updateProfile } from "@/components/api/ApiFile";
import { setUserData } from "@/components/redux/loginForm";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userData, GoogleApiKey, put } = ApiFunction();
  const [show, setShow] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [locationDetails, setLocationDetails] = useState({});
  // ////

  const schema = yup.object().shape({
    fname: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required("First name is required"),
    lname: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required("Last name is required"),

    address: yup
      .string()
      .test("trim-start", "No leading spaces allowed", (value) => {
        return !value || value === value.trimStart();
      })
      .required("Address is required"),

    phone: yup
      .string()
      .matches(
        /^\+?[0-9\s()-]{5,}$/,
        "Phone number must contain only digits and can include spaces, parentheses, or dashes"
      )
      .required("Phone number is required"),

    profile: yup
      .string()
      .url("Profile image must be a valid URL")
      .required("Profile image is required"),
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
    <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <TabHeader />
        </div>
        <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
          <div className="w-full bg-white p-4 flex justify-between items-center rounded-lg shadow-sm">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl poppins_semibold">
                Personal information
              </h1>
              <p className="text-gray-600">You can do management here.</p>
            </div>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="ml-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-2 flex items-center justify-center"
              aria-label={"Edit profile"}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="bg-white p-8 rounded-lg w-full shadow-sm">
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
                      Upload Profile
                      {errors.profile && (
                        <p className="text-red-500">{errors.profile.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <label htmlFor="fname">First name</label>
                    <Controller
                      name="fname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="fname"
                          placeholder="Enter your First name"
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
                    <label htmlFor="lname">Last name</label>
                    <Controller
                      name="lname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="lname"
                          placeholder="Enter your Last name"
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
                    <label htmlFor="address">Address</label>
                    <Controller
                      name="address"
                      control={control}
                      rules={{ required: "Address is required" }}
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
                          placeholder="Enter your address"
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
                    <label htmlFor="phone">Phone</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
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
                    {loading ? <>Loading...</> : <>Update Profile</>}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col md:flex-row items-start w-full">
                    <div className="w-full md:w-1/2">
                      <h2 className="text-2xl poppins_semibold mb-2">
                        Profile Photo
                      </h2>
                      <p className="text-gray-700 poppins_medium">
                        This image will be shown publicly as your profile
                        picture.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center gap-6 mt-6 md:mt-0">
                      <div className="min-w-24">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                          {userData?.profile ? (
                            <>
                              <img
                                src={userData?.profile}
                                width={96}
                                height={96}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src={avataruser}
                                width={96}
                                height={96}
                                alt="Profile"
                                className="w-full h-full object-cover"
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
                    <p className="text-green-500 font-medium">
                      Click to replace
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                    </p>
                  </div> */}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8 w-full mt-8">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                      <h2 className="text-2xl poppins_semibold mb-2">
                        Personal information
                      </h2>
                      <p className="text-gray-700 poppins_medium">
                        This info will be shown publicly as your personal
                        information.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-700 poppins_medium">
                          Full Name
                        </h3>
                        <p className="text-gray-900 poppins_regular">
                          {`${userData?.fname} ${userData?.lname}`}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-700 poppins_medium">
                          Address
                        </h3>
                        <p className="text-gray-900 poppins_regular">
                          {userData?.address}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 poppins_medium">
                          Phone Number
                        </h3>
                        <p className="text-gray-900 poppins_regular">
                          {userData?.phone}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 poppins_medium">
                          Email
                        </h3>
                        <p className="text-gray-900 poppins_regular">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section></section>
    </main>
  );
};

export default ProfilePage;
