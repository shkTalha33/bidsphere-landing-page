import { Alert } from "antd";
import React from "react";
import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import { RiInformationFill } from "react-icons/ri";

export default function AlertSection({ type, message, description, buttons = [] }) {
  // Define custom icons with different colors
  const customIcons = {
    success: <CheckCircleTwoTone twoToneColor="#52c41a" />, // Green
    warning: <ExclamationCircleTwoTone twoToneColor="#faad14" />, // Yellow
    error: <CloseCircleTwoTone twoToneColor="#ff4d4f" />, // Red
    info: <RiInformationFill  color="#21CD9D" />, // Blue
  };

  return (
    <Alert
      className="flex flex-col md:flex-row items-start gap-2 gap-md-2"
      message={
        <span className="text-sm md:text-[1rem] poppins_semibold">
          {message}
        </span>
      }
      showIcon
      icon={customIcons[type]} // Use the custom icon
      description={
        <span className="text-sm lg:text-base text_primary">
          {description}
        </span>
      }
      type={type}
      action={
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
          {buttons.map((button, index) => (
            <button
              onClick={button.onclick}
              className={`text-xs rounded-3 poppins_medium px-4 py-2 md:text-sm ${button.className}`}
              key={index}
            >
              {button.text}
            </button>
          ))}
        </div>
      }
    />
  );
}
