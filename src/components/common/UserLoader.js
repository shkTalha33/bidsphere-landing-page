import { Skeleton } from 'antd';

const UserLoader = () => (
  <div className="w-full flex flex-col gap-3 p-3 text-center">
    <div className="flex gap-1 w-full">
      <div style={{ width: "35px" }}>
        <Skeleton.Avatar size={35} shape="circle" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        {/* <Skeleton active paragraph={{ rows: 5, width: '100%' }} /> */}
      </div>
    </div>
    <div className="flex gap-1 w-full">
      <div style={{ width: "35px" }}>
        <Skeleton.Avatar size={35} shape="circle" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        {/* <Skeleton active paragraph={{ rows: 5, width: '100%' }} /> */}
      </div>
    </div>
    <div className="flex gap-1 w-full">
      <div style={{ width: "35px" }}>
        <Skeleton.Avatar size={35} shape="circle" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
        {/* <Skeleton active paragraph={{ rows: 5, width: '100%' }} /> */}
      </div>
    </div>
  </div>
);

export default UserLoader;
