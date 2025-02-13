'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Image from "next/image";
import { message, Skeleton, Spin, Steps, Popover } from "antd";
import Accordion from "react-bootstrap/Accordion";
import { StaticImage } from "../assets/icons/icon";
const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index + 1} status: {status}
            </span>
        }
    >
        {dot}
    </Popover>
);
const orderData = [
    { status: 'pending', orderId: '5678956789', totalAmount: '10', products: [1, 2, 3] },
]

const OrderStatus = () => {
    const [orderLoading, setOrderLoading] = useState(false);
    return (
        <>
            <Accordion >
                {orderLoading ? (
                    <>
                        <Skeleton className="skelton_main" />
                    </>
                ) : (
                    <>
                        {orderData?.length > 0 ?
                            orderData?.map((item, index) => {
                                const steps = [
                                    { title: "Ordered" },
                                    { title: (item?.status === "pending" ? "Processing" : (item?.status === "accepted" ? "Accepted" : (item?.status === "rejected" ? "Rejected" : (item?.status === "completed" ? "Completed" : "Processing")))) },
                                    { title: item?.status === "rejected" ? "Rejected" : "Shipped" },
                                    { title: item?.status === "rejected" ? "Rejected" : "Delivered" },
                                ];

                                // Determine the current step
                                const currentStep = item?.status === "completed" ? 2 : 1;

                                return (
                                    <Accordion.Item className="orderCard product-box cursorP p-0 mb-3" eventKey={index}>
                                        <Accordion.Header className="p-0">
                                            <div className="product-detail d-flex flex-column w-100 gap-3 justify-content-between">
                                                <div className="d-flex gap-1 pb-2 align-items-center justify-between flex-wrap">
                                                    <h5 className="mb-0 text-[#999999] text-lg max-sm:text-sm">Order: {item?.orderId}</h5>
                                                    <h5 className="mb-0 max-sm:text-sm">June, 10, 2024</h5>
                                                </div>
                                                <div className="max-sm:hidden">
                                                    <Steps
                                                        current={currentStep}
                                                        progressDot={customDot}
                                                        responsive={true}
                                                        size="small"
                                                        // labelPlacement="vertical"
                                                        items={steps}
                                                    />
                                                </div>
                                                <div className="sm:hidden">
                                                    <Steps
                                                        current={currentStep}
                                                        progressDot={customDot}
                                                        responsive={true}
                                                        size="small"
                                                        direction="vertical"
                                                        // labelPlacement="vertical"
                                                        items={steps}
                                                    />
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className="p-0">
                                            <section className="p-0 product-box">
                                                <h5 className="mt-2">Products:</h5>
                                                {item?.products?.length > 0 &&
                                                    item?.products?.map((productItem, index) => (
                                                        <>
                                                            <div
                                                                key={index}
                                                                className={`product-detail d-flex p-2 cursorP mb-2 gap-2 ${item?.products?.length - 1 !== index ? "border-bottom" : ""} `}
                                                            >
                                                                <>
                                                                    <Image
                                                                        style={{
                                                                            width: "4rem",
                                                                            height: "4rem",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        alt=""
                                                                        src={StaticImage}
                                                                    />
                                                                </>
                                                                <div className="d-flex justify-content-between w-100 ">
                                                                    <div className="d-flex flex-column">
                                                                        <h4 className="mb-2 fs-6">
                                                                            Nike Shoes
                                                                        </h4>
                                                                    </div>

                                                                    {/* alag ha  */}
                                                                    <h5> $ 10</h5>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                            </section>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            }) : "no orders found!"}
                    </>
                )}
            </Accordion>
        </>
    );
};

export default OrderStatus;
