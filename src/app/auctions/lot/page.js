"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { auctionDetail } from "@/components/api/ApiRoutesFile";
import { handleError } from "@/components/api/errorHandler";
import SkeletonLayout from "@/components/common/SkeletonLayout";
import { setAuctionProduct } from "@/components/redux/auctionProduct";
import { formatPrice } from "@/components/utils/formatPrice";
import { Skeleton } from "antd";
import debounce from "debounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

export default function Page() {
  const { get } = ApiFunction();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state?.auctionProduct?.auctionProductData
  );

  const handleAuctionDetail = (id) => {
    router.push(`/auctions/lot/${id}`);
  };

  const fetchAuctionDetail = debounce(async () => {
    setLoading(true);
    await get(`${auctionDetail}${id}`)
      .then((result) => {
        if (result?.success) {
          dispatch(setAuctionProduct(result?.auction));
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    if (!items?.images?.length > 0) {
      fetchAuctionDetail();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <main className="bg_mainsecondary p-2 py-md-4">
      <Container className="bg_white rounded-[9px] mt-20 p-3 p-sm-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
        <Row>
          <Col md={12}>
            {loading ? (
              <div className="flex flex-col">
                <Skeleton.Input active size="large" style={{ width: 400 }} />
                <Skeleton.Input
                  active
                  size="default"
                  style={{ width: 300, marginTop: 10 }}
                />
              </div>
            ) : (
              <>
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2 items-center justify-between">
                    <h3 className="text-xl sm:text-2xl md:text-3xl poppins_medium text_dark capitalize">
                      {items?.name}
                    </h3>
                    <button className="rounded-md bg_primary text_white py-2 text-sm md:text-base px-3 px-md-4 text-center">
                      Join Auction
                    </button>
                  </div>
                    <p
                      className="poppins_regular text-xs md:text-sm md:w-[80%] text_primary mb-0 sm:mb-3 capitalize "
                      dangerouslySetInnerHTML={{
                        __html: items?.additionalinfo,
                      }}
                    ></p>
              
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="bg_white rounded-[9px] mt-4 p-3 p-sm-4 ">
        <h3 className="text_dark poppins_medium text-base">Category</h3>
        <h3 className="text_primary poppins_medium text-base capitalize">
          {items?.category?.name}
        </h3>
      </Container>
      <Container className="bg_mainsecondary rounded-[9px] mt-4 !px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLayout key={index} index={index} />
            ))
          ) : (
            <>
              {items?.lots?.map((item) => (
                <div
                  key={item?._id}
                  className="space-y-3 p-3 bg_white shadow-sm rounded-lg border-[1px] border-[#ECEFF3]"
                  style={{ boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)" }}
                >
                  <div className="relative">
                    <Image
                      src={item?.item?.images[0]}
                      alt={item?.item?.name}
                      width={300}
                      height={200}
                      className="w-full !h-[200px] max-h-[200px] object-cover rounded-xl cursor-pointer"
                      onClick={() => handleAuctionDetail(item?.item?._id)}
                    />
                    {/* <div className="absolute top-4 left-4">
                    <span className="bg_primary text-white px-2 py-1 rounded-[4px] text-sm poppins_regular">
                      {`${item?.length} Lots`} 
                    </span>
                  </div> */}
                    {/* <button
                    onClick={() => toggleLike(index)}
                    className="absolute top-4 right-4 p-1 rounded-full bg-[#433F46] transition-colors"
                  >
                    <Heart className="w-5 h-5 text-white hover:text-black" />
                  </button> */}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="poppins_semibold text-base capitalize">
                        {item?.item?.name}
                      </p>
                      <p className="poppins_medium text-sm capitalize">
                        {items?.name}
                      </p>
                    </div>
                    <p className="poppins_medium text-sm">
                      {formatPrice(item?.item?.price)}
                    </p>
                    {/* <button
                      className="bg_primary whitespace-nowrap text_white text-center py-2 xl:py-3 rounded-lg px-7 lg:px-8 xl:px-9"
                      onClick={() => handleAuctionDetail(item?.item?._id)}
                    >
                      Join Auction
                    </button> */}
                  </div>
                </div>
              ))}
              {/* {isLoadMore &&
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLayout key={index} index={index} />
              ))} */}
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
