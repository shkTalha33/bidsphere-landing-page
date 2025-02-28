"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Col, Container, Label, Row } from "reactstrap";

const AuctionDetailPage = () => {
  const router = useRouter();
  const [isShowAll, setIsShowAll] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const selectedData = useSelector(
    (state) => state?.auctionProduct?.auctionProductData
  );
  useEffect(() => {
    console.log("Received auction data:", selectedData);
  }, [selectedData]);

  const handleShowAllFiles = () => {
    setSelectedFiles(selectedData?.images);
    setIsShowAll(false);
  };

  useEffect(() => {
    if (selectedData) {
      setSelectedFiles(selectedData?.images?.slice(0, 3) || []);
      setIsShowAll(true);
    }
  }, [selectedData]);

  const handleClick = () => {
    router.back()
  };

  const buttons = [{ text: "Back", onClick: handleClick }];

  // Format date for display
  const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), "dd/MM/yyyy") : "N/A";
  };

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return "$0.00";
    return `$${parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <main className="bg_mainsecondary p-2 py-md-4">
      <Container className="bg_white rounded-[9px] mt-20 p-3 p-sm-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md={12}>
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center justify-between">
                <h3 className="text-lg sm:text-xl md:text-2xl poppins_medium text_dark capitalize">
                  {`${selectedData?.name} Auction`}
                </h3>
                <button
                  className="rounded-md bg_primary text_white text-sm md:text-base py-2 px-3 text-center"
                  onClick={handleClick}
                >
                  Back
                </button>
              </div>
              <p className="poppins_regular text-xs md:text-sm md:w-[80%] text_primary mb-0 sm:mb-3 capitalize">
                see auction detail here
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="bg_white rounded-[9px] mt-4 p-3 p-sm-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row className="">
          <Col md="12">
            <h4 className="poppins_semibold text-xl mb-4 text_primary custom_heading">
              Auction Details
            </h4>
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label className="form-label poppins_semibold text-xl" for="name">
                Auction Name
              </Label>
              <p className="text_primary text-lg poppins_regular capitalize">
                {selectedData?.name || "N/A"}
              </p>
            </div>
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label className="form-label poppins_semibold text-xl" for="type">
                Auction Type
              </Label>
              <p className="text_primary text-lg poppins_regular capitalize">
                {selectedData?.type || "N/A"}
              </p>
            </div>
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label
                className="form-label poppins_semibold text-xl"
                for="start_date"
              >
                Auction Start Date
              </Label>
              <p className="text_primary text-lg poppins_regular capitalize">
                {formatDate(selectedData?.start_date)}
              </p>
            </div>
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label
                className="form-label poppins_semibold text-xl"
                for="end_date"
              >
                Auction End Date
              </Label>
              <p className="text_primary text-lg poppins_regular capitalize">
                {formatDate(selectedData?.end_date)}
              </p>
            </div>
          </Col>
          <Col md="6" className="flex flex-col gap-3">
            <div className="mb-3">
              <Label
                className="form-label poppins_semibold text-xl"
                for="category"
              >
                Category
              </Label>
              <p className="text_primary text-lg poppins_regular capitalize">
                {selectedData?.category?.name || "N/A"}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-[30px] mt-[70px]">
          <Col md="6">
            <h4 className="poppins_semibold mb-4 text_primary custom_heading">
              Media Upload
            </h4>
            <Label className="form-label poppins_semibold text-xl">
              Media Upload
            </Label>

            <div className="mt-3 d-flex gap-2 flex-wrap">
              {selectedFiles.map((file, index) => (
                <div key={index} className="position-relative">
                  <Image
                    src={file}
                    width={96}
                    height={96}
                    alt={`Upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              ))}
              {selectedData?.images?.length > 3 && isShowAll && (
                <div
                  className="w-24 h-24 object-cover rounded bg_darkprimary text_white flex items-center justify-center text_white inter_regular text-lg cursor-pointer"
                  onClick={handleShowAllFiles}
                >
                  See All
                </div>
              )}
            </div>
          </Col>

          <Col md="6">
            <h4 className="poppins_semibold mb-4 text_primary custom_heading">
              Terms & Conditions
            </h4>
            <Label
              className="form-label poppins_semibold text-xl"
              for="additionalinfo"
            >
              Description
            </Label>
            <div
              className="text-[#00000080] text-base inter_regular"
              dangerouslySetInnerHTML={{
                __html: selectedData?.additionalinfo || "N/A",
              }}
            ></div>
          </Col>
        </Row>
        <Row className="mb-[30px] mt-[70px]">
          <Col md="12">
            <h4 className="poppins_semibold text-xl mb-4 text_primary custom_heading">
              Lot Details
            </h4>
          </Col>

          {selectedData?.lots && selectedData.lots.length > 0 ? (
            <>
              {selectedData.lots.map((lot, index) => (
                <React.Fragment key={`lot-${index}`}>
                  <Col md="12" className="mb-4">
                    <h5 className="poppins_medium text-lg text_primary ">
                      Lot {index + 1}
                    </h5>
                  </Col>
                  <Col md="6" className="flex flex-col gap-3">
                    <div className="mb-3">
                      <Label
                        className="form-label poppins_semibold text-xl"
                        for={`item-${index}`}
                      >
                        Lot ID
                      </Label>
                      <p className="text_primary text-lg poppins_regular capitalize">
                        {lot?.item?.name || "N/A"}
                      </p>
                    </div>
                  </Col>
                  <Col md="6" className="flex flex-col gap-3">
                    <div className="mb-3">
                      <Label
                        className="form-label poppins_semibold text-xl"
                        for={`minprice-${index}`}
                      >
                        Minimum Price
                      </Label>
                      <p className="text_primary text-lg poppins_regular capitalize">
                        {formatCurrency(lot.minprice)}
                      </p>
                    </div>
                  </Col>
                  <Col md="6" className="flex flex-col gap-3">
                    <div className="mb-3">
                      <Label
                        className="form-label poppins_semibold text-xl"
                        for={`minincrement-${index}`}
                      >
                        Bid Increment
                      </Label>
                      <p className="text_primary text-lg poppins_regular capitalize">
                        {formatCurrency(lot.minincrement)}
                      </p>
                    </div>
                  </Col>
                  {index < selectedData.lots.length - 1 && (
                    <Col md="12">
                      <hr className="my-3" />
                    </Col>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <Col md="12">
              <div className="p-4 bg-gray-50 rounded text-center">
                <p className="text-gray-500">No lot details available</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default AuctionDetailPage;
