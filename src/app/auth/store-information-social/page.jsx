"use client";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import { useGetQuery, usePostMutation } from "@/components/redux/apiSlice2";
import { setLogin } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Form, Input, Label } from "reactstrap";
import * as Yup from "yup";

const Page = () => {
  const router = useRouter()
  const storedata = useSelector((state) => state?.auth?.storeData)
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [createPost] = usePostMutation();
  const [loading, setloading] = useState(false);

  const schema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    subCategory: Yup.array().min(1, "At least one sub-category is required").required("Sub-categories are required"),
    facebook_link: Yup.string().url("Invalid URL format").required("Facebook link is required"),
    twitter_link: Yup.string().url("Invalid URL format").required("Twitter link is required"),
    instagram_link: Yup.string().url("Invalid URL format").required("Instagram link is required"),
    website_link: Yup.string().url("Invalid URL format").required("Website link is required"),
  });

  const { data: categoriesResponse, isLoading: isLoadingPosts, error: postsError } = useGetQuery({
    endpoint: "api/category/list",
    category: 'Category',
  });

  console.log(categoriesResponse);


  const {
    handleSubmit,
    control, setError,
    reset, trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  // useEffect(() => {
  //   const fetchSubcategories = async () => {
  //     if (selectedCategory) {
  //       try {
  //         const { data: subcategoriesResponse, isLoading: isLoadingPosts, error: postsError } = useGetQuery({
  //           endpoint: `api/category/${selectedCategory}/subcategories`,
  //           category: 'SubCategory',
  //         });
  //       } catch (error) {
  //         console.error("Error fetching subcategories:", error);
  //       }
  //     } else {
  //       setSubcategories([]);
  //     }
  //   };

  //   fetchSubcategories();
  // }, [selectedCategory]);

  const { data: subcategoriesResponse, isFetching: isFetchingSubcategories } = useGetQuery(
    selectedCategory
      ? {
        endpoint: `api/category/${selectedCategory}/subcategories`,
        category: "SubCategory",
      }
      : null
  );

  console.log(subcategoriesResponse);


  const onSubmit = async (values) => {
    setloading(true)
    const data = {
      ...storedata,
      category: values?.category,
      subCategory: values?.subCategory,
      social_links: {
        facebook: values?.facebook_link,
        twitter: values?.twitter_link,
        instagram: values?.instagram_link,
        website: values?.website_link,
      },
    }
    try {
      const response = await createPost({
        endpoint: 'api/shops/create',
        data: data,
        tag: 'Auth',
      }).unwrap();
      if (response.success) {
        message.success('We have sent an verification code in your email');
        router.push('/');
        dispatch(setLogin(true))
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
        <AuthHeading heading={'Select Category'} subHeading={'Enter Your Details Below'} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-3 auth-form"
        >
          <div className="col-span-6">
            <Label
              for="category"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3  mb-0"
            >
              <Controller
                id="category"
                name="category"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="select"
                    {...field}
                    id="category"
                    name="category"
                    onChange={(e) => {
                      setValue("category", e.target.value);
                      setSelectedCategory(e.target.value); // Update the selected category
                    }}
                    className={`peer h-12 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.category ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categoriesResponse?.categories?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.name}
                      </option>
                    ))}
                  </Input>
                )}
              />
            </Label>
            {errors.category && (
              <p className="text-red-500 text-xs m-1">{errors.category.message}</p>
            )}
          </div>

          {/* Subcategory */}
          <div className="col-span-6">
            <Label
              for="subCategory"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3  mb-0"
            >
              <Controller
                id="subCategory"
                name="subCategory"
                defaultValue={[]}
                control={control}
                render={({ field }) => (
                  <Input
                    type="select"
                    {...field}
                    // multiple
                    id="subCategory"
                    name="subCategory"
                    className={`peer h-12 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.subCategory ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  >
                    <option value="" disabled>
                      Select Subcategory
                    </option>
                    {subcategoriesResponse?.subcategories?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.name}
                      </option>
                    ))}
                  </Input>
                )}
              />
            </Label>
            {errors.subCategory && (
              <p className="text-red-500 text-xs m-1">{errors.subCategory.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <h1 className="text-xl mt-1 lg:text-2xl popins_semibold">Social Links</h1>
          </div>
          <div className="col-span-6">
            <Label
              for="facebook_link"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="facebook_link"
                name="facebook_link"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="facebook_link"
                    name="facebook_link"
                    placeholder="Facebook Link"
                    // invalid={!!errors.facebook_link}
                    className={`peer h-10 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.facebook_link ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Facebook Link
              </span>
            </Label>
            {errors.facebook_link && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.facebook_link.message}</p>
            )}
          </div>
          <div className="col-span-6">
            <Label
              for="twitter_link"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="twitter_link"
                name="twitter_link"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="twitter_link"
                    name="twitter_link"
                    placeholder="twitter Link"
                    // invalid={!!errors.twitter_link}
                    className={`peer h-10 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.twitter_link ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Twitter Link
              </span>
            </Label>
            {errors.twitter_link && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.twitter_link.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="instagram_link"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="instagram_link"
                name="instagram_link"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="instagram_link"
                    name="instagram_link"
                    placeholder="Instagram Link"
                    // invalid={!!errors.instagram_link}
                    className={`peer h-10 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.instagram_link ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Instagram Link
              </span>
            </Label>
            {errors.instagram_link && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.instagram_link.message}</p>
            )}
          </div>

          <div className="col-span-6">
            <Label
              for="website_link"
              className="relative block overflow-hidden  rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
              <Controller
                id="website_link"
                name="website_link"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    id="website_link"
                    name="website_link"
                    placeholder="Website Link"
                    // invalid={!!errors.website_link}
                    className={`peer h-10 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.website_link ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                      }`}
                  />
                )}
              />
              <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Website Link
              </span>
            </Label>
            {errors.website_link && (
              <p className="text-red-500 text-xs m-1 popins_regular">{errors.website_link.message}</p>
            )}
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
            <button disabled={loading} type="submit" className="btn1 primary w-100">
              {loading ? <BeatLoader color="#fff" size={10} /> : 'Add Shop'}
            </button>
          </div>
        </Form>
      </>
    </AuthLayout>
  );
};

export default Page;
