/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getSupportDetail } from "@/components/api/ApiFile";
import ApiFunction from "@/components/api/apiFuntions";
import { StaticImage } from "@/components/assets/icons/icon";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const { id } = useParams();
  const { get } = ApiFunction();
  const [supportDetail, setSupportDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  // handle support reply details

  const handleSupportReply = () => {
    setLoading(true);
    const api = `${getSupportDetail}/${id}`;
    get(api)
      .then((res) => {
        if (res?.success) {
          setSupportDetail(res?.service);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleSupportReply();
    }
  }, [id]);

  return (
    <>
      <Container className="bg_white rounded-[9px] p-3 sm:p-4 shadow-[0px_4px_22.9px_0px_#0000000D] container">
        <Row>
          <Col md="12">
            <Breadcrumbs pageTitle={"Support Reply"} />
            <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text-gray-800">
              Support Reply
            </h3>
          </Col>
        </Row>
      </Container>

      <Container className="mt-6 mb-4">
        {loading ? (
          <>
            <div className="flex justify-center items-center mb-2 h-[10rem]">
              <div className="loader border-t-2 border-b-2 border-[#660000] rounded-full w-5 h-5 animate-spin" />
            </div>
          </>
        ) : (
          <>
            {supportDetail ? (
              <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 space-y-6">
                {/* User Message Section */}
                <div className="bg-gray-50 p-2 rounded-lg">
                  <h3 className="text-lg poppins_semibold text-gray-800 mb-3">
                    Your Message
                  </h3>

                  <div className="mb-2">
                    <p className="text-sm text-gray-700">
                      <strong>Name :</strong> {supportDetail?.name}{" "}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Email:</strong> {supportDetail?.email}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-gray-600 whitespace-pre-line">
                      {supportDetail?.msg}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Sent on:{" "}
                      {new Date(supportDetail?.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Admin Reply Section */}
                <div className="bg-green-50 p-2 rounded-lg">
                  <h3 className="text-lg poppins_semibold text-green-800 mb-2">
                    Admin Reply
                  </h3>

                  <p className="text-gray-800">
                    <strong>Title:</strong> {supportDetail?.title}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <strong>Description:</strong> {supportDetail?.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Replied on:{" "}
                    {new Date(supportDetail?.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center h-[20rem] mt-4">
                  <Image
                    className="w-[5rem] h-[5rem]"
                    src={StaticImage}
                    alt=""
                  />
                  <div className="text-center poppins_medium mt-2">
                    Not Found
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Page;
