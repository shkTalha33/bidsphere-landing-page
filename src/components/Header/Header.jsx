"use client"

import Link from "next/link";
/* eslint-disable no-unused-vars */
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { auctionlogo } from "../assets/icons/icon";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomeOrHashRoute =
    pathname === "/"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleJoinUsClick = () => {
    router.push("/joinus");
    setIsMenuOpen(false);
  };

  const handleNavClose = () => {
    setIsMenuOpen(false);
  };

  const handleValixClick = () => {
    if (pathname !== "/") {
      router.push("/");
    }
    setIsMenuOpen(false);
    // Delay to ensure the navigation completes
    setTimeout(() => {
      const valixFeature = document.getElementById("valix-feature");
      if (valixFeature) {
        valixFeature.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Adjust delay if needed
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos > prevScrollPos;

      setPrevScrollPos(currentScrollPos);

      if (isScrollingUp) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`
      ${isHomeOrHashRoute ? "bg-[#4d45450a]" : ""}  
      py-[1rem] plusJakara_regular z-50 main_nav ${isScrolled ? "scrolled" : ""
        }`}
      style={{ zIndex: 999 }}
      id="navbar"
    >
      <Container>
        <nav className="flex justify-between items-center w-full">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={auctionlogo} alt="Logo" className="w-[3rem]" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden d-md-flex items-center gap-[2rem] lg:gap-[8.18rem]">
            <div className="gap-[1rem] lg:gap-[1.87rem] flex items-center">
              <Link
                onClick={handleNavClose}
                href="/"
                className={`${pathname === "/"
                  ? "text_primary plusJakara_bold"
                  : isHomeOrHashRoute
                    ? "text_white"
                    : "text_dark"
                  } cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline plusJakara_regular`}
              >
                Home
              </Link>
              <Link
                onClick={handleNavClose}
                href="/pricing"
                className={`${pathname === "/pricing"
                  ? "text_primary plusJakara_bold"
                  : isHomeOrHashRoute
                    ? "text_white"
                    : "text_dark"
                  } cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline plusJakara_regular`}
              >
                Pricing
              </Link>
              <Link
                onClick={handleNavClose}
                href="/about"
                className={`${pathname === "/about"
                  ? "text_primary plusJakara_bold"
                  : isHomeOrHashRoute
                    ? "text_white"
                    : "text_dark"
                  } cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline plusJakara_regular`}
              >
                About Us
              </Link>
              <Link
                onClick={handleNavClose}
                href="/contact"
                className={`${pathname === "/contact"
                  ? "text_primary plusJakara_bold"
                  : isHomeOrHashRoute
                    ? "text_white"
                    : "text_dark"
                  } cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline plusJakara_regular`}
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden d-md-flex items-center gap-[0.5rem] lg:gap-[0.8rem]">
            <button
              onClick={() => router.push('/auth/login')}
              className={`px-[2rem] py-2 border-[1px] transition-colors bg_white duration-300 ease-in-out  rounded-3 text-[0.95rem] cursor-pointer plusJakara_medium  no-underline`}
            >
              Login
            </button>
            <button
              onClick={() => router.push('/auth/signup')}
              className={`px-[2rem] py-2 bg_primary text_white rounded-3 text-[0.95rem]  cursor-pointer plusJakara_medium  no-underline primary_hover`}
            >
              Sign Up
            </button>
          </div>
          {/* Hamburger Icon for Mobile */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              <svg
                className={`${isHomeOrHashRoute ? "text_white" : "text_dark"
                  } w-6 h-6 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
        {/* Mobile Menu with Transition */}
        <div
          className={`flex flex-col items-start mt-0 space-y-2 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <Link
            onClick={handleNavClose}
            href="/"
            className={` no-underline mt-[1.25rem] ${pathname === "/"
              ? "text_primary"
              : isHomeOrHashRoute
                ? "text_white"
                : "text_dark"
              } cursor-pointer`}
          >
            Home
          </Link>
          <Link
            onClick={handleNavClose}
            href="/pricing"
            className={` no-underline ${pathname === "/pricing"
              ? "text_primary"
              : isHomeOrHashRoute
                ? "text_white"
                : "text_dark"
              } cursor-pointer`}
          >
            Pricing
          </Link>
          <Link
            onClick={handleNavClose}
            href="/about"
            className={` no-underline ${pathname === "/about"
              ? "text_primary"
              : isHomeOrHashRoute
                ? "text_white"
                : "text_dark"
              } cursor-pointer`}
          >
            About us
          </Link>
          <Link
            onClick={handleNavClose}
            href="/contact"
            className={` no-underline ${pathname === "/contact"
              ? "text_primary"
              : isHomeOrHashRoute
                ? "text_white"
                : "text_dark"
              } cursor-pointer`}
          >
            Contact
          </Link>
          <button
            onClick={handleJoinUsClick}
            className={`
              ${isHomeOrHashRoute
                ? "transparent_hover"
                : "text_dark border-black  hover:bg-black hover:text-white"
              }
            px-[1.25rem] py-[0.33rem] rounded-[2rem] text-[0.75rem] cursor-pointer plusJakara_bold  no-underline border-[1px]`}
          >
            Join us
          </button>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-[1.25rem] py-[0.33rem] rounded-[2rem] text-[0.75rem] text_white cursor-pointer plusJakara_bold bg_primary no-underline primary_hover text-white"
          >
            Login
          </button>
        </div>
      </Container>
    </header>
  );
}
