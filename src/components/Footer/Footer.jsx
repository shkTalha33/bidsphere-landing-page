import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Youtube } from 'react-feather';
import { appstore, auctionlogo, playstore } from '../assets/icons/icon';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { FiLinkedin } from 'react-icons/fi';
import { AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg_primary text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div>
            <Image
              src={auctionlogo}
              width={80}
              height={50}
              alt="Logo"
              className="mb-6"
            />
            <p className="text-sm max-w-md">
              Aenean fermentum sapien acenagravida. Fusce a ipsum metuslai.
              Suspendisse oi potenti.Aenean fermentum sapien acenagravida.
              Fusce a ipsum metuslai.Suspendisse oi potenti.
            </p>
          </div>
          <Link href="#" className="inline-block">
            <button className="bg-white text-black px-10 py-3 rounded-md font-medium">
              bid now
            </button>
          </Link>
        </div>

        {/* Middle Section - Contacts */}
        <div className="lg:px-12">
          <h3 className="text-2xl font-semibold mb-8">Contacts</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1">+880 176 1111 456</p>
              <p>+880 176 1111 555</p>
            </div>
            <div>
              <p className="mb-1">info@example.com</p>
              <p>info@support.com</p>
            </div>
            <div>
              <p>168/170, Avenue 01, Mirpur DOHS,</p>
              <p>Pakistan</p>
            </div>
          </div>
        </div>

        {/* Right Section - Social & Download */}
        <div className="space-y-8">
          <div className="flex gap-4">
            <Link href="#" className="bg-white p-3 rounded-full">
              <BsTwitter className="w-6 h-6 text-[#500000]" />
            </Link>
            <Link href="#" className="bg-white p-3 rounded-full">
              <FaFacebookF className="w-6 h-6 text-[#500000]" />
            </Link>
            <Link href="#" className="bg-white p-3 rounded-full">
              <FaLinkedinIn className="w-6 h-6 text-[#500000]" />
            </Link>
            <Link href="#" className="bg-white p-3 rounded-full">
              <FaYoutube className="w-6 h-6 text-[#500000]" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="#">
              <Image
                src={playstore}
                width={155}
                height={50}
                alt="Get it on Google Play"
              />
            </Link>
            <Link href="#">
              <Image
                src={appstore}
                width={140}
                height={42}
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