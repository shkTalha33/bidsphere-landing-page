"use client";
import { Skeleton } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "react-feather";
import { useDispatch } from "react-redux";
import { setAuctionProduct } from "../redux/auctionProduct";
import { formatPrice } from "../utils/formatPrice";
import SkeletonLayout from "../common/SkeletonLayout";

export default function AuctionItems({
  items,
  loading,
  hasMore,
  setLastId,
  count,
  setIsLoadMore,
  isLoadMore,
}) {
  const router = useRouter();
  const [likedItems, setLikedItems] = useState({});
  const dispatch = useDispatch();

  const toggleLike = (index) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item?._id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLayout key={index} index={index} />
          ))
        ) : (
          <>
            {items.map((item, index) => (
              <div
                key={item?._id}
                className="space-y-3 p-3 bg_white shadow-sm rounded-lg border-[1px] border-[#ECEFF3]"
                style={{ boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)" }}
              >
                <div className="relative">
                  <Image
                    src={item?.images[0]}
                    alt={item?.title || item?.name}
                    width={300}
                    height={200}
                    className="w-full !h-[200px] max-h-[200px] object-cover rounded-xl cursor-pointer"
                    onClick={() => handleAuctionDetail(item)}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg_primary text-white px-2 py-1 rounded-[4px] text-sm poppins_regular">
                      New Offer
                    </span>
                  </div>
                  <button
                    onClick={() => toggleLike(index)}
                    className="absolute top-4 right-4 p-1 rounded-full bg-[#433F46] transition-colors"
                  >
                    <Heart className="w-5 h-5 text-white hover:text-black" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="poppins_medium text-base capitalize">
                      {item?.name}
                    </p>
                    <p className="poppins_medium text-sm">
                      {formatPrice(item?.lots[0]?.minprice)}
                    </p>
                  </div>
                  <button
                    className="bg_primary whitespace-nowrap text_white text-center py-2 xl:py-3 rounded-lg px-7 lg:px-8 xl:px-9"
                    onClick={() => handleAuctionDetail(item)}
                  >
                    Join Auction
                  </button>
                </div>
              </div>
            ))}
            {isLoadMore &&
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLayout key={index} index={index} />
              ))}
          </>
        )}
      </div>
      {count !== 0 && hasMore && (
        <div className="py-5 text-center w-full">
          <button
            className="bg_primary text_white py-2 text-base px-5 text-center rounded-md"
            onClick={() => setLastId((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
