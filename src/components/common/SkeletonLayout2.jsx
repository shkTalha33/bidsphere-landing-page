import { Skeleton } from "antd";
import React from "react";

export default function SkeletonLayout2({index, title}) {
  return (
    <>
      <div
        key={index}
        className="space-y-3 p-3 bg_white shadow-sm rounded-lg border-[1px] border-[#ECEFF3]"
        style={{ boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)" }}
      >
        <Skeleton.Image
          className="!w-full !h-[200px] max-h-[200px] object-cover rounded-xl"
          active
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "12px",
          }}
        />
   <Skeleton 
  active 
  paragraph={{ rows: 1, width: "100%" }} 
  title={false} 
  className="w-full" 
/>
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
      </div>
    </>
  );
}
