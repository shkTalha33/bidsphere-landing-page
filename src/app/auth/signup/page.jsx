"use client"

import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Input, Label } from "reactstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Autocomplete from 'react-google-autocomplete';
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import SelectInput from '@/components/common/formSelect';
import FormInput from '@/components/common/formInput';

const SignupPage = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isSubLoading, setIsSubLoading] = useState(false);

  const regType = [
    { value: 'customer', label: "Customer" },
    { value: 'brand', label: "Brand" },
    { value: 'influencer', label: "Influencer" },
    { value: 'courier_company', label: "Courier Company" },
  ];

  const schema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    type: Yup.string().required("Type is required"),
    location: Yup.object().shape({
      address: Yup.object().shape({
        street: Yup.string().required("Address is required"),
      }),
      coordinates: Yup.object().shape({
        lat: Yup.number(),
        lng: Yup.number(),
      }),
    }),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const togglePassword = (e) => {
    e.preventDefault();
    setIsPasswordHidden((prevState) => !prevState);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const parseAddressComponents = (place) => {
    let address = '';
    let city = '';
    let state = '';
    let zipCode = '';
    let country = '';

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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-3 auth-form">
      <div className="col-span-6 sm:col-span-3">
        <FormInput
          name="first_name"
          label="First Name"
          control={control}
          errors={errors}
          placeholder="First Name"
        />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <FormInput
          name="last_name"
          label="Last Name"
          control={control}
          errors={errors}
          placeholder="Last Name"
        />
      </div>

      <div className="col-span-6">
        <Label htmlFor="email" className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
              />
            )}
          />
          <span className="absolute start-3 top-2 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Email
          </span>
        </Label>
        {errors.email && (
          <p className="text-red-500 text-xs m-1">{errors.email.message}</p>
        )}
      </div>

      <div className="col-span-6">
        <SelectInput
          control={control}
          errors={errors}
          name="type"
          label="User Type"
          placeholder="Select Type"
          options={regType}
        />
      </div>

      <div className="col-span-6">
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Autocomplete
              apiKey="YOUR_GOOGLE_MAPS_API_KEY"
              className="w-full border rounded-lg ps-3 py-3"
              placeholder="Address"
              options={{
                types: ['address'],
              }}
              onPlaceSelected={(place) => {
                const locationData = parseAddressComponents(place);
                setValue('location', locationData);
              }}
            />
          )}
        />
        {errors.location?.address && (
          <p className="text-red-500 text-xs m-1">{errors.location.address?.street?.message}</p>
        )}
      </div>

      <div className="col-span-6">
        <Label htmlFor="password" className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0">
          <button
            className="absolute right-3 inset-y-0 my-auto"
            onClick={togglePassword}
          >
            {!isPasswordHidden ? (
              <BsEyeFill size={20} className="text-gray-500" />
            ) : (
              <BsEyeSlashFill size={20} className="text-gray-500" />
            )}
          </button>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Password"
                className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.password ? "border-red-500" : ""}`}
              />
            )}
          />
          <span className="absolute start-3 top-2 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Password
          </span>
        </Label>
        {errors.password && (
          <p className="text-red-500 text-xs m-1">{errors.password.message}</p>
        )}
      </div>

      <div className="col-span-6">
        <Label htmlFor="confirmPassword" className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0">
          <button
            className="absolute right-3 inset-y-0 my-auto"
            onClick={toggleConfirmPassword}
          >
            {!isConfirmPasswordHidden ? (
              <BsEyeFill size={20} className="text-gray-500" />
            ) : (
              <BsEyeSlashFill size={20} className="text-gray-500" />
            )}
          </button>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                type={isConfirmPasswordHidden ? "password" : "text"}
                placeholder="Confirm Password"
                className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
            )}
          />
          <span className="absolute start-3 top-2 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Confirm Password
          </span>
        </Label>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs m-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4 w-full pb-4 pt-3">
        <button disabled={isSubLoading} type="submit" className="btn1 primary small-btn-3 w-100">
          {isSubLoading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
        </button>
      </div>

      <p className="col-span-6 pt-3 text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="_link_underline">
          Login
        </Link>
      </p>
    </Form>
  );
};

export default SignupPage;