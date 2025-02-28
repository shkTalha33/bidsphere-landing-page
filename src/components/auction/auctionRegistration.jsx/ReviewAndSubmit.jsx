"use client";

import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";

const ReviewAndSubmit = ({ data }) => {
  const reviewFields = [
    { label: "Name", value: `${data?.firstName} ${data?.lastName}` },
    { label: "Phone Number", value: data?.phoneNumber, alignRight: true },
    { label: "Email", value: data?.email },
    { label: "Country", value: data?.country, alignRight: true },
    { label: "Identity Proof", value: data?.identityPhotos, isFile: true },
    { label: "Proof of Funds", value: data?.fundsPhotos, isFile: true },
    { label: "Deposit Amount", value: data?.amount },
    { label: "Payment Options", value: data?.payment },
  ];

  return (
    <Container className="bg-white rounded-lg p-4 shadow-md">
      <Row className="g-3">
        {reviewFields.map((field, index) => (
          <Col 
            md={field.isFile ? "12" : "6"} 
            key={index} 
            className="mx-2"
          >
            <div className="rounded-md shadow-inner px-3 py-2 bg-[#F9F9F9] my-2">
              <p className="text-base poppins_semibold">{field?.label}</p>
              
              {field.isFile ? (
                typeof field.value === "string" && field.value.endsWith(".pdf") ? (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600"
                  >
                    <FaFilePdf size={20} />
                    View Document
                  </a>
                ) : Array.isArray(field.value) ? (
                  field.value.map((img, i) => (
                    <div className="flex flex-wrap" key={i}>
                        <Image
                          src={img}
                          alt={`Uploaded Document ${i + 1}`}
                          width={200}
                          height={100}
                          className="rounded-md shadow-md mt-2"
                        />

                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No file uploaded</p>
                )
              ) : (
                <p className="text-base poppins_semibold capitalize">{field?.value}</p>
              )}
            </div>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col md="6" className="ml-auto text-end">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg w-full sm:w-[50%] text-lg font-semibold"
          >
            Next
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewAndSubmit;
