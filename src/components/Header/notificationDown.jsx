"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotificationDown = () => {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: "New message from Ali",
      time: "2 mins ago",
      type: "message",
    },
    {
      id: 2,
      title: "Order #1234 has shipped",
      time: "10 mins ago",
      type: "order",
    },
    {
      id: 3,
      title: "System alert: Password changed",
      time: "1 hour ago",
      type: "alert",
    },
    // Add more dummy data to simulate scroll
    {
      id: 4,
      title: "New message from Sara",
      time: "2 hours ago",
      type: "message",
    },
    {
      id: 5,
      title: "Order #789 delivered",
      time: "1 day ago",
      type: "order",
    },
    {
      id: 6,
      title: "Alert: Account updated",
      time: "2 days ago",
      type: "alert",
    },
  ];

  const handleNotificationClick = (item) => {
    switch (item.type) {
      case "message":
        router.push("/messages");
        break;
      case "order":
        router.push("/orders");
        break;
      case "alert":
        router.push("/settings");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="p-4 max-h-[300px] overflow-y-auto w-[300px] sm:w-[320px]">
      <h4 className="text-md font-semibold mb-3 text-gray-800">
        Notifications
      </h4>
      {notifications.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((item) => (
            <li
              key={item.id}
              className="p-3 rounded hover:bg-gray-100 cursor-pointer border border-gray-200 transition-all duration-200"
              //   onClick={() => handleNotificationClick(item)}
            >
              <div className="text-sm font-medium text-gray-800">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.time}</div>
              <div className="text-[10px] text-blue-500 mt-1 capitalize">
                Type: {item.type}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No notifications.</p>
      )}
    </div>
  );
};

export default NotificationDown;
