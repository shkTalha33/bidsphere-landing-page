/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetFooter } from "../api/ApiFile";
import { AppStoreIconw, Logo11, PlayStoreIcon } from "../assets/icons/icon";
import { useFootersQuery } from "../redux/footerSlice";
import { Container } from "react-bootstrap";

const Footer = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language?.language);
  const { data } = useFootersQuery({
    endpoint: GetFooter,
  });

  return (
    <footer
      className={`bg_primary text-white py-4 sm:py-12 md:py-16  ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <Container
        fluid="xxl"
        className="mx-auto md:px-4 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12"
      >
        <div className="space-y-6 flex flex-col items-start justify-start">
          <div>
            <Image
              src={Logo11}
              alt="Logo"
              className="mb-2 md:mb-6 h-[4rem] sm:h-[5rem] md:h-[6rem] object-contain w-[4rem] sm:w-[5rem] md:w-[6rem] mx-auto"
            />
            <p className={`text-sm max-w-md `}>
              {data?.footer?.desc[language]}
            </p>
          </div>
          <Link href="/auctions" className="inline-block mx-auto">
            <button className="bg-white text_dark px-8 text-sm md:text-base md:px-10 py-2 md:py-3 rounded-md poppins_medium capitalize">
              {t("homeSlider.button")}
            </button>
          </Link>
        </div>

        {/* Middle Section - Contacts */}
        <div
          className={`lg:px-12 flex justify-start flex-col ${
            language === "ar" ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <h3 className={`text-lg md:text-2xl poppins_semibold mb-2 md:mb-8`}>
            {t("footer.heading")}
          </h3>
          <div className={`space-y-4`}>
            <div>
              <a
                href={`tel:${data?.footer?.phone1}`}
                className="mb-1 text-sm block text-white hover:underline"
              >
                +{data?.footer?.phone1}
              </a>
              <a
                href={`tel:${data?.footer?.phone2}`}
                className="text-sm block text-white hover:underline"
              >
                +{data?.footer?.phone2}
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
              <p className="text-sm">{data?.footer?.address[language]}</p>
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
            className={`
    flex flex-col
    md:flex-row
    ${
      language === "ar"
        ? "items-start justify-end md:items-center"
        : "items-start justify-start md:items-center"
    }
  gap-2 gap-md-4
    mb-4 md:mb-0
  `}
          >
            <div className="border cursor-pointer flex w-fit items-center px-[13px] py-[7px] gap-2 rounded-[10px]">
              <Image
                alt="Play Store"
                src={PlayStoreIcon}
                className={`h-[25px] w-[25px] sm:h-[35px] sm:w-[35px] object-contain ${
                  language === "ar" ? "order-2" : "order-1"
                }`}
              />
              <div
                className={`flex flex-column ${
                  language === "ar" ? "order-1" : "order-2"
                }`}
              >
                <h5 className="color-0 poppins_regular whitespace-nowrap text-[0.6rem] sm:text-[0.8rem]">
                  {t("mobileSection.heading5")}{" "}
                </h5>
                <h4 className="poppins_medium whitespace-nowrap text-[1rem] sm:text-[1.2rem] color-0">
                  {t("mobileSection.heading6")}
                </h4>
              </div>
            </div>
            <div className="border cursor-pointer flex w-fit items-center px-[10px] py-[5px] md:px-[13px] md:py-[7px] gap-2 rounded-[10px]">
              <Image
                alt="Play Store"
                src={AppStoreIconw}
                className={`h-[25px] w-[25px] sm:h-[35px] sm:w-[35px] object-contain ${
                  language === "ar" ? "order-2" : "order-1"
                }`}
              />
              <div
                className={`flex flex-column ${
                  language === "ar" ? "order-1" : "order-2"
                }`}
              >
                <h5 className="color-0 poppins_regular text-[0.6rem] sm:text-[0.8rem]">
                  {t("mobileSection.heading7")}
                </h5>
                <h4 className="poppins_medium whitespace-nowrap text-[1rem] sm:text-[1.2rem] color-0">
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
            <Link href="/privacyPolicy" className="hover:underline text-white">
              {t("footer.heading2")}
            </Link>
            <Link href="/termCondition" className="hover:underline text-white">
              {t("footer.heading3")}
            </Link>
            <Link href="/contactUS" className="hover:underline text-white">
              {t("nav.contactus")}
            </Link>
            <Link href="/help-center" className="hover:underline text-white">
              {t("profil.heading29")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
