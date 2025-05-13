import React from "react";
import { BellOutlined } from "@ant-design/icons";

export const NotificationToast = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <BellOutlined style={{ color: "#1890ff", fontSize: 16 }} />
      <div className="text-sm">
        <span className="font-medium text-[#1890ff]">{data?.user?.fname || "User"}</span>:{" "}
        <span className="text-gray-700">{data?.description}</span>
      </div>
    </div>
  );
};
