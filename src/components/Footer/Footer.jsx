/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetFooter } from "../api/ApiFile";
import { AppStoreIconw, Logo11, PlayStoreIcon } from "../assets/icons/icon";
import { useFootersQuery } from "../redux/footerSlice";

const Footer = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language?.language);
  const { data, isFetching, error } = useFootersQuery({
    endpoint: GetFooter,
  });

  return (
    <footer
      className={`bg_primary text-white py-5 mt-3 sm:py-12 md:py-16 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div className="container mx-auto md:px-4 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12">
        <div className="space-y-6 flex flex-col items-start justify-start">
          <div>
            <Image
              src={Logo11}
              alt="Logo"
              className="mb-2 md:mb-6 h-[7rem] object-contain w-[7rem]"
            />
            <p className={`text-sm max-w-md `}>{data?.footer?.desc}</p>
          </div>
          <Link href="/auctions" className="inline-block">
            <button className="bg-white text_dark px-8 text-sm md:text-base md:px-10 py-2 md:py-3 rounded-md poppins_medium capitalize">
              {t("homeSlider.button")}
            </button>
          </Link>
        </div>

        {/* Middle Section - Contacts */}
        <div
          className={`lg:px-12 ${
            language === "ar" ? "lg:pr-12 lg:pl-0" : "lg:pl-12"
          }`}
        >
          <h3
            className={`text-lg md:text-2xl poppins_semibold mb-2 md:mb-8 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("footer.heading")}
          </h3>
          <div
            className={`space-y-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            <div>
              <a
                href={`tel:${data?.footer?.phone1}`}
                className="mb-1 text-sm block text-white hover:underline"
              >
                {data?.footer?.phone1}
              </a>
              <a
                href={`tel:${data?.footer?.phone2}`}
                className="text-sm block text-white hover:underline"
              >
                {data?.footer?.phone2}
              </a>
            </div>
            <div>
              <a
                href={`mailto:${data?.footer?.email1}`}
                className="mb-1 text-sm block text-white hover:underline"
              >
                {data?.footer?.email1}
              </a>
              <a
                href={`mailto:${data?.footer?.email2}`}
                className="text-sm block text-white hover:underline"
              >
                {data?.footer?.email2}
              </a>
            </div>
            <div>
              <p className="text-sm">{data?.footer?.address}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Social & Download */}
        <div
          className={`space-y-8 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {/* <div className="flex gap-4">
            {data?.footer?.socials?.map((item, index) => {
              return (
                <a
                  href={item?.link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full"
                >
                  <img
                    src={item?.image}
                    className="rounded-full w-[100%] h-[100%]"
                    alt={`social-${index}`}
                  />
                </a>
              );
            })}
          </div> */}

          <div
            className={`flex ${
              language === "ar"
                ? "justify-end"
                : "justify-center md:justify-start"
            } max-[440px]:flex-col max-[440px]:items-center gap-[1.145rem] mb-4 mb-md-0`}
          >
            <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
              <Image
                alt="Play Store"
                src={PlayStoreIcon}
                className={`h-[35px] w-[35px] object-contain ${
                  language === "ar" ? "order-2" : "order-1"
                }`}
              />
              <div
                className={`flex flex-column ${
                  language === "ar" ? "order-1" : "order-2"
                }`}
              >
                <h5 className="color-0 poppins_regular whitespace-nowrap text-[0.8rem]">
                  {t("mobileSection.heading5")}{" "}
                </h5>
                <h4 className="poppins_medium whitespace-nowrap text-[1.2rem] color-0">
                  {t("mobileSection.heading6")}
                </h4>
              </div>
            </div>
            <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
              <Image
                alt="Play Store"
                src={AppStoreIconw}
                className={`h-[35px] w-[35px] object-contain ${
                  language === "ar" ? "order-2" : "order-1"
                }`}
              />
              <div
                className={`flex flex-column ${
                  language === "ar" ? "order-1" : "order-2"
                }`}
              >
                <h5 className="color-0 poppins_regular text-[0.8rem]">
                  {t("mobileSection.heading7")}
                </h5>
                <h4 className="poppins_medium whitespace-nowrap text-[1.2rem] color-0">
                  {t("mobileSection.heading8")}
                </h4>
              </div>
            </div>
          </div>

          <div
            className={`flex ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            } gap-6 text-sm`}
          >
            <Link href="/privacyPolicy" className="hover:underline">
              {t("footer.heading2")}
            </Link>

            <Link href="/termCondition" className="hover:underline">
              {t("footer.heading3")}
            </Link>
            <Link href="/contactUS" className="hover:underline">
              {t("nav.contactus")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
