import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { appstore, auctionlogo, playstore } from '../assets/icons/icon';

const Footer = () => {
  return (
    <footer className="bg_primary text-white py-4 sm:py-12 md:py-16">
      <div className="container mx-auto md:px-4 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12">
        <div className="space-y-6">
          <div>
            <Image
              src={auctionlogo}
              width={80}
              height={50}
              alt="Logo"
              className="mb-2 md:mb-6"
            />
            <p className="text-sm max-w-md">
              Aenean fermentum sapien acenagravida. Fusce a ipsum metuslai.
              Suspendisse oi potenti.Aenean fermentum sapien acenagravida.
              Fusce a ipsum metuslai.Suspendisse oi potenti.
            </p>
          </div>
          <Link href="#" className="inline-block">
            <button className="bg-white text_dark px-8 text-sm md:text-base md:px-10 py-2 md:py-3 rounded-md poppins_medium capitalize">
              bid now
            </button>
          </Link>
        </div>

        {/* Middle Section - Contacts */}
        <div className="lg:px-12">
          <h3 className="text-lg md:text-2xl poppins_semibold mb-2 md:mb-8">Contacts</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm">+880 176 1111 456</p>
              <p className="text-sm">+880 176 1111 555</p>
            </div>
            <div>
              <p className="mb-1 text-sm">info@example.com</p>
              <p className="text-sm">info@support.com</p>
            </div>
            <div>
              <p className="text-sm">168/170, Avenue 01, Mirpur DOHS,</p>
              <p className="text-sm">Pakistan</p>
            </div>
          </div>
        </div>

        {/* Right Section - Social & Download */}
        <div className="space-y-8">
          <div className="flex gap-4">
            <Link href="#" className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12  rounded-full">
              <BsTwitter className="text_primary" />
            </Link>
           <Link href="#" className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12  rounded-full">
              <FaFacebookF className="text_primary" />
            </Link>
           <Link href="#" className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12  rounded-full">
              <FaLinkedinIn className="text_primary" />
            </Link>
           <Link href="#" className="bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12  rounded-full">
              <FaYoutube className="text_primary" />
            </Link>
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
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Accessibility</Link>
            <Link href="#" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;