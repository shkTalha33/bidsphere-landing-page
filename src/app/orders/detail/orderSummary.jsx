import useCurrency from "@/components/hooks/useCurrency";
import React from "react";
import { useTranslation } from "react-i18next";

const OrderSummary = ({ orderDetail }) => {
  const lot = orderDetail?.lot;
  const user = orderDetail?.user;
  const { formatPrice, convert } = useCurrency();
  const { t } = useTranslation();

  return (
    <div className="rounded-lg">
      <h2 className="text-lg capitalize poppins_semibold text-gray-800 mb-4">
        {t("order.heading16")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">{t("order.heading19")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {user?.fname} {user?.lname}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">{t("order.heading34")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {user?.email}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("order.heading35")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {user?.phone}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("order.heading20")}</p>
          <p className="text-base poppins_medium text-gray-800">{lot?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("order.heading21")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatPrice(convert(lot?.price, "LYD"))}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">{t("order.heading37")}</p>
          <p className="text-base poppins_medium text-gray-800 capitalize">
            {orderDetail?.orderNumber}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("order.heading21")}</p>
          <p className="text-base poppins_medium text-gray-800 capitalize">
            {orderDetail?.type}
          </p>
        </div>

        <div>
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

        {/* Aap chahen to aur ek field add kar sakte hain ya empty placeholder */}
        <div></div>
      </div>
    </div>
  );
};

export default OrderSummary;
