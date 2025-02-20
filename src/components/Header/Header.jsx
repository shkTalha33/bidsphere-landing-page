"use client"

import { Dropdown, message, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { avataruser } from "../assets/icons/icon";
import { setLogout } from "../redux/loginForm";
import ApiFunction from "../api/apiFuntions";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const { userData } = ApiFunction()
  const router = useRouter();
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomeOrHashRoute = pathname === "/";

  const handleLogoutFun = async () => {
    dispatch(setLogout())
    message.success('Logout Successfully')
  }

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
        <button onClick={() => router.push("/favorite")}>
          <Image src='/assets/heart.png' width={30} height={30} alt="" />
        </button>
        <Dropdown
          menu={{ items }}
        >
          <Space className=''>
            <div className="flex cursor-pointer gap-2 items-center w-fit">
              <div>
                <Image src={avataruser} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
              </div>
              <div className="flex flex-col">
                <h6 className={`${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} mb-0 text-sm poppins_regular`}>{userData?.fname + ' ' + userData?.lname}</h6>
                <span className={`${isHomeOrHashRoute && !isScrolled ? "text_light" : "text_dark"} line-clamp-1 max-w-32 text-xs poppins_regular`}>{userData?.address}</span>
              </div>
            </div>
          </Space>
        </Dropdown>
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

  const items = [
    {
      key: '1',
      label: <Link href={'/profile/personal-information'}>Profile</Link>,
      icon: <BiUser size={18} />
    },

    {
      key: '6',
      label: <Link onClick={() => {
        handleLogoutFun()
      }} href={'/auth/login'}>Logout</Link>,
      icon: <TbLogout size={18} />
    },
  ];

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
          {isLogin ? <AuthenticatedNav /> : <NonAuthenticatedNav />}

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

        {/* Improved Mobile Menu - Centered and Full-Featured with consistent text coloring */}
        <div
          className={`flex flex-col items-center justify-center w-full mt-0 space-y-4 overflow-hidden transition-all duration-300 ease-in-out md:hidden 
            ${isMenuOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0"}`}
        >
          {isLogin ? (
            <>
              <Link
                href="/auctions"
                className={`no-underline text-center w-full py-2 ${pathname === "/auctions" ? "text_primary poppins_medium" :
                  isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                Auctions
              </Link>
              <Link
                href="/payments"
                className={`no-underline text-center w-full py-2 ${pathname === "/payments" ? "text_primary poppins_medium" :
                  isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                Payments
              </Link>
              <Link
                href="/orders"
                className={`no-underline text-center w-full py-2 ${pathname === "/orders" ? "text_primary poppins_medium" :
                  isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                Orders
              </Link>

              {/* Mobile Action Icons */}
              <div className="flex justify-center gap-6 w-full mt-2">
                <button>
                  <Image src='/assets/notification.png' width={26} height={26} alt="" />
                </button>
                <button>
                  <Image src='/assets/chat.png' width={26} height={26} alt="" />
                </button>
                <button onClick={() => router.push("/favorite")}>
                  <Image src='/assets/heart.png' width={26} height={26} alt="" />
                </button>
              </div>
              <Dropdown
                menu={{ items }}
              >
                <Space className=''>
                  <div className="flex cursor-pointer gap-2 items-center w-fit">
                    <div>
                      <Image src={avataruser} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div className="flex flex-col">
                      <h6 className={`${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"} mb-0 text-sm poppins_regular`}>{userData?.fname + ' ' + userData?.lname}</h6>
                      <span className={`${isHomeOrHashRoute && !isScrolled ? "text_light" : "text_dark"} line-clamp-1 max-w-32 text-xs poppins_regular`}>{userData?.address}</span>
                    </div>
                  </div>
                </Space>
              </Dropdown>
            </>
          ) : (
            <div className="flex flex-col items-center w-full gap-3">
              <Link
                href="/"
                className={`no-underline text-center w-full py-2 ${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"
                  } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                Home
              </Link>
              <Link
                href="/auctions"
                className={`no-underline text-center w-full py-2 ${isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"
                  } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                Auctions
              </Link>
              <div className="flex justify-center gap-3 w-full mt-3">
                <button
                  onClick={() => {
                    router.push('/auth/login');
                    handleNavClose();
                  }}
                  className={`px-[1.5rem] py-[0.5rem] border-[1px] rounded-3 text-[0.85rem] cursor-pointer poppins_medium no-underline ${isHomeOrHashRoute && !isScrolled ? "border-white text_white" : "border-gray-300"
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    router.push('/auth/signup');
                    handleNavClose();
                  }}
                  className="px-[1.5rem] py-[0.5rem] rounded-3 text-[0.85rem] text_white cursor-pointer poppins_medium bg_primary no-underline primary_hover"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}