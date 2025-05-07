import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { PiMoneyWavyLight } from "react-icons/pi";

const AuctionConfirmationModal = ({ item, openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
      centered
      closeIcon={null}
      // width={700}
      // style={{
      //   maxHeight: "90vh",
      //   overflowY: "auto",
      //   paddingRight: "16px",
      // }}
    >
      <div className="flex flex-col gap-3 items-center justify-center py-5">
        <div className="relative mx-auto text-center">
          <PiMoneyWavyLight className="text_primary h-[4rem] w-[4rem]" />
        </div>
        <h6 className="capitalize text-[2rem] text-[#14181B] poppins_semibold">
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
