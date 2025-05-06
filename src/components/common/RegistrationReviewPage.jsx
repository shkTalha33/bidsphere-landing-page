import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Col, Container, Row } from "reactstrap";
import { pdfIcon } from "../assets/icons/icon";
import { formatPrice } from "../utils/formatPrice";
import toast from "react-hot-toast";
import ApiFunction from "../api/apiFuntions";
import { handleError } from "../api/errorHandler";
import { auctionRegistration } from "../api/ApiFile";
import { useParams, useRouter } from "next/navigation";
import SkeletonLayout3 from "./SkeletonLayout3";
import {
  clearRegisterData,
  selectRegisterData,
} from "../redux/registrationSlice/resgiterSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetKeysObject } from "../redux/stripKey/stripKey";

export default function RegistrationReviewPage({
  formData,
  pageType,
  progress,
  isLoading = false,
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { post } = ApiFunction();
  const router = useRouter();
  const data = useSelector(selectRegisterData);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (parseInt(progress) < 100) {
      toast.error("Please Fill All The Fields");
      return;
    }
    setLoading(true);
    await post(`${auctionRegistration}${id}`, data)
      .then((result) => {
        toast.success(result?.message);
        router.push(`/auctions/${id}/detail`);
        dispatch(clearRegisterData());
        dispatch(resetKeysObject());
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(data, "data");

  return (
    <>
      {isLoading ? (
        <SkeletonLayout3 />
      ) : (
        <Container className="bg-white rounded-lg p-2">
          <Row className="g-2">
            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Name</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {`${data?.fname || formData?.fname || "N/A"} ${
                      data?.lname || formData?.lname || "N/A"
                    }`}
                  </p>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Phone Number</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {data?.phone || formData?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Email</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {data?.email || formData?.email || "N/A"}
                  </p>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Country</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {data?.country || formData?.country || "N/A"}
                  </p>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold mb-2">
                    Identity Proof
                  </p>
                  <div className="flex gap-3 items-start flex-wrap">
                    {(data?.id_proof || formData?.id_proof)?.map(
                      (file, index) => (
                        <Link href={file?.url} target="_blank" key={index}>
                          <div className="flex flex-col gap-2">
                            <Image
                              src={file.type === "pdf" ? pdfIcon : file?.url}
                              alt={file?.title}
                              width={48}
                              height={48}
                              className="!h-12 !w-12"
                            />
                            <p className="mb-0 text_primary poppins_medium hover:underline text-xs flex flex-wrap w-12">
                              {file?.title}
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold mb-2">
                    Proof of Funds
                  </p>
                  <div className="flex gap-2 items-start flex-wrap">
                    {(data?.funds_proof || formData?.funds_proof)?.map(
                      (file, index) => (
                        <Link href={file?.url} target="_blank" key={index}>
                          <div className="flex flex-col gap-2 me-4">
                            <Image
                              src={file.type === "pdf" ? pdfIcon : file?.url}
                              alt={file?.title}
                              width={48}
                              height={48}
                              className="!h-12 !w-12"
                            />
                            <p className="mb-0 text_primary poppins_medium hover:underline text-xs flex flex-wrap w-12">
                              {file?.title}
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Deposit Amount</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {data?.amount || formData?.amount
                      ? formatPrice(data?.amount || formData?.amount)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="bg-[#F9F9F9]  shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-md">
                <div className="rounded-md px-3 py-2">
                  <p className="text-base poppins_semibold">Payment Option</p>
                  <p className="text-base poppins_regular text-[#818898]">
                    {data?.walletBalance
                      ? "Pay with Wallet"
                      : "Pay with Stripe"}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {pageType === "registration" && (
            <Row className="mt-4">
              <Col lg="6" className="text-end ml-auto">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg_primary text-white whitespace-nowrap px-5 py-2 rounded-lg  poppins_medium text-base sm:text-lg"
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
          )}
        </Container>
      )}
    </>
  );
}
