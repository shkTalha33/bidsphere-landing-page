"use client";
import React, { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ApiFunction from "@/components/api/apiFuntions";
import { contactUs, contactUsApi, GetFooter } from "@/components/api/ApiFile";
import { message } from "antd";
import { FiPhone, FiMail, FiSend } from "react-icons/fi";
import { useFootersQuery } from "@/components/redux/footerSlice";

const Page = () => {
  const { post } = ApiFunction();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    message: yup.string().required("Message is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);
    const api = contactUsApi;
    const apiData = {
      name: data?.name,
      email: data?.email,
      msg: data?.message,
    };
    post(api, apiData)
      .then((res) => {
        if (res?.success) {
          message.success("Message sent successfully");
          reset({
            name: "",
            email: "",
            message: "",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in contact us api");
        setLoading(false);
      });
  };

  // Primary color
  const primaryColor = "#844e4e";

  const { data, isFetching, error } = useFootersQuery({
    endpoint: GetFooter,
  });

  return (
    <>
      <Container className="bg-white rounded-lg mt-20 p-2 p-md-4 shadow-lg">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Contact Us"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text-gray-800">
              Contact Us
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className="mt-6 mb-4">
        <Row className="g-4">
          {/* Contact Info Cards */}
          <Col lg="4" md="6" className="mb-4 md:mb-0">
            <Row className="g-3">
              <Col xs="12" className="bg-white p-6 rounded-lg shadow-lg h-full">
                {/* Call Us Card */}
                <div
                  className="rounded-lg transition-all duration-300 cursor-pointer group"
                  style={{
                    "--tw-bg-opacity": 0.1,
                    "--tw-ring-color": primaryColor,
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="text-white p-3 rounded-full transition-all duration-300 group-hover:shadow-md mr-4"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FiPhone size={24} />
                    </div>
                    <h4 className="text-xl poppins_medium text-gray-800">
                      Call Us
                    </h4>
                  </div>
                  <p className="text-gray-600 pl-14">{data?.footer?.phone1}</p>
                </div>
              </Col>

              <Col xs="12" className="bg-white p-6 rounded-lg shadow-lg h-full">
                {/* Email Us Card */}
                <div
                  className="rounded-lg transition-all duration-300 cursor-pointer group"
                  style={{
                    "--tw-bg-opacity": 0.1,
                    "--tw-ring-color": primaryColor,
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className="text-white p-3 rounded-full transition-all duration-300 group-hover:shadow-md mr-4"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FiMail size={24} />
                    </div>
                    <h4 className="text-xl poppins_medium text-gray-800">
                      Email Us
                    </h4>
                  </div>
                  <p className="text-gray-600 pl-14">{data?.footer?.email1}</p>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Contact Form */}
          <Col lg="8" md="6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl poppins_semibold text-gray-800 mb-6">
                Get In Touch
              </h4>
              <p className="text-gray-600 mb-8">
                It is a long established fact that a reader will be distracted
                by the readable content of a page words which even slightly when
                looking at its layout.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label
                    htmlFor="name"
                    className="block text-sm poppins_medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="name"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ "--tw-ring-color": primaryColor }}
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm poppins_medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                        style={{ "--tw-ring-color": primaryColor }}
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm poppins_medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="message"
                        placeholder="Write your message here..."
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none"
                        style={{ "--tw-ring-color": primaryColor }}
                        {...field}
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-3 text-white poppins_medium rounded-lg transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? (
                    <Spinner size="sm" className="mr-2" />
                  ) : (
                    <>
                      <FiSend className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
