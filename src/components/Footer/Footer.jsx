/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import {
  appstore,
  auctionlogo,
  Logo11,
  Logo2,
  Logo3,
  Logo4,
  playstore,
} from "../assets/icons/icon";
import { useFootersQuery } from "../redux/footerSlice";
import { GetFooter } from "../api/ApiFile";

const Footer = () => {
  const { data, isFetching, error } = useFootersQuery({
    endpoint: GetFooter,
  });

  return (
    <footer className="bg_primary text-white py-5 sm:py-12 md:py-16">
      <div className="container mx-auto md:px-4 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12">
        <div className="space-y-6">
          <div>
            <Image
              src={Logo11}
              alt="Logo"
              className="mb-2 md:mb-6 h-[7rem] object-contain w-[7rem]"
            />
            <p className="text-sm max-w-md">{data?.footer?.desc}</p>
          </div>
          <Link href="#" className="inline-block">
            <button className="bg-white text_dark px-8 text-sm md:text-base md:px-10 py-2 md:py-3 rounded-md poppins_medium capitalize">
              bid now
            </button>
          </Link>
        </div>

        {/* Middle Section - Contacts */}
        <div className="lg:px-12">
          <h3 className="text-lg md:text-2xl poppins_semibold mb-2 md:mb-8">
            Contacts
          </h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm">{data?.footer?.phone1}</p>
              <p className="text-sm">{data?.footer?.phone2}</p>
            </div>
            <div>
              <p className="mb-1 text-sm">{data?.footer?.email1}</p>
              <p className="text-sm">{data?.footer?.email2}</p>
            </div>
            <div>
              <p className="text-sm">{data?.footer?.address}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Social & Download */}
        <div className="space-y-8">
          <div className="flex gap-4">
            {data?.footer?.socials?.map((item, index) => {
              return (
                <Link
                  href={item?.link}
                  key={index}
                  className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12  rounded-full"
                >
                  <img
                    src={item?.image}
                    className="rounded-full w-[100%] h-[100%]"
                    alt=""
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
            <Link href="#">
              <Image
                src={playstore}
                className="w-28 h-8 md:w-36 md:h-11"
                alt="Get it on Google Play"
              />
            </Link>
            <Link href="#">
              <Image
                src={appstore}
                className="w-28 h-8 md:w-36 md:h-11"
                alt="Download on the App Store"
              />
            </Link>
          </div>

          <div className="flex gap-6 text-sm">
            <Link href="/privacyPolicy" className="hover:underline">
              Privacy
            </Link>

            <Link href="/termCondition" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
