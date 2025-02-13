"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { uploadFile, usePostMutation } from "@/components/redux/apiSlice2";
import { setStoreData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import { Controller, useForm } from "react-hook-form";
import { LuCloudUpload } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Form, Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const [phone, setPhone] = useState("");
  const autocompleteRef2 = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const [createPost] = usePostMutation();
  const [fileLoading2, setFileLoading2] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [imageUrlCover, setImageUrlCover] = useState(null);

  const schema = Yup.object().shape({
    name: Yup.string().required("Shop Name is required"),
    type: Yup.string().required("Shop Type is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    description: Yup.string().required("Shop Bio is required"),
    phone_number: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Business Address is required"),
    country: Yup.string().required("Country is required"),
    logo_image: Yup.string().required("Please upload Shop logo"),
    banner_image: Yup.string().required("Please upload Banner Image"),
  });

  const {
    handleSubmit,
    control, setError,
    reset, trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phone_number", "+" + value);
    trigger("phone_number");
  };

  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileLoading2(true)
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const res = await uploadFile({ data: formData })
        if (res.image) {
          setImageUrl(res.file);
          setValue("logo_image", res.file);
          trigger("logo_image");
        }
      } catch (error) {
        message.error('Failed to upload file');
      } finally {
        setFileLoading2(false)
      }
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileLoading(true)
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const res = await uploadFile({ data: formData })
        if (res.image) {
          setImageUrlCover(res.file);
          setValue("banner_image", res.file);
          trigger("banner_image");
        }
      } catch (error) {
        message.error('Failed to upload file');
      } finally {
        setFileLoading(false)
      }
    }
  };

  const onSubmit = async (values) => {
    dispatch(setStoreData(values))
    router.push('/auth/store-information-social')
  };

  return (
    <AuthLayout>
      <>
        <AuthHeading heading={'Store Information'} subHeading={'Enter Your Details Below'} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-3 auth-form"
        >
          <div className="col-span-6 position-relative w-100">
            <label
              style={{ cursor: "pointer", width: "100%" }}
              htmlFor="fileInput"
              className="cursor-pointer"
            >
              {fileLoading ? (
                <div
                  style={{ height: "110px", width: "100%" }}
                  className="border rounded-xl w-100 text_primary flex justify-center items-center"
                >
                  <ClipLoader />
                </div>
              ) : imageUrl ? (
                <Image
                  width={1000}
                  height={110}
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    height: "110px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="rounded-xl object-cover"
                />
              ) : (
                <div
                  style={{
                    height: "110px",
                    width: "100%",
                    border: "1px solid #d3d3d3",
                  }}
                  className="border rounded-xl w-full flex flex-col justify-center items-center"
                >
                  <div className="h-10 w-10 rounded-full mb-1 flex items-center justify-center bg-[#f4f4f4]">
                    <LuCloudUpload size={20} />
                  </div>
                  <span className="text_secondary2 popins_regular text-xs">
                    <span className="popins_regular text-sm text-black">Click to upload logo</span> or drag and drop
                  </span>
                  <span className="text_secondary2 popins_regular text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </div>
              )}
            </label>
            <Input
              type="file"
              accept="image/*"
              id="fileInput"
              className="visually-hidden hidden"
              onChange={handleFileChange}
            />
            {errors.logo_image && (
              <p className="text-red-500 text-xs popins_regular">{errors.logo_image.message}</p>
            )}
          </div>
          <div className="col-span-6 position-relative w-100">
            <label
              style={{ cursor: "pointer", width: "100%" }}
              htmlFor="fileInput2"
              className="cursor-pointer"
            >
              {fileLoading2 ? (
                <div
                  style={{ height: "110px", width: "100%" }}
                  className="border rounded-xl w-100 text_primary flex justify-center items-center"
                >
                  <ClipLoader />
                </div>
              ) : imageUrlCover ? (
                <Image
                  width={1000}
                  height={110}
                  src={imageUrlCover}
                  alt="Preview"
                  style={{
                    height: "110px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="rounded-xl object-cover"
                />
              ) : (
                <div
                  style={{
                    height: "110px",
                    width: "100%",
                    border: "1px solid #d3d3d3",
                  }}
                  className="border rounded-xl w-full flex flex-col justify-center items-center"
                >
                  <div className="h-10 w-10 rounded-full mb-1 flex items-center justify-center bg-[#f4f4f4]">
                    <LuCloudUpload size={20} />
                  </div>
                  <span className="text_secondary2 popins_regular text-xs">
                    <span className="popins_regular text-sm text-black">Click to upload banner Image</span> or drag and drop
                  </span>
                  <span className="text_secondary2 popins_regular text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </div>
              )}
            </label>
            <Input
              type="file"
              accept="image/*"
              id="fileInput2"
              className="visually-hidden hidden"
              onChange={handleFileChange2}
            />
            {errors.banner_image && (
              <p className="text-red-500 text-xs popins_regular">{errors.banner_image.message}</p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Label
              for="name"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="name"
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="name"
                    name="name"
                    placeholder="First Name"
                    // invalid={!!errors.name}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.name ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Shop Name
              </span>
            </Label>
            {errors.name && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Label
              for="type"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3  mb-0"
            >
              <Controller
                id="type"
                name="type"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="select"
                    {...field}
                    id="type"
                    name="type"
                    placeholder="Last Name"
                    // invalid={!!errors.type}
                    className={`peer h-12 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.type ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  >
                    <option value="" disabled>
                      Shop Type
                    </option>
                    <option value="Clothes">Clothes</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Bags">Bags</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </Input>
                )}
              />
              {/* <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Shop Type
                  </span> */}
            </Label>
            {errors.type && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.type.message}</p>
            )}
          </div>
          <div className="col-span-6">
            <Label
              htmlFor="email"
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
                    placeholder="Email Address"
                    // invalid={!!errors.email}
                    onBlur={async () => {
                      try {
                        const data = {
                          email: field.value,
                        };
                        const response = await createPost({
                          endpoint: 'api/auth/check-email',
                          data: data,
                          tag: 'Auth',
                        }).unwrap();
                        console.log(response);
                        if (response.status === 400) {
                          throw new Error(response?.message || "Email verification failed");
                        }
                        setValue('email', field.value, { shouldValidate: true });
                      } catch (error) {
                        setError('email', {
                          type: 'manual',
                          message: error?.message || 'Email already exists',
                        });
                      }
                    }}
                    className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.email ? 'border-red-500 ring-red-500 focus:ring-red-500' : ''
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Business Email
              </span>
            </Label>
            {errors.email && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.email.message}</p>
            )}
          </div>
          <div className="col-span-6">
            <Label
              htmlFor="description"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-5 "
            >
              <Controller
                id="description"
                name="description"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="textarea"
                    rows={4}
                    id="description"
                    name="description"
                    placeholder="Shop Bio"
                    // invalid={!!errors.description}
                    className={`peer w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.description ? 'border-red-500 ring-red-500 focus:ring-red-500' : ''
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                About
              </span>
            </Label>
            {errors.description && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.description.message}</p>
            )}
          </div>
          <div className="col-span-6">
            {/* <Label className="text-gray-600 popins_regular">Phone number</Label> */}
            <PhoneInput
              country={"ae"}
              enableSearch={true}
              value={phone}
              className={`phon_inp w-full popins_regular ${errors.phone_number ? "border-red-500" : ""}`}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-xs popins_regular ms-1">{errors.phone_number.message}</span>
            )}
          </div>
          <div className="col-span-6">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <>
                  <Autocomplete
                    ref={autocompleteRef2}
                    id="address"
                    apiKey='AIzaSyB9hunGMedxDrhrCt6GAr08ZODatbS2xZU'
                    className="w-full border rounded-lg plusJakara_regular ps-3 py-[14px]"
                    placeholder="Business Address"
                    options={{
                      types: ['address'],
                    }}
                    onPlaceSelected={(place) => {
                      const address = place.formatted_address || ""; // Extract formatted address
                      setValue("address", address); // Update form value
                      trigger("address"); // Validate the field
                    }}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs popins_regular">{errors.address.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="col-span-6">
            <Label
              for="country"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="country"
                name="country"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="country"
                    name="country"
                    placeholder="Last Name"
                    // invalid={!!errors.country}
                    className={`peer h-10 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.country ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Country
              </span>
            </Label>
            {errors.country && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.country.message}</p>
            )}
          </div>
          <div className="col-span-6 mt-4 mb-3 sm:flex sm:items-center sm:gap-4 w-full">
            <button type="submit" className="btn1 primary w-100">
              Next
            </button>
          </div>
        </Form>
      </>
    </AuthLayout>
  );
};
export default Page;