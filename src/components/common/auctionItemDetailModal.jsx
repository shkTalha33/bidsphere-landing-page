import { Modal } from "antd";
import Image from "next/image";
import React from "react";

const AuctionItemDetailModal = ({ item, openModal, setOpenModal }) => {
  return (
    <Modal
      title={item?.title}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
      centered
      width={700}
      bodyStyle={{ 
        maxHeight: '90vh',
        overflowY: 'auto',
        paddingRight: '16px'
      }}
      maskClosable={true}
    >
      <div className="flex flex-col gap-4">
        <div className="w-full h-[380px] relative">
          <Image 
            src={item?.image} 
            alt={item?.title} 
            className="object-cover rounded-lg"
            fill
          />
        </div>
        <div>
          <h6 className="capitalize text-[14px] poppins_medium mb-2">
            description
          </h6>
          <p className="text-[#909495] text-[14px] poppins_regular">
            {item?.description}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuctionItemDetailModal;