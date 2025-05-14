import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const DeliveryTime = ({ orderDetail }) => {
  const { t } = useTranslation();
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return moment(dateStr).local().format("DD-MMM-YYYY hh:mm A"); // Example: 25-Apr-2025 02:01 PM
  };

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg capitalize poppins_semibold text-gray-800 mb-4">
        {t("order.heading18")}
      </h2>

      {orderDetail?.paymentDate && formatDate(orderDetail.paymentDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">{t("order.heading28")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.paymentDate)}
          </p>
        </div>
      )}

      {orderDetail?.shippedDate && formatDate(orderDetail.shippedDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">{t("order.heading29")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.shippedDate)}
          </p>
        </div>
      )}

      {orderDetail?.transitDate && formatDate(orderDetail.transitDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">{t("order.heading30")}</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.transitDate)}
          </p>
        </div>
      )}

      {orderDetail?.deliveryDate && formatDate(orderDetail.deliveryDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">{t("order.heading31")}</p>
          <p className="text-base poppins_medium text-green-600">
            {formatDate(orderDetail.deliveryDate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryTime;
