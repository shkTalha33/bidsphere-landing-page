import React from 'react';

const DeliveryInfo = ({ orderDetail }) => {
  return (
    <div className="rounded-lg p-4">
      <h2 className="text-lg poppins_semibold text-gray-800 mb-4">Delivery Information</h2>

      {orderDetail?.address && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Customer Address</p>
          <p className="text-base poppins_medium text-gray-800">{orderDetail.address}</p>
        </div>
      )}

      {orderDetail?.trackingnumber && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Tracking Number</p>
          <p className="text-base poppins_medium text-gray-800">{orderDetail.trackingnumber}</p>
        </div>
      )}

      {orderDetail?.provider && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Delivery Provider</p>
          <p className="text-base poppins_medium text-gray-800">{orderDetail.provider}</p>
        </div>
      )}

      {orderDetail?.orderstatus && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Order Status</p>
          <p className="text-base poppins_medium text-yellow-600 capitalize">{orderDetail.orderstatus}</p>
        </div>
      )}

      {orderDetail?.wpLabel && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">WP Label</p>
          <p className="text-base poppins_medium text-gray-800">{orderDetail.wpLabel}</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;