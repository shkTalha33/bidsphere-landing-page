import React from "react";
import { Container } from "reactstrap";
import SkeletonLayout from "../common/SkeletonLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCurrency from "../hooks/useCurrency";

export default function AuctionLots({ items, loading }) {
  const { formatPrice, convert } = useCurrency();
  const router = useRouter();
  const handleAuctionDetail = (id) => {
    router.push(`/auctions/lot/${id}`);
  };

  return (
    <>
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
                      {formatPrice(convert(item?.item?.price, "LBP"))}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Container>
    </>
  );
}
