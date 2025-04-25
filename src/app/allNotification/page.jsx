/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { deleteNotification, getNotification } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { encryptData } from "@/components/api/encrypted";
import { avataruser } from "@/components/assets/icons/icon";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSocket } from "@/components/socketProvider/socketProvider";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const Page = () => {
  const { get, deleteData } = ApiFunction();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const socket = useSocket();
  const router = useRouter();

  const handleNotificationClick = (item) => {
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
      case "order":
        router.push("/orders");
        break;
      case "invoice":
        router.push(`/orders?invoice=${item?.bids?._id}`);
        break;
      case "auction":
        router.push("/auctions");
        break;
    }
  };

  const lastId = notifications?.[notifications?.length - 1]?._id;
  const handleGetNotification = () => {
    notifications?.length > 0 ? setLoadingMore(true) : setLoading(true);
    const api =
      notifications?.length > 0
        ? `${getNotification}/${lastId}`
        : getNotification;
    get(api)
      .then((res) => {
        if (res?.success && res?.notifications?.length > 0) {
          setNotifications((prev) => [...prev, ...res?.notifications]);
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
    handleGetNotification();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
      });
      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);

  // handle delete notification by api
  const handleDelleteNotification = (item) => {
    const api = `${deleteNotification}/${item?._id}`;
    setNotifications((prev) =>
      prev.filter((notification) => notification?._id !== item?._id)
    );
    toast.success("Notification deleted successfully.");
    deleteData(api)
      .then((res) => {
        if (res?.success) {
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <Container className="bg-white rounded-lg mt-20 p-2 p-md-4 shadow-lg">
      <Row>
        <Col md="12">
          <Breadcrumbs pageTitle={"All Notifications"} />
          <h3 className="text-2xl poppins_medium text-gray-800 mb-4">
            All Notifications
          </h3>

          {loading ? (
            <div className="text-center my-10">
              <Spinner size="sm" animation="border" />
            </div>
          ) : notifications?.length === 0 ? (
            <div className="text-center text-gray-500">
              No notifications found.
            </div>
          ) : (
            <div className="space-y-4">
              {notifications?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNotificationClick(item)}
                  className="relative group cursor-pointer flex items-start gap-3 p-3 bg-gray-100 hover:bg-white border rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg"
                >
                  {/* Profile Image */}
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
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h5 className="text-sm md:text-md poppins_medium text-gray-800">
                        {item?.title}{" "}
                        <span className="text-blue-600 poppins_regular text-[0.6rem] md:text-[1rem]">
                          @{item?.user?.fname} {item?.user?.lname}
                        </span>
                      </h5>
                      <span className="text-sm whitespace-nowrap text-gray-500">
                        {moment(item?.createdAt).format("DD-MMMM-YYYY")}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{item?.description}</p>
                    {item?.auction?.name && (
                      <p className="text-sm text-gray-500 mt-1">
                        Auction: {item?.auction?.name}
                      </p>
                    )}
                  </div>

                  {/* Delete Icon */}
                  <button
                    className="absolute right-3 top-2 hidden group-hover:block text-gray-400 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening chat/order
                      handleDelleteNotification(item);
                    }}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              ))}

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleGetNotification}
                    className="mt-4 bg_primary hover:bg_primary border-none text-white px-4 py-2 rounded shadow transition-transform hover:scale-105"
                  >
                    {loadingMore ? "Loading..." : "See More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Page;
