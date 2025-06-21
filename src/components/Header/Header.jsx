/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Dropdown, message, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import {
  authLogo,
  authLogo2,
  avataruser,
  Logo1,
  Logo11,
} from "../assets/icons/icon";
import { setLogout, setUserData } from "../redux/loginForm";
import useCurrency from "../hooks/useCurrency";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiChatSmile2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { getUserProfile } from "../api/ApiFile";
import NotificationDown from "./notificationDown";
import { useSocket } from "../socketProvider/socketProvider";
import toast from "react-hot-toast";
import { BellOutlined } from "@ant-design/icons";
import Language from "../language-change/language";
import { useTranslation } from "react-i18next";
import {
  getMessageUnseen,
  getNotifications,
  incrementMessageUnseen,
  incrementNotification,
  resetNotification,
  setMessageUnseen,
  setNotifications,
} from "../redux/notificationSlice/notificationSlice";
import { NotificationToast } from "../NotificationToast/NotificationToast";
import { clearRegisterData } from "../redux/registrationSlice/resgiterSlice";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const { userData, get, token } = ApiFunction();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency } = useCurrency();
  const socket = useSocket();
  const isHomeOrHashRoute = pathname === "/";
  const notificationsCount = useSelector(getNotifications);
  const unseenMessageCount = useSelector(getMessageUnseen);
  const { t } = useTranslation();
  const handleLogoutFun = async () => {
    dispatch(setLogout());
    dispatch(clearRegisterData());
    message.success("Logout Successfully");
  };

  useEffect(() => {
    const protectedRoutes = ["/pricing", "/about", "/contact", "/orders"];
    if (!isLogin && protectedRoutes.includes(pathname)) {
      router.push("/");
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

  // notfication handle
  const dropdownRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const isMouseOver = useRef(false);

  // Lock body scroll when dropdown is open
  useEffect(() => {
    if (showNotification) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNotification]);

  const handleToggleNotification = () => {
    setShowNotification((prev) => {
      const next = !prev;
      if (next && !hasFetched) {
        setHasFetched(true);
      }
      return next;
    });
    dispatch(resetNotification());
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !isMouseOver.current
      ) {
        setShowNotification(false);
      }
    }

    function handleScroll() {
      // Only close if NOT hovering AND dropdown is open
      if (!isMouseOver.current && showNotification) {
        setShowNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showNotification]); // Add dependency
  // notfication handle ended

  // Authenticated navigation items
  const AuthenticatedNav = () => (
    <>
      <div className="hidden d-md-flex items-center gap-[2rem] lg:gap-[8.18rem]">
        <div className="gap-[1rem] lg:gap-[1.87rem] flex items-center">
          <Link
            href="/auctions"
            className={`${
              pathname === "/auctions"
                ? "text_primary poppins_medium"
                : isHomeOrHashRoute && !isScrolled
                ? "text_white"
                : "text_dark"
            } 
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            {t("nav.auction")}
          </Link>
          <Link
            href="/about-us"
            className={`${
              pathname === "/about-us"
                ? "text_primary poppins_medium"
                : isHomeOrHashRoute && !isScrolled
                ? "text_white"
                : "text_dark"
            }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/payments"
            className={`${
              pathname === "/payments"
                ? "text_primary poppins_medium"
                : isHomeOrHashRoute && !isScrolled
                ? "text_white"
                : "text_dark"
            }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            {t("nav.payments")}
          </Link>
          <Link
            href="/orders"
            className={`${
              pathname === "/orders"
                ? "text_primary poppins_medium"
                : isHomeOrHashRoute && !isScrolled
                ? "text_white"
                : "text_dark"
            }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            {t("nav.orders")}
          </Link>
          <Link
            href="/contactUS"
            className={`${
              pathname === "/contactUS"
                ? "text_primary poppins_medium"
                : isHomeOrHashRoute && !isScrolled
                ? "text_white"
                : "text_dark"
            }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
          >
            {t("nav.contactus")}
          </Link>
        </div>
      </div>
      <div className="hidden d-md-flex items-center gap-[0.5rem]">
        <Language />
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={handleToggleNotification}
            className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoMdNotificationsOutline className="text-white w-[1.2rem] h-[1.2rem]" />
          </div>

          {showNotification && (
            <div
              className="absolute right-0 mt-2 w-[20rem] bg-white border rounded-lg shadow-[0px_4px_22.9px_0px_#0000000D] z-50"
              onMouseEnter={() => (isMouseOver.current = true)}
              onMouseLeave={() => (isMouseOver.current = false)}
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                overscrollBehavior: "contain",
              }}
            >
              <NotificationDown
                firstTime={hasFetched}
                setShowNotification={setShowNotification}
              />
            </div>
          )}
          {notificationsCount > 0 && (
            <div className="absolute text-[0.6rem] top-[-9px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center right-[-5px] bg-danger p-1 text-white  border rounded-full shadow-[0px_4px_22.9px_0px_#0000000D] z-50">
              {notificationsCount > 10 ? "10+" : notificationsCount}
            </div>
          )}
        </div>
        <div className="relative">
          <div
            onClick={handleChatnaoo}
            className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
          >
            <RiChatSmile2Line className="text-white w-[1.2rem] h-[1.2rem]" />
          </div>
          {unseenMessageCount > 0 && (
            <div className="absolute text-[0.6rem] top-[-11px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center right-[-11px] bg-danger p-1 text-white  border rounded-full shadow-[0px_4px_22.9px_0px_#0000000D] z-50">
              {unseenMessageCount > 10 ? "10+" : unseenMessageCount}
            </div>
          )}
        </div>
        <Link
          href={`/favorite`}
          className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
        >
          <FaRegHeart className="text-white w-[1.2rem] h-[1.2rem]" />
        </Link>

        <Dropdown menu={{ items }}>
          <Space>
            <div className="flex cursor-pointer gap-2 items-center w-fit">
              {userData?.profile ? (
                <>
                  <div className="w-[3rem] h-[3rem]">
                    <img
                      src={userData?.profile}
                      alt=""
                      className="w-[100%] h-[100%] rounded-[50%] object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Image
                      src={avataruser}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      alt=""
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <h6
                  className={`${
                    isHomeOrHashRoute && !isScrolled
                      ? "text_white"
                      : "text_dark"
                  } mb-0 text-sm poppins_regular`}
                >
                  {userData?.fname + " " + userData?.lname}
                </h6>
                {/* <span
                  className={`${
                    isHomeOrHashRoute && !isScrolled
                      ? "text_light"
                      : "text_dark"
                  } line-clamp-1 max-w-32 text-xs poppins_regular`}
                >
                  {userData?.address}
                </span> */}
              </div>
            </div>
          </Space>
        </Dropdown>
      </div>
    </>
  );

  // Non-authenticated navigation items
  const NonAuthenticatedNav = () => (
    <>
      <div className="gap-[1rem] lg:gap-[1.87rem] flex items-center">
        <Link
          href="/auctions"
          className={`${
            pathname === "/auctions"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          } 
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          {t("nav.auction")}
        </Link>
        <Link
          href="/about-us"
          className={`${
            pathname === "/about-us"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          {t("nav.about")}
        </Link>
        {/* <Link
          href="/payments"
          className={`${
            pathname === "/payments"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          Payments
        </Link>
        <Link
          href="/orders"
          className={`${
            pathname === "/orders"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          Orders
        </Link> */}
        <Link
          href="/contactUS"
          className={`${
            pathname === "/contactUS"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          {t("nav.contactus")}
        </Link>
        <Link
          href="/help-center"
          className={`${
            pathname === "/help-center"
              ? "text_primary poppins_medium"
              : isHomeOrHashRoute && !isScrolled
              ? "text_white"
              : "text_dark"
          }
              cursor-pointer text-[0.9rem] lg:text-[1rem] no-underline poppins_regular`}
        >
          {t("profil.heading29")}
        </Link>
      </div>
      <div className="hidden d-md-flex items-center gap-[0.5rem] lg:gap-[0.8rem]">
        {/* new */}
        <Language />
        <button
          onClick={() => router.push("/auth/login")}
          className="px-[2rem] py-2 border-[1px] transition-colors bg_white duration-300 ease-in-out rounded-3 text-[0.95rem] cursor-pointer poppins_medium no-underline"
        >
          {t("nav.login")}
        </button>
        <button
          onClick={() => router.push("/auth/sign-up")}
          className="px-[2rem] py-2 bg_primary text_white rounded-3 text-[0.95rem] cursor-pointer poppins_medium no-underline primary_hover"
        >
          {t("nav.signup")}
        </button>
      </div>
    </>
  );

  const items = [
    {
      key: "1",
      label: (
        <Link href={"/profile/personal-information"}>{t("nav.profile")}</Link>
      ),
      icon: <BiUser size={18} />,
    },
    {
      key: "3",
      label: (
        <Link href={"/profile/change-currency"}>
          {t("nav.currency")} {currency?.code}
        </Link>
      ),
      icon: <MdOutlineCurrencyExchange size={18} />,
    },
    {
      key: "6",
      label: (
        <Link
          onClick={() => {
            handleLogoutFun();
          }}
          href={"/auth/login"}
        >
          {t("nav.logout")}
        </Link>
      ),
      icon: <TbLogout size={18} />,
    },
  ];

  const handleChatnaoo = () => {
    router.push("/chat");
  };

  // get user proffile

  const handleUserProfile = () => {
    const api = getUserProfile;
    get(api)
      .then((res) => {
        if (res?.success) {
          dispatch(setUserData(res?.user));
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    if (userData) {
      handleUserProfile();
    }
  }, [pathname]);

  // notification socket

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        dispatch(incrementNotification());
        if (data?.type === "message") {
          dispatch(incrementMessageUnseen(1));
        }

        toast.success(<NotificationToast data={data} />, {
          position: "top-right",
          autoClose: 3500,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          hideProgressBar: false,
        });
      });

      socket.on("noti-unseen", (data) => {
        dispatch(setNotifications(data?.notifications || 0));
        dispatch(setMessageUnseen(data?.messageUnseen || 0));
      });

      return () => {
        socket.off("notification");
        socket.off("noti-unseen");
      };
    }
  }, [socket]);

  return (
    <header
      className={`fixed w-full transition-all duration-300 ease-in-out
        ${isHomeOrHashRoute && !isScrolled ? "bg-[#4d45450a]" : "bg-gray-50"} 
        py-[1rem] poppins_regular z-50 main_nav`}
      style={{ zIndex: 999 }}
      id="navbar"
    >
      <Container fluid="xl">
        <nav className="flex justify-between items-center w-full">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              className="w-[3.5rem] h-[3.5rem] object-cover"
              src={authLogo2}
              alt=""
            />
          </div>
          {isLogin ? <AuthenticatedNav /> : <NonAuthenticatedNav />}
          <div className="flex gap-3 md:hidden">
            {userData?._id && (
              <>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
                    onClick={handleToggleNotification}
                  >
                    <IoMdNotificationsOutline className="text-white w-[1.2rem] h-[1.2rem]" />
                  </div>

                  {showNotification && (
                    <div
                      className="absolute right-0 mt-2 w-[20rem] bg-white border rounded-lg shadow-[0px_4px_22.9px_0px_#0000000D] z-50"
                      onMouseEnter={() => (isMouseOver.current = true)}
                      onMouseLeave={() => (isMouseOver.current = false)}
                      style={{
                        maxHeight: "70vh",
                        overflowY: "auto",
                        overscrollBehavior: "contain",
                      }}
                    >
                      <NotificationDown
                        firstTime={hasFetched}
                        setShowNotification={setShowNotification}
                      />
                    </div>
                  )}
                  {notificationsCount > 0 && (
                    <div className="absolute text-[0.6rem] top-[-5px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center right-[-5px] bg-danger p-1 text-white  border rounded-full shadow-[0px_4px_22.9px_0px_#0000000D] z-50">
                      {notificationsCount > 10 ? "10+" : notificationsCount}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex md:hidden">
              {/* new */}
              <div className="mr-2">
                <Language />
              </div>
              <button onClick={toggleMenu} aria-label="Toggle menu">
                <svg
                  className={`${
                    isHomeOrHashRoute && !isScrolled
                      ? "text_white"
                      : "text_dark"
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
          </div>
        </nav>

        {/* Improved Mobile Menu - Centered and Full-Featured with consistent text coloring */}
        <div
          className={`flex flex-col items-center justify-center w-full mt-0 space-y-4 overflow-hidden transition-all duration-300 ease-in-out md:hidden 
            ${
              isMenuOpen
                ? "max-h-[400px] opacity-100 py-4"
                : "max-h-0 opacity-0"
            }`}
        >
          {isLogin ? (
            <>
              <Link
                href="/auctions"
                className={`no-underline text-center w-full py-2 ${
                  pathname === "/auctions"
                    ? "text_primary poppins_medium"
                    : isHomeOrHashRoute && !isScrolled
                    ? "text_white"
                    : "text_dark"
                } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                {t("nav.auction")}
              </Link>
              <Link
                href="/payments"
                className={`no-underline text-center w-full py-2 ${
                  pathname === "/payments"
                    ? "text_primary poppins_medium"
                    : isHomeOrHashRoute && !isScrolled
                    ? "text_white"
                    : "text_dark"
                } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                {t("nav.payments")}
              </Link>
              <Link
                href="/orders"
                className={`no-underline text-center w-full py-2 ${
                  pathname === "/orders"
                    ? "text_primary poppins_medium"
                    : isHomeOrHashRoute && !isScrolled
                    ? "text_white"
                    : "text_dark"
                } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                {t("nav.orders")}
              </Link>

              {/* Mobile Action Icons */}
              <div className="flex justify-center gap-6 w-full mt-2">
                <div className="relative">
                  <div
                    onClick={handleChatnaoo}
                    className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <RiChatSmile2Line className="text-white w-[1.2rem] h-[1.2rem]" />
                  </div>
                  {unseenMessageCount > 0 && (
                    <div className="absolute text-[0.6rem] top-[-11px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center right-[-11px] bg-danger p-1 text-white  border rounded-full shadow-[0px_4px_22.9px_0px_#0000000D] z-50">
                      {unseenMessageCount > 10 ? "10+" : unseenMessageCount}
                    </div>
                  )}
                </div>
                <Link
                  href={"/favorite"}
                  className="bg-1 w-[2rem] h-[2rem] rounded-full flex items-center justify-center cursor-pointer"
                >
                  <FaRegHeart className="text-white w-[1.2rem] h-[1.2rem]" />
                </Link>
              </div>
              <Dropdown menu={{ items }}>
                <Space>
                  <div className="flex cursor-pointer gap-2 items-center w-fit">
                    {userData?.profile ? (
                      <>
                        <div className="w-[3rem] h-[3rem]">
                          <img
                            src={userData?.profile}
                            alt=""
                            className="w-[100%] h-[100%] rounded-[50%] object-cover"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Image
                            src={avataruser}
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                            alt=""
                          />
                        </div>
                      </>
                    )}
                    <div className="flex flex-col">
                      <h6
                        className={`${
                          isHomeOrHashRoute && !isScrolled
                            ? "text_white"
                            : "text_dark"
                        } mb-0 text-sm poppins_regular`}
                      >
                        {(userData?.fname || "") +
                          " " +
                          (userData?.lname || "")}
                      </h6>
                      <span
                        className={`${
                          isHomeOrHashRoute && !isScrolled
                            ? "text_light"
                            : "text_dark"
                        } line-clamp-1 max-w-32 text-xs poppins_regular`}
                      >
                        {userData?.address}
                      </span>
                    </div>
                  </div>
                </Space>
              </Dropdown>
            </>
          ) : (
            <div className="flex flex-col items-center w-full gap-3">
              <Link
                href="/"
                className={`no-underline text-center w-full py-2 ${
                  isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"
                } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/auctions"
                className={`no-underline text-center w-full py-2 ${
                  isHomeOrHashRoute && !isScrolled ? "text_white" : "text_dark"
                } cursor-pointer poppins_regular`}
                onClick={handleNavClose}
              >
                {t("nav.auction")}
              </Link>
              <div className="flex justify-center gap-3 w-full mt-3">
                <button
                  onClick={() => {
                    router.push("/auth/login");
                    handleNavClose();
                  }}
                  className={`px-[1.5rem] py-[0.5rem] border-[1px] rounded-3 text-[0.85rem] cursor-pointer poppins_medium no-underline ${
                    isHomeOrHashRoute && !isScrolled
                      ? "border-white text_white"
                      : "border-gray-300"
                  }`}
                >
                  {t("nav.login")}
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/sign-up");
                    handleNavClose();
                  }}
                  className="px-[1.5rem] py-[0.5rem] rounded-3 text-[0.85rem] text_white cursor-pointer poppins_medium bg_primary no-underline primary_hover"
                >
                  {t("nav.signup")}
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
