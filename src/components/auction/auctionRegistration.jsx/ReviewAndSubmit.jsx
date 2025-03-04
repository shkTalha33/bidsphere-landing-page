"use client";

import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";
import { pdfIcon } from "@/components/assets/icons/icon";
import Link from "next/link";
import { useSelector } from "react-redux";
import ApiFunction from "@/components/api/apiFuntions";
import { auctionRegistration } from "@/components/api/ApiRoutesFile";
import { handleError } from "@/components/api/errorHandler";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useParams } from "next/navigation";
import { formatPrice } from "@/components/utils/formatPrice";
import toast from "react-hot-toast";

const ReviewAndSubmit = ({ progress }) => {
  const data = useSelector(
    (state) => state.auctionRegistration.auctionRegistrationData
  );
  const { post } = ApiFunction();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmit = async () => {
    if (parseInt(progress) < 100) {
      toast.error("Please Fill All The Fields");
      return;
    }
    setLoading(false);
    await post(`${auctionRegistration}${id}`, data)
      .then((result) => {
        toast.success(result?.message);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="bg-white rounded-lg p-4 shadow-md">
      <Row>
        <Col md="12"></Col>
      </Row>
      <Row className="g-3 bg-[#F9F9F9]">
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2  my-2">
            <p className="text-base poppins_semibold text_primary">Name</p>
            <p className="text-base poppins_semibold text-[#818898]">{`${
              data?.firstName || "N/A"
            } ${data?.lastName || "N/A"}`}</p>
          </div>
        </Col>
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2 my-2">
            <p className="text-base poppins_semibold">Phone Number</p>
            <p className="text-base poppins_semibold text-[#818898]">
              {data?.phoneNumber || "N/A"}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="g-3 bg-[#F9F9F9]">
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2  my-2">
            <p className="text-base poppins_semibold text_primary">Email</p>
            <p className="text-base poppins_semibold text-[#818898]">
              {data?.email || "N/A"}
            </p>
          </div>
        </Col>
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2 my-2">
            <p className="text-base poppins_semibold">Country</p>
            <p className="text-base poppins_semibold text-[#818898]">
              {data?.country || "N/A"}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="bg-[#F9F9F9]">
        <Col md="12" className="">
          <div className="rounded-md px-3 py-2  my-2">
            <p className="text-base poppins_semibold text_primary mb-2">
              Identity Proof
            </p>
            <div className="flex gap-3 items-center flex-wrap">
              {data?.id_proof?.map((file, index) => {
                return (
                  <Link href={file?.url} target="_blank" key={index}>
                    <div className="flex flex-col gap-2 ">
                      <Image
                        key={index}
                        src={file.type === "pdf" ? pdfIcon : file?.url}
                        alt={file?.title}
                        width={64}
                        height={64}
                        className="!h-16 !w-16"
                      />
                      <p className="mb-0 text_primary poppins_medium hover:underline text-base">
                        {file?.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Col>
        <Col md="12" className="">
          <div className="rounded-md px-3 py-2  my-2">
            <p className="text-base poppins_semibold text_primary mb-2">
              Proof of Funds
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              {data?.funds_proof?.map((file, index) => {
                return (
                  <Link href={file?.url} target="_blank" key={index}>
                    <div className="flex flex-col gap-2 ">
                      <Image
                        src={file.type === "pdf" ? pdfIcon : file?.url}
                        alt={file?.title}
                        width={64}
                        height={64}
                        className="!h-16 !w-16"
                      />
                      <p className="mb-0 text_primary poppins_medium hover:underline text-base">
                        {file?.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-3 bg-[#F9F9F9]">
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2  my-2">
            <p className="text-base poppins_semibold text_primary">
              Deposit Amount{" "}
            </p>
            <p className="text-base poppins_semibold text-[#818898]">
              {data?.amount ? formatPrice(data?.amount) : "N/A"}
            </p>
          </div>
        </Col>
        <Col md="6" className="">
          <div className="rounded-md px-3 py-2 my-2">
            <p className="text-base poppins_semibold">Payment Option</p>
            <p className="text-base poppins_semibold text-[#818898]">
              {data?.paymentId || "N/A"}
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md="6" className="text-end ml-auto">
          <button
            disabled={loading}
            type="submit"
            className="bg_primary text-white px-6 py-2 py-sm-3 rounded-lg w-full sm:w-[50%] poppins_semibold text-base sm:text-[22px]"
            onClick={handleSubmit}
          >
            {loading ? (
              <HashLoader color="#fff" size={18} />
            ) : (
              "Submit Application"
            )}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewAndSubmit;
