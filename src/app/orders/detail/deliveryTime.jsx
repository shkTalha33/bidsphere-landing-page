import React from "react";
import moment from "moment";

const DeliveryTime = ({ orderDetail }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return moment(dateStr).format("DD-MMM-YYYY hh:mm A"); // Example: 25-Apr-2025 02:01 PM
  };

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg poppins_semibold text-gray-800 mb-4">
        Delivery Timeline
      </h2>

      {orderDetail?.paymentDate && formatDate(orderDetail.paymentDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">Payment Date</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.paymentDate)}
          </p>
        </div>
      )}

      {orderDetail?.shippedDate && formatDate(orderDetail.shippedDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">Shipped Date</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.shippedDate)}
          </p>
        </div>
      )}

      {orderDetail?.transitDate && formatDate(orderDetail.transitDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">In Transit Date</p>
          <p className="text-base poppins_medium text-gray-800">
            {formatDate(orderDetail.transitDate)}
          </p>
        </div>
      )}

      {orderDetail?.deliveryDate && formatDate(orderDetail.deliveryDate) && (
        <div className="mb-3">
          <p className="text-sm text-gray-500">Expected Delivery</p>
          <p className="text-base poppins_medium text-green-600">
            {formatDate(orderDetail.deliveryDate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryTime;
