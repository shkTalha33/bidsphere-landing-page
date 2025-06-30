import React from "react";
import { useTranslation } from "react-i18next";

const DeliveryInfo = ({ orderDetail }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg">
      <h2 className="text-lg capitalize poppins_semibold text-gray-800 mb-3">
        {t("order.heading17")}
      </h2>

      {orderDetail?.address && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">{t("order.heading24")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {orderDetail.address}
          </p>
        </div>
      )}

      {orderDetail?.trackingnumber && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">{t("order.heading25")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {orderDetail.trackingnumber}
          </p>
        </div>
      )}

      {orderDetail?.provider && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">{t("order.heading26")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {orderDetail.provider}
          </p>
        </div>
      )}

      {orderDetail?.orderstatus && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">{t("order.heading23")}</p>
          <p className="text-base poppins_medium text-yellow-600 capitalize">
            {orderDetail.orderstatus}
          </p>
        </div>
      )}

      {orderDetail?.wpLabel && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">{t("order.heading27")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {orderDetail.wpLabel}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;
