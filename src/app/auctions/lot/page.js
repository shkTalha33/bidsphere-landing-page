"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { auctionDetail } from "@/components/api/ApiRoutesFile";
import { handleError } from "@/components/api/errorHandler";
import AuctionLots from "@/components/auction/auctionLots";
import SkeletonLayout from "@/components/common/SkeletonLayout";
import { setAuctionProduct } from "@/components/redux/auctionProduct";
import { formatPrice } from "@/components/utils/formatPrice";
import { Skeleton } from "antd";
import debounce from "debounce";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

export default function Page() {
  const { get, userData } = ApiFunction();
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state?.auctionProduct?.auctionProductData
  );

  const id = params.get("auctionId");
  console.log(userData)

  const handleRegistration = () => {
    if (items?.applications) {
      if (items?.applications?.status === "approved") {
        router.push(`/auctions/${id}/registration`);
      }
    }else{
      router.push(`/auctions/${id}/registration`);
    }
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

  console.log('items', items?.applications)

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
                    <button className="rounded-md bg_primary text_white py-2 text-sm md:text-base px-3 px-md-4 text-center" onClick={handleRegistration}>
                      {items?.applications ? items?.applications?.status === "approved" ? "Join Auction" : "Registration Pending" : "Resgister Auction"}
                    </button>
                  </div>
                  <p className="poppins_regular text-xs md:text-sm md:w-[80%] text_primary mb-0 sm:mb-3 capitalize ">
                    you can see auction detail here
                  </p>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <AuctionLots items={items} loading={loading}/>
    </main>
  );
}