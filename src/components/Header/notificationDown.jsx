/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNotification } from "../api/ApiFile";
import ApiFunction from "../api/apiFuntions";
import { Skeleton } from "antd";
import Image from "next/image";
import { avataruser } from "../assets/icons/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { useSocket } from "@/components/socketProvider/socketProvider";
import { useSelector } from "react-redux";
import { encryptData } from "../api/encrypted";
import { useTranslation } from "react-i18next";
const NotificationDown = ({ firstTime, setShowNotification }) => {
  const { get, token } = ApiFunction();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const socket = useSocket();
  const { t } = useTranslation();
  const router = useRouter();

  const handleNotificationClick = (item) => {
    setShowNotification(false);
    switch (item?.type) {
      case "message": {
        const chatUser = {
          _id: item?.lot?._id,
          name: item?.lot?.name,
          images: [item?.lot?.images?.[0]] || "",
          email: "",
        };

        const enData = encodeURIComponent(encryptData(chatUser));
        router.push(`/chat?query=${enData}`);
        break;
      }

      case "winner":
        router.push("/orders");
        break;

      case "order":
        router.push("/orders");
        break;
      case "invoice":
        router.push(`/orders?invoice=${item?.bids?._id}`);
        break;
      case "support":
        router.push(`/supportReply/${item?.support?._id}`);
        break;
      case "auction":
        router.push("/auctions");
        break;

      // default:
      //   router.push("/");
    }
  };
  

  // handle get notification by api
  const lastId = notifications?.[notifications?.length - 1]?._id;
  const handleGetNotification = () => {
    if (notifications?.length > 0) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    const api =
      notifications?.length > 0
        ? `${getNotification}/${lastId}`
        : getNotification;
    get(api)
      .then((res) => {
        if (res?.success && res?.notifications?.length > 0) {
          if (notifications?.length > 0) {
            setNotifications([...notifications, ...res?.notifications]);
          } else {
            setNotifications(res?.notifications);
          }
        } else {
          setHasMore(false);
        }
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    if (firstTime) {
      handleGetNotification();
    }
  }, [firstTime]);

  // get notification by socket

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
      });
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);

  // all  notification read
  const handleGetNotificationAll = () => {
    router.push("/allNotification");
    setShowNotification(false);
  };

  return (
    <>
      <section>
        <h4 className="text-md poppins_semibold px-3 mt-2 text-gray-800 pb-2">
          {t("notification.heading1")}
        </h4>
        <div
          id="scrollableDiv"
          className="px-4 max-h-[300px] mt-3 overflow-y-auto w-[300px] sm:w-[320px]"
        >
          {loading ? (
            <div className="flex justify-center items-center h-20 mt-4">
              <Skeleton active />
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {notifications?.length === 0 ? (
                  <div className="text-center text-gray-500 py-4 text-sm">
                    {t("notification.heading2")}
                  </div>
                ) : (
                  notifications?.map((item) => (
                    <li
                      key={item?._id}
                      onClick={() => handleNotificationClick(item)}
                      className="border-b mb-2 pb-1 mt-0 rounded hover:bg-gray-100 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div>
                          <div className="w-[3rem] h-[3rem]">
                            {item?.user?.profile ? (
                              <img
                                src={item?.user?.profile}
                                alt="notification"
                                className="w-[100%] h-[100%] rounded-[50%]"
                              />
                            ) : (
                              <Image
                                width={100}
                                height={100}
                                src={avataruser}
                                alt="notification"
                                className="w-full h-full rounded-[50%]"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm poppins_medium text-gray-800">
                            {item?.title}{" "}
                            <span className="text-[10px] text-blue-500 mt-1 capitalize">
                              @{item?.user?.fname && item?.user?.lname}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {item?.description}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </>
            // <InfiniteScroll
            //   dataLength={notifications?.length}
            //   next={handleGetNotification}
            //   hasMore={hasMore}
            //   loader={
            //     <div className="flex justify-center items-center py-2">
            //       <Spinner size="sm" />
            //     </div>
            //   }
            //   scrollableTarget="scrollableDiv"
            // >
            // <ul className="space-y-2">

            //   </ul>

            // </InfiniteScroll>
          )}
        </div>
        {notifications?.length > 0 && (
          <div>
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => handleGetNotificationAll()}
                className=" text-gray-800 text-[1rem] p-2 poppins_medium  hover:text-blue-500 transition-all duration-200"
              >
                {t("notification.heading3")}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default NotificationDown;
