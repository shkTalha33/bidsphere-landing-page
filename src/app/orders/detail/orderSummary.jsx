import useCurrency from "@/components/hooks/useCurrency";
import React from "react";
import { useTranslation } from "react-i18next";

const OrderSummary = ({ orderDetail }) => {
  const lot = orderDetail?.lot;
  const user = orderDetail?.user;
  const { formatPrice, convert } = useCurrency();
  const { t } = useTranslation();
  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg capitalize poppins_semibold text-gray-800 mb-4">
        {t("order.heading16")}
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500">{t("order.heading19")}</p>
        <p className="text-base poppins_medium text-gray-800">
          {user?.fname} {user?.lname}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">{t("order.heading20")}</p>
        <p className="text-base poppins_medium text-gray-800">{lot?.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">{t("order.heading21")}</p>
        <p className="text-base poppins_medium text-gray-800 capitalize">
          {orderDetail?.type}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">{t("order.heading22")}</p>
        <p className="text-base poppins_semibold text-green-600">
          {formatPrice(convert(orderDetail?.price, "LYD"))}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">{t("order.heading23")}</p>
        <p className="text-base poppins_medium text-yellow-600 capitalize">
          {orderDetail?.orderstatus}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
