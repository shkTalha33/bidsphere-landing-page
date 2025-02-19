"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { auctionlogo, avataruser } from "../assets/icons/icon";
import { useSelector } from "react-redux";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomeOrHashRoute = pathname === "/";

  useEffect(() => {
    const protectedRoutes = ['/pricing', '/about', '/contact', '/orders'];
    if (!isLogin && protectedRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [isLogin, pathname, router]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Authenticated navigation items
  const AuthenticatedNav = () => (
    <>
      <div className="hidden d-md-flex items-center gap-[2rem] lg:gap-[8.18rem]">
        <div className="gap-[1rem] lg:gap-[1.87rem] flex items-center">
          <Link
            href="/auctions"
            className={`${pathname === "/auctions" ? "text_primary poppins_medium" :
              isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} 
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            Auctions
          </Link>
          <Link
            href="/payments"
            className={`${pathname === "/payments" ? "text_primary poppins_medium" :
              isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"}
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            Payments
          </Link>
          <Link
            href="/orders"
            className={`${pathname === "/orders" ? "text_primary poppins_medium" :
              isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"}
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            Orders
          </Link>
        </div>
      </div>
      <div className="hidden d-md-flex items-center gap-[0.5rem]">
        <button >
          <Image src='/assets/notification.png' width={30} height={30} alt="" />
        </button>
        <button >
          <Image src='/assets/chat.png' width={30} height={30} alt="" />
        </button>
        <button >
          <Image src='/assets/heart.png' width={30} height={30} alt="" />
        </button>
        <div className="flex cursor-pointer ms-2 gap-2 items-center w-fit">
          <div>
            <Image src={avataruser} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
          </div>
          <div className="flex flex-col">

            <h6 className={`${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"}
            cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline mb-0 poppins_regular`}
            >User</h6>
            <span className={`${isHomeOrHashRoute && !isScrolled ? "text_light" : "text_dark"}
            cursor-pointer text-xs no-underline mb-0 poppins_regular`}
            >15A, James Street</span>
          </div>
        </div>
      </div>
    </>
  );

  // Non-authenticated navigation items
  const NonAuthenticatedNav = () => (
    <div className="hidden d-md-flex items-center gap-[0.5rem] lg:gap-[0.8rem]">
      <button
        onClick={() => router.push('/auth/login')}
        className="px-[2rem] py-2 border-[1px] transition-colors bg_white duration-300 ease-in-out rounded-3 text-[0.95rem] cursor-pointer poppins_medium no-underline"
      >
        Login
      </button>
      <button
        onClick={() => router.push('/auth/signup')}
        className="px-[2rem] py-2 bg_primary text_white rounded-3 text-[0.95rem] cursor-pointer poppins_medium no-underline primary_hover"
      >
        Sign Up
      </button>
    </div>
  );

  return (
    <header
      className={`fixed w-full transition-all duration-300 ease-in-out
        ${isHomeOrHashRoute && !isScrolled ? "bg-[#4d45450a]" : "bg-gray-50"} 
        py-[1rem] poppins_regular z-50 main_nav`}
      style={{ zIndex: 999 }}
      id="navbar"
    >
      <Container>
        <nav className="flex justify-between items-center w-full">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <h2 className="poppins_medium text-2xl text_primary">BidSphere</h2>
          </div>

          {/* Conditional rendering based on login status */}
          {isLogin ? <AuthenticatedNav /> : <NonAuthenticatedNav />}

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              <svg
                className={`${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} w-6 h-6 cursor-pointer`}
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

        {/* Mobile Menu */}
        <div
          className={`flex flex-col items-start mt-0 space-y-2 overflow-hidden transition-all duration-300 ease-in-out md:hidden 
            ${isMenuOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          {isLogin ? (
            <>
              <Link
                href="/auctions"
                className="no-underline mt-[1.25rem] text_dark cursor-pointer"
                onClick={handleNavClose}
              >
                Auctions
              </Link>
              <Link
                href="/payments"
                className="no-underline text_dark cursor-pointer"
                onClick={handleNavClose}
              >
                Payments
              </Link>
              <Link
                href="/orders"
                className="no-underline text_dark cursor-pointer"
                onClick={handleNavClose}
              >
                Orders
              </Link>
              <div className="flex cursor-pointer gap-2 items-center w-fit">
                <div>
                  <Image src={avataruser} width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                </div>
                <h6 className="popins_medium mb-0 text-sm text-[#818181] max-lg:hidden whitespace-nowrap">User</h6>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push('/auth/login');
                  handleNavClose();
                }}
                className="px-[1.25rem] py-[0.33rem] border-[1px] rounded-[2rem] text-[0.75rem] cursor-pointer poppins_bold no-underline"
              >
                Login
              </button>
              <button
                onClick={() => {
                  router.push('/auth/signup');
                  handleNavClose();
                }}
                className="px-[1.25rem] py-[0.33rem] rounded-[2rem] text-[0.75rem] text_white cursor-pointer poppins_bold bg_primary no-underline primary_hover"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}