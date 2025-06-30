/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Container } from "reactstrap";
import { fadeIn, staggerContainer } from "../utils/motion";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";
import ApiFunction from "../api/apiFuntions";
import { notificationemail } from "../api/ApiFile";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export default function ContactSection() {
  const router = useRouter();
  const { post } = ApiFunction();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language?.language);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const hanlePushr = (e) => {
    e.preventDefault();
    router.push("/termCondition");
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    const api = notificationemail;
    const apiData = {
      email: data?.email,
    };
    post(api, apiData)
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          reset();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "errro ");
        setLoading(false);
      });
    // Reset after submit
  };

  return (
    <>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="md:px-3 pt-[2rem] md:pt-[4.875rem] pb-[2rem] md:pb-[4.175rem] bg-[#F3F3F9] plusJakara_regular text_white flex items-center justify-center text-center bg_mainsecondary overflow-hidden"
      >
        {/* Ensures content is above the overlay */}
        <Container fluid="xxl">
          <div className="px-2 px-md-4 bg_primary py-[1.5rem] md:py-[4rem] w-full plusJakara_medium rounded-2xl">
            <motion.div
              className="flex items-center justify-center"
              variants={fadeIn("down", "tween", 0.3, 0.8)}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <div className="md:max-w-[50rem]">
                <h2 className="text-[20px] sm:text-2xl md:text-3xl poppins_medium capitalize text-center m-auto mb-2 md:mb-4">
                  {t("emailSubscribe.heading")}
                </h2>
                <p className="max-w-xl mx-auto poppins_regular text-center text-xs sm:text-sm md:text-base capitalize mb-3 md:mb-4">
                  {t("emailSubscribe.heading2")}
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg_white p-[0.3rem] md:p-[0.4rem] max-w-[33rem] m-auto rounded-[6px] mb-2 md:mb-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex">
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder={t("emailSubscribe.heading3")}
                              className={`text_primary border-0 text-[0.8rem] sm:text-[1rem] flex-1`}
                              {...field}
                            />
                          )}
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg_primary py-2 py-md-3 px-4 px-sm-5 rounded-[6px] whitespace-nowrap text-sm md:text-base poppins_medium"
                        >
                          {loading ? (
                            <>
                              <div className="flex justify-center items-center mb-2">
                                <div className="loader border-t-2 border-b-2 border-white-500 rounded-full w-5 h-5 animate-spin" />
                              </div>
                            </>
                          ) : (
                            <>{t("emailSubscribe.heading4")}</>
                          )}
                        </button>
                      </div>
                      {errors.email && (
                        <span className="text-red-500 text-sm ms-2">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                </form>

                <p className="text-xs poppins_regular mt-4 mb-0">
                  {t("emailSubscribe.heading5")}
                  <span
                    onClick={hanlePushr}
                    className="text_white ms-1 underline cursor-pointer"
                  >
                    {t("emailSubscribe.heading6")}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* <div className="w-full h-[3rem] md:h-[4.75rem] bg_white"></div> */}
    </>
  );
}
