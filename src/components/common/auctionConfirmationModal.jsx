import { Modal } from "antd";
import Image from "next/image";
import React from "react";

const AuctionConfirmationModal = ({ item, openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
      centered
      width={700}
      bodyStyle={{
        maxHeight: "90vh",
        overflowY: "auto",
        paddingRight: "16px",
      }}
      maskClosable={true}
    >
      <div className="flex flex-col gap-2 gap-md-4 items-center justify-center">
        <div className="w-20 md:w-[140px] relative">
          <Image src={item?.image} alt={item?.title} />
        </div>
        <h6 className="capitalize text-2xl sm:text-2xl md:text-3xl lg:text-[44px] text-[#14181B] poppins_semibold mt-1 mb-1 mb-md-2">
          {item?.title}
        </h6>
        <p className="text-[#14181B] text-center text-xs sm:text-sm md:text-[17px]  poppins_regular">
          {item?.description}
        </p>
        {item?.buttons?.map((button, index) => {
          return (
            <button
              key={index}
              onClick={button?.onClick}
              className={button?.className}
            >
              {button?.btnText}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};

export default AuctionConfirmationModal;
