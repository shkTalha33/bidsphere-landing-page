/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/app/loading";
import AuthHeading from "@/components/authLayout/authHeading";
import AuthLayout from "@/components/authLayout/authLayout";
import FormInput from "@/components/common/formInput";
import SelectInput from "@/components/common/formSelect";
import Stepper from "@/components/common/stepper";
import { brandForm, getBrandDetailsSchema, getInfluencerDetailsSchema, getRiderDetailsSchema, influencerForm, riderForm, termsConditionsCheck } from "@/components/common/utils";
import { useGetQuery, usePostMutation } from "@/components/redux/apiSlice2";
import { setTempData } from "@/components/redux/loginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import PricingPage from "@/components/common/pricingPage";
import { message } from 'antd';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import { Controller, useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill, BsPersonFill, BsShop } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Form, Input, Label } from "reactstrap";
import * as Yup from "yup";


const SignupPage = () => {
  const [typeData, setTypeData] = useState('customer');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSubLoading, setIsSubLoading] = useState(false);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [mainSubCat, setMainSubCat] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const router = useRouter()
  const dispatch = useDispatch()
  const [createPost] = usePostMutation();
  const tempData = useSelector(state => state.auth.tempData)
  const autocompleteRef2 = useRef()
  const searchParams = useSearchParams()
  const { t } = useTranslation()


  const regType = [
    { value: 'customer', label: t("auth.signup.regType.customer") },
    { value: 'brand', label: t("auth.signup.regType.brand") },
    { value: 'influencer', label: t("auth.signup.regType.influencer") },
    { value: 'courier_company', label: t("auth.signup.regType.courier_company") },
  ]
  const stepsBrand = [
    { img: '/assets/forgot-password-v2.svg', heading: t("auth.signup.stepsBrand.1.heading"), number: 1, title: t("auth.signup.stepsBrand.1.title"), icon: BsShop },
    { img: '/assets/register-v2.svg', heading: t("auth.signup.stepsBrand.2.heading"), number: 2, title: t("auth.signup.stepsBrand.2.title"), icon: BsPersonFill },
    { img: '/assets/register-v2.svg', heading: 'Representative Information', number: 3, title: 'Representative Info', icon: BsPersonFill },
    { img: '/assets/register-v2.svg', heading: 'Business Information', number: 4, title: 'Business Info', icon: BsPersonFill },
    { img: '/assets/verify-email-illustration.svg', heading: t("auth.signup.stepsBrand.3.heading"), number: 5, title: t("auth.signup.stepsBrand.3.title"), icon: MdOutlineBusinessCenter },
    { img: '/assets/verify-email-illustration.svg', heading: 'Subscription Payment Information', number: 6, title: ' Subscription Payment Info', icon: MdOutlineBusinessCenter },
  ];
  const stepsInf = [
    { img: '/assets/forgot-password-v2.svg', heading: t("auth.signup.stepsInf.1.heading"), number: 1, title: t("auth.signup.stepsInf.1.title"), icon: BsPersonFill },
    { img: '/assets/two-steps-verification-illustration.svg', heading: t("auth.signup.stepsInf.2.heading"), number: 2, title: t("auth.signup.stepsInf.2.title"), icon: BsShop },
    { img: '/assets/register-v2.svg', heading: 'Marketing Preferences', number: 3, title: 'Marketing Preferences', icon: BsPersonFill },
    { img: '/assets/register-v2.svg', heading: 'Social Media Information', number: 4, title: 'Social Media Info', icon: BsPersonFill },
    { img: '/assets/register-v2.svg', heading: t("auth.signup.stepsInf.3.heading"), number: 5, title: t("auth.signup.stepsInf.3.title"), icon: IoDocumentText },
    { img: '/assets/verify-email-illustration.svg', heading: 'Subscription Payment Information', number: 6, title: ' Subscription Payment Info', icon: MdOutlineBusinessCenter },
  ];
  const stepsRider = [
    { img: '/assets/forgot-password-v2.svg', heading: t("auth.signup.stepsRider.1.heading"), number: 1, title: t("auth.signup.stepsRider.1.title"), icon: BsPersonFill },
    { img: '/assets/under-maintenance.svg', heading: t("auth.signup.stepsRider.2.heading"), number: 2, title: t("auth.signup.stepsRider.2.title"), icon: BsShop },
    { img: '/assets/under-maintenance.svg', heading: 'Primary Contact Information', number: 3, title: 'Primary Contact Inf', icon: BsShop },
    { img: '/assets/under-maintenance.svg', heading: 'Payment & Shipping Rate Details ', number: 4, title: 'Payment & Shipping Rate Details', icon: BsShop },
    { img: '/assets/verify-email-illustration.svg', heading: t("auth.signup.stepsRider.3.heading"), number: 5, title: t("auth.signup.stepsRider.3.title"), icon: IoDocumentText },
    { img: '/assets/verify-email-illustration.svg', heading: 'Subscription Payment Information', number: 6, title: ' Subscription Payment Info', icon: MdOutlineBusinessCenter },
  ];

  // Password toggle
  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };
  const { data: mainMenu, isLoading: isLoading } = useGetQuery({
    endpoint: "api/category/list/menu-items",
    category: "MainMenu",
  });
  // Confirm password toggle
  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const schema = Yup.object().shape({
    first_name: Yup.string().required(t("validation.firstName")),
    last_name: Yup.string().required(t("validation.lastName")),
    username: typeData === 'influencer' ? Yup.string().trim()
      .matches(/^[a-zA-Z0-9_]+$/, t("validation.usernameMatch"))
      .min(3, t("validation.usernameMin"))
      .max(20, t("validation.usernameMax"))
      .required(t("validation.usernameRequired")) : Yup.string(),
    email: Yup.string().email(t("validation.invalidEmail")).required(t("validation.emailRequired")),
    type: Yup.string().required(t("validation.type")),
    location: Yup.object().shape({
      address: Yup.object().shape({
        street: Yup.string().required(t("validation.address")),
      }),
      coordinates: Yup.object().shape({
        lat: Yup.number(),
        lng: Yup.number(),
      }),
    }),
    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMin")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.passwordConfirmReq")),
    terms_and_conditions: (currentStep === 5 || typeData === 'customer') ? Yup.object().shape({
      platformTerms: Yup.string().required(t("validation.platformTerms")),
      privacyPolicy: Yup.string().required(t("validation.privacyPolicy")),
    }) : Yup.object(),
    ...((typeData === 'brand' && ((currentStep > 1 && currentStep <= 6) || mainSubCat?.length > 0 || subCat?.length > 0)) ? getBrandDetailsSchema(currentStep, typeData === 'brand', mainSubCat, subCat, t).fields : {}),
    ...((typeData === 'influencer' && ((currentStep > 1 && currentStep <= 6))) ? getInfluencerDetailsSchema(currentStep, typeData === 'influencer', t).fields : {}),
    ...((typeData === 'courier_company' && ((currentStep > 1 && currentStep <= 6))) ? getRiderDetailsSchema(currentStep, typeData === 'courier_company', t).fields : {}),
  });
  const {
    handleSubmit,
    control, setError,
    reset,
    setValue,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: regType[0]?.value,
      bio: "",
      dateOfBirth: "",
      nationality: "",
      audience_info: {
        ageGroup: "", // Expecting a string
        location: [{}], // Must be an array of strings
        interests: [{}], // Must be an array of strings
      },
      content_cats: [{}], // Must be an array of strings
      content_type: [{}], // Must be an array of strings
      availability: [{}],
      serviceArea: [{}],
      deliveryServices: [{}],
      deliveryVehicles: {
        vehicleTypes: [{}]
      },
      social_media_info: [
        {
          platform: "",
          username: "",
          followers: 0,
          avg_engagement_rate: 0,
          monthly_reach: 0,
        },
      ],
      profile_image: "",
      legal_docs: {
        nationalId: "",
        taxNumber: "",
      },
      subcategory: [],
      targetAudience: {
        interests: [{}]
      },
      location: {
        address: { address: '' }
      }
    }
  });
  const type = watch('type')
  const locationAdd = watch('location')
  const deliveryServices = watch('deliveryServices')
  const category = watch('category')
  const sub_main_category = watch('sub_main_category')
  const audience_info = watch('audience_info')
  const parseAddressComponents = (place) => {
    let address = '';
    let city = '';
    let state = '';
    let zipCode = '';
    let country = '';

    // Iterate over address components to extract necessary information
    place.address_components.forEach(component => {
      const types = component.types;
      if (types.includes('street_number')) {
        address = component.long_name + ' ';
      }
      if (types.includes('route')) {
        address += component.long_name;
      }
      if (types.includes('locality')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
      if (types.includes('postal_code')) {
        zipCode = component.long_name;
      }
      if (types.includes('country')) {
        country = component.long_name;
      }
    });

    return {
      address: {
        street: address,
        zipCode,
        city,
        state,
        country
      },
      coordinates: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    };
  };
  const handleSearchParams = ({ step, user, plan }) => {
    const params = new URLSearchParams(searchParams);
    // if (plan && user) {
    //   params.set('user', user)
    //   params.set('plan', plan)
    // }
    if (step) {
      params.set("step", step);
      router.push(`/auth/signup?${params.toString()}`);
    } else {
      params.delete("step");
      params.delete('user')
      params.delete('plan')
      router.replace(`/auth/signup?${params.toString()}`);
    }
  };
  const handleSendCode = async ({ data }) => {
    setIsSubLoading(true)
    const response = await createPost({
      endpoint: 'api/auth/send-code',
      data: data,
      tag: 'Auth',
    }).unwrap();
    if (response.message) {
      message.success('We have sent an Code in your email.');
      router.push(`/auth/verify-code`);
      dispatch(setTempData(data));
    }
    setIsSubLoading(false)
  }
  const onSubmit = async (values) => {
    const brandDetails = {
      name: values?.name || '',
      representative: values?.representative || '',
      targetAudience: values?.targetAudience || '',
      website: values?.website || '',
      legal_docs: values?.legal_docs || '',
      sub_main_category: values?.sub_main_category || '',
      subcategory: values?.subcategory || [],
      category: values?.category || ''
    };
    const influencerDetails = {
      name: values.first_name || '' + " " + values.last_name || '',
      bio: values?.bio || '',
      dateOfBirth: values?.dateOfBirth || '',
      nationality: values?.nationality || '',
      audience_info: values?.audience_info || {},
      content_cats: values?.content_cats || [],
      content_type: values?.content_type || [],
      social_media_info: values?.social_media_info || [],
      legal_docs: values?.legal_docs || '',
    };
    const riderDetails = {
      businessType: values?.businessType || '',
      website: values?.website || '',
      serviceArea: values?.serviceArea || [],
      deliveryServices: values?.deliveryServices || [],
      shippingRates: values?.shippingRates || {
        standard: '',
        express: '',
        international: '',
      },
      primary_contact: values?.primary_contact || {
        name: '',
        email: '',
        phone: '',
        position: '',
      },
      delivery_time: values?.delivery_time || {
        standard: '',
        express: '',
        international: '',
      },
      packaging: values?.packaging || {
        standard: false,
        custom: false,
      },
      tracking: values?.tracking || {
        is_number_provided: false,
        is_real_Time: false,
      },
      order_capacity: values?.order_capacity || '',
      deliveryVehicles: values?.deliveryVehicles || {
        fleetSize: '',
        vehicleTypes: [],
      },
      availability: values?.availability || [],
      insurance_coverage: values?.insurance_coverage || {
        amount: '',
        details: '',
      },
      return_process: values?.return_process || {
        is_customer_responsible: false,
        policy: '',
      },
      customerSupport: values?.customerSupport || {
        email: '',
        phone: '',
      },
    };
    const data = {
      first_name: values.first_name || '',
      last_name: values.last_name || '',
      email: values.email || '',
      profile_image: values.profile_image || '',
      cover_image: values.cover_image || '',
      logo: values.logo || '',
      userType: values.type || '',
      password: values.password || '',
      location: values.location || '',
      user: selectedUser,
      plan: selectedPlan,
      terms_and_conditions: values.terms_and_conditions || {},
      ...(type === 'brand' ? brandDetails : {}),
      ...(type === 'influencer' ? influencerDetails : {}),
      ...(type === 'courier_company' ? riderDetails : {})
    };

    if (type === "customer") {
      handleSendCode({ data: data })
      return
    }
    // console.log(data)
    switch (currentStep) {
      case 0:
        return handleSearchParams({ step: currentStep === 0 ? 2 : 1, user: selectedUser, plan: selectedPlan });
      case 1:
        return handleSearchParams({ step: 2, user: selectedUser, plan: selectedPlan });
      case 2:
        return handleSearchParams({ step: 3, user: selectedUser, plan: selectedPlan });
      case 3:
        return handleSearchParams({ step: 4, user: selectedUser, plan: selectedPlan });
      case 4:
        return handleSearchParams({ step: 5, user: selectedUser, plan: selectedPlan });
      case 5:
        // if (selectedPlan && selectedUser) {
        //   handleSendCode({ data: data })
        // } else {
        handleSearchParams({ step: 6, user: selectedUser, plan: selectedPlan });
        dispatch(setTempData(data));
        // }
        return;
      case 6:
        if (!selectedUser && !selectedPlan) {
          return message.error('Please Select Subscription Plan')
        }
        handleSendCode({
          data: {
            ...tempData,
            user: selectedUser,
            plan: selectedPlan,
          }
        })
        break;
      default:
        break;
    }
  };

  const handleFilterCategory = () => {
    const nFilterData = mainMenu?.menuItems?.find((item) => item._id === category) || []
    setMainSubCat(nFilterData?.sub_main_categories)
  }
  const handleFilterSubMainCategory = () => {
    const nFilterData = mainSubCat?.find((item) => item?._id === sub_main_category)
    setSubCat(nFilterData?.subcategories)
  }
  useEffect(() => {
    if (mainMenu?.menuItems?.length > 0 && category) {
      handleFilterCategory()
    }
  }, [category]);
  useEffect(() => {
    if (sub_main_category?.length > 0) {
      handleFilterSubMainCategory()
    }
  }, [sub_main_category]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const step = parseInt(params.get("step")) || 0;
    const plan = params.get("plan") || '';
    const user = params.get("user") || '';
    if (user && plan) {
      setSelectedPlan(plan)
      setSelectedUser(user)
      setValue('type', user)
    }
    if (type !== 'customer') {
      // if (currentStep === 4 && user && plan) {
      //   handleSendCode({
      //     data: {
      //       ...tempData,
      //       user: user,
      //       plan: plan,
      //     }
      //   })
      // } else
      setCurrentStep(Number(step));
    } else {
      handleSearchParams({ plan: plan, user: user })
    }
  }, [searchParams]);

  useEffect(() => {
    if (!type) return;

    setTypeData(type);

    if (type === "customer") {
      setCurrentStep(0);
      setCurrentUser(null);
    } else {
      const userSteps =
        type === "courier_company" ? stepsRider
          : type === "brand" ? stepsBrand
            : stepsInf;

      setCurrentUser(userSteps);
    }
  }, [type]);
  const commonForm = () => (<>
    <div className="col-span-6 sm:col-span-3">
      <FormInput
        name="first_name"
        label={t("auth.signup.form.firstName")}
        control={control}
        errors={errors}
        placeholder={t("auth.signup.form.firstName")}
      />
    </div>
    <div className="col-span-6 sm:col-span-3">
      <FormInput
        name="last_name"
        label={t("auth.signup.form.lastName")}
        control={control}
        errors={errors}
        placeholder={t("auth.signup.form.lastName")}

      />
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
              placeholder={t("auth.signup.form.email")}
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
          {t("auth.signup.form.email")}
        </span>
      </Label>
      {errors.email && (
        <p className="text-red-500 text-xs m-1 popins_regular">{errors.email.message}</p>
      )}
    </div>
    <div className="col-span-6">
      <SelectInput
        control={control}
        errors={errors}
        name="type"
        label={t("auth.signup.form.type")}
        placeholder={t("auth.signup.form.placeholderType")}
        options={regType}
      />
    </div>
    {type === 'influencer' &&
      <div className="col-span-6">
        <FormInput
          name="username"
          label={t("auth.signup.form.username")}
          control={control}
          errors={errors}
          directlyError={errors?.username?.message}
          placeholder={t("auth.signup.form.username")}
        />
      </div>}
    <div className="col-span-6">
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <>
            <Autocomplete
              ref={autocompleteRef2}
              apiKey='AIzaSyB9hunGMedxDrhrCt6GAr08ZODatbS2xZU'
              className="w-full border rounded-lg plusJakara_regular ps-3 py-[12px]"
              placeholder="Address"
              defaultValue={locationAdd?.address?.street || ''}
              options={{
                types: ['address'],
              }}
              onPlaceSelected={(place) => {
                const locationData = parseAddressComponents(place);
                setValue('location', locationData)
                // setValue("location", {
                //   address: {
                //     address: `${locationData.street}, ${locationData.city}, ${locationData.state}, ${locationData.zipCode}, ${locationData.country}`,
                //   },
                //   coordinates: {
                //     lat: locationData?.coordinates?.lat || null,
                //     lng: locationData?.coordinates?.lng || null,
                //   },
                // });
              }}

            />
          </>
        )}
      />
      {errors.location?.address && (
        <p className="text-red-500 text-xs m-1 popins_regular">{errors.location.address?.street?.message}</p>
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
              placeholder={t("auth.signup.form.password")}
              name="password"
              //     invalid={!!errors.password}
              className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.password ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                }`}
            />
          )}
        />
        <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          {t("auth.signup.form.password")}
        </span>
      </Label>
      {errors.password && (
        <p className="text-red-500 text-xs m-1 popins_regular">{errors.password.message}</p>
      )}
    </div>
    <div className="col-span-6">
      <Label
        for="confirmPassword"
        className="relative block overflow-hidden text-gray-00 rounded-lg border border-gray-400 px-3 pt-3 mb-0"
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
              placeholder={t("auth.signup.form.confirmPassword")}
              name="confirmPassword"
              // invalid={!!errors.confirmPassword}
              className={`peer h-8 w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.confirmPassword ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                }`}
            />
          )}
        />
        <span className="absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          {t("auth.signup.form.confirmPassword")}
        </span>
      </Label>
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs m-1 popins_regular">{errors.confirmPassword.message}</p>
      )}
    </div>

  </>)
  return (
    <>
      {/* {currentStep <= 3 ? */}
      <AuthLayout isStepper={currentStep !== 0}>
        <>
          <AuthHeading heading={(currentStep === 0) ? t("auth.signup.title") : currentUser?.find(item => item?.number === currentStep)?.heading || type} subHeading={t("auth.signup.subtitle")} />
          {currentStep !== 0 && <Stepper steps={currentUser} currentStep={currentStep} is_Sm_Hidden={false} />}
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className={`mt-8 ${currentStep === 6 ? '' : ' grid grid-cols-6 gap-3 auth-form'} `}
          >
            {(currentStep === 1 || currentStep === 0) && commonForm()}
            {type === 'brand' && currentStep !== 6 && brandForm({ clearErrors, control: control, errors: errors, category: mainMenu?.menuItems, mainSubCat: mainSubCat, subCategory: subCat, t, currentStep: currentStep, setValue: setValue })}

            {type === 'influencer' && currentStep !== 6 && influencerForm({ clearErrors, control: control, errors: errors, t, currentStep: currentStep, setValue: setValue })}
            {/* {type === 'influencer' && currentStep === 3 && influencerDoc({ clearErrors, control: control, setValue: setValue, errors: errors, t })} */}

            {type === 'courier_company' && currentStep !== 6 && riderForm({ clearErrors, control: control, errors: errors, deliveryServices: deliveryServices, t, currentStep: currentStep, setValue: setValue })}
            {currentStep === 6 && <PricingPage userType={type} currentStep={currentStep} />}
            {(currentStep === 5 || type === 'customer') && termsConditionsCheck({ clearErrors, control: control, errors: errors, t })}
            {(currentStep === 0) ?
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full pb-4 pt-3">
                <button disabled={isSubLoading} type="submit" className="btn1 primary small-btn-3 w-100">
                  {isSubLoading ? <BeatLoader color="#fff" size={10} /> : (type === 'customer' ? t("auth.signup.signupBtn") : t("auth.signup.continueBtn"))}
                </button>
              </div> : <div className="col-span-6 flex items-center justify-center  gap-3 w-full  pb-4 pt-3">
                <button disabled={isSubLoading} type="button" onClick={() => router.back()} className="btn1 outline-primary small-btn-3 ">
                  {isSubLoading ? <BeatLoader color="#fff" size={10} /> : 'Previous'}
                </button>
                <button disabled={isSubLoading} type="submit" className="btn1 primary small-btn-3 ">
                  {isSubLoading ? <BeatLoader color="#fff" size={10} /> : (t("auth.signup.continueBtn"))}
                </button>
              </div>}
          </Form>
          {(currentStep === 1 || currentStep === 0) &&
            <p className="pt-3 popins_regular text_secondary2">
              {t("auth.signup.alreadyAccount")}{" "}<Link href="/auth/login" className=" _link_underline popins_medium">
                {t("auth.signup.loginBtn")}
              </Link>
            </p>}
        </>
      </AuthLayout >
      {/* // : <PricingPage userType={type} currentStep={currentStep} /> */}
      {/*  <section className="min-vh-100">
         <Container fluid='sm'>
           <StepperHeading path={() => setCurrentStep(currentStep - 1)} currentStep={currentStep} isSmall={true} heading={currentUser?.find(item => item?.number === currentStep)?.heading || type} />
           <Stepper steps={currentUser} currentStep={currentStep} is_Sm_Hidden={false} />
           <div className="pb-4">
             <Row className="auth-right" >
               <Col md="6" className="inner" >
                 <Form
                   onSubmit={handleSubmit(onSubmit)}
                   className="mt-8 grid grid-cols-6 gap-3 auth-form max-w-xl"
                 >
                   {currentStep === 1 && commonForm()}
                   {type === 'brand' && currentStep === 2 && brandForm({ clearErrors, control: control, errors: errors })}
                   {type === 'brand' && currentStep === 3 && businessForm({ clearErrors, control: control, setValue: setValue, errors: errors })}

                   {type === 'influencer' && currentStep === 2 && influencerForm({ clearErrors, control: control, errors: errors })}
                   {type === 'influencer' && currentStep === 3 && influencerDoc({ clearErrors, control: control, setValue: setValue, errors: errors })}

                   {type === 'courier_company' && currentStep === 2 && riderForm({ clearErrors, control: control, errors: errors })}
                   {type === 'courier_company' && currentStep === 3 && riderDoc({ clearErrors, control: control, setValue: setValue, errors: errors })}

                   <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full">
                     <button type="submit" className="btn1 primary w-100">
                       {type === 'customer' ? 'Sign Up' : 'Continue'}
                     </button>
                   </div>
                 </Form>
               </Col>
               <Col md="6" className="d-md-flex justify-center items-center d-none h-100 sticky top-24">
                 <img className="max-h-[500px] animate__animated animate__zoomIn h-100" src={currentUser?.find(item => item?.number === currentStep)?.img} alt="img" />
               </Col>
             </Row>
           </div> 

         </Container>
       </section>*/}
    </>
  );
};


const Page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SignupPage />
      </Suspense>
    </>
  )
}

export default Page