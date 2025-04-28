import useCurrency from "@/components/hooks/useCurrency";
import React from "react";

const OrderSummary = ({ orderDetail }) => {
  const lot = orderDetail?.lot;
  const user = orderDetail?.user;
  const { formatPrice, convert } = useCurrency();

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg poppins_semibold text-gray-800 mb-4">
        Order Summary
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Customer Name</p>
        <p className="text-base poppins_medium text-gray-800">
          {user?.fname} {user?.lname}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Car Name</p>
        <p className="text-base poppins_medium text-gray-800">{lot?.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Order Type</p>
        <p className="text-base poppins_medium text-gray-800 capitalize">
          {orderDetail?.type}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Winning Price</p>
        <p className="text-base poppins_semibold text-green-600">
          {formatPrice(convert(orderDetail?.price, "LBP"))}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Order Status</p>
        <p className="text-base poppins_medium text-yellow-600 capitalize">
          {orderDetail?.orderstatus}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
