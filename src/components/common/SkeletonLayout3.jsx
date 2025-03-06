import { Skeleton } from "antd";
import React from "react";

const SkeletonLayout3 = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="my-2 bg-[#F9F9F9] rounded-md p-3">
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="mt-4 text-end">
        <Skeleton.Button active size="large" shape="round" />
      </div>
    </div>
  );
};

export default SkeletonLayout3;
