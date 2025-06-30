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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Page = () => {
  const { post } = ApiFunction();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);
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
    <main className="px-2 px-md-4">
      <Container
        fluid="xxl"
        className="bg-white rounded-lg p-2 p-md-4 shadow-[0px_4px_22.9px_0px_#0000000D]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={t("nav.contactus")} />
            <h3 className="text-xl sm:text-2xl poppins_medium text-gray-800">
              {t("nav.contactus")}
            </h3>
          </Col>
        </Row>
      </Container>

      <Container
        fluid="xxl"
        className="mt-6 mb-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Row className="g-2 g-md-4">
          {/* Contact Info Cards */}
          <Col lg="4" md="6" className="mb-4 md:mb-0">
            <Row className="g-3">
              <Col
                xs="12"
                className="bg-white p-3 rounded-lg shadow-[0px_4px_22.9px_0px_#0000000D] h-full"
              >
                {/* Call Us Card */}
                <div
                  className="rounded-lg transition-all duration-300 cursor-pointer group"
                  style={{
                    "--tw-bg-opacity": 0.1,
                    "--tw-ring-color": primaryColor,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="text-white p-2 rounded-full transition-all duration-300 group-hover:shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FiPhone size={18} />
                    </div>
                    <h4 className="text-xl poppins_medium text-gray-800">
                      {t("contactUs.heading")}
                    </h4>
                  </div>
                  <p
                    className={`text-gray-600 mb-0 ${
                      language === "ar" ? "pr-10" : "pl-10"
                    }`}
                  >
                    {data?.footer?.phone1}
                  </p>
                </div>
              </Col>

              <Col
                xs="12"
                className="bg-white p-3 rounded-lg shadow-[0px_4px_22.9px_0px_#0000000D] h-full"
              >
                {/* Email Us Card */}
                <div
                  className="rounded-lg transition-all duration-300 cursor-pointer group"
                  style={{
                    "--tw-bg-opacity": 0.1,
                    "--tw-ring-color": primaryColor,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="text-white p-2 rounded-full transition-all duration-300 group-hover:shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FiMail size={18} />
                    </div>
                    <h4 className="text-xl poppins_medium text-gray-800">
                      {t("contactUs.heading2")}
                    </h4>
                  </div>
                  <p
                    className={`text-gray-600 mb-0 ${
                      language === "ar" ? "pr-10" : "pl-10"
                    }`}
                  >
                    {data?.footer?.email1}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Contact Form */}
          <Col lg="8" md="6">
            <div className="bg-white px-2 py-3 p-md-4 rounded-lg shadow-[0px_4px_22.9px_0px_#0000000D]">
              <h4
                className={`text-xl poppins_semibold text-gray-800 mb-2 mb-md-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("contactUs.heading3")}
              </h4>
              <p
                className={`text-gray-600 mb-2 mb-md-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("contactUs.heading4")}
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2 mb-md-4">
                  <label
                    htmlFor="name"
                    className={`block text-sm poppins_medium text-gray-700 mb-2 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("contactUs.heading5")}
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="name"
                        placeholder={t("contactUs.heading5")}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
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
                    className={`block text-sm poppins_medium text-gray-700 mb-2 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("emailSubscribe.heading3")}
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="email"
                        placeholder={t("emailSubscribe.heading3")}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
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
                    className={`block text-sm poppins_medium text-gray-700 mb-2 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("contactUs.heading6")}
                  </label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        id="message"
                        placeholder={t("contactUs.heading7")}
                        rows={5}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
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
                  className={`flex items-center bg_primary justify-center w-full sm:w-auto px-3 whitespace-nowrap py-2 text-white poppins_medium rounded-lg transition-all duration-300 hover:opacity-90 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {loading ? (
                    <Spinner size="sm" className="mr-2" />
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      {t("contactUs.heading8")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Page;
