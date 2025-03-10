"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import ApiFunction from "../api/apiFuntions";
import { likeAuction } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import SkeletonLayout from "../common/SkeletonLayout";
import {
  setAuctionProduct,
  setFavouriteAuctions,
} from "../redux/auctionProduct";
import { formatPrice } from "../utils/formatPrice";
import NoData from "../common/NoDataComponent";

export default function AuctionItems({
  items,
  loading,
  setLastId,
  count,
  isLoadMore,
  pageType = "",
  lastId,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { put } = ApiFunction();

  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    if (items?.length) {
      const initialLikes = {};
      items.forEach((item) => {
        initialLikes[item._id] = item.likes || false;
      });
      setLikedItems(initialLikes);
    }
  }, [items]);

  const toggleLike = async (auctionId) => {
    const isLiked = !likedItems[auctionId];
    setLikedItems((prev) => {
      const isLiked = !prev[auctionId];
      return { ...prev, [auctionId]: isLiked };
    });

    if (pageType === "favourites" && !isLiked) {
      const updatedData = items?.filter((item) => item?._id !== auctionId);
      dispatch(setFavouriteAuctions(updatedData));
    }

    try {
      await put(`${likeAuction}${auctionId}`);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item?._id}`);
  };

  const handleContinue = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/lot?auctionId=${item?._id}`);
  };

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLayout key={index} index={index} />
          ))}
        </div>
      ) : items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="space-y-3 p-3 bg_white shadow-sm rounded-lg border border-[#ECEFF3]"
              style={{ boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)" }}
            >
              <div className="relative">
                <Image
                  src={item?.images[0]}
                  alt={item?.title || item?.name}
                  width={300}
                  height={200}
                  className="w-full h-[200px] object-cover rounded-xl cursor-pointer"
                  onClick={() => handleAuctionDetail(item)}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg_primary text-white px-2 py-1 rounded-[4px] text-sm poppins_regular">
                    {`${item?.lots?.length} Lots`}
                  </span>
                </div>
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(item._id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#433F46] transition-colors flex items-center justify-center border-2 border-transparent"
                >
                  <IoHeartSharp
                    className={`w-5 h-5 ${
                      likedItems[item._id]
                        ? "text-red-500 border-red-500"
                        : "text-white border-white"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <div>
                  <p className="poppins_medium text-base capitalize">
                    {item.name}
                  </p>
                  <p className="poppins_medium text-sm">
                    {formatPrice(item.depositamount)}
                  </p>
                </div>
                <button
                  className="bg_primary text_white text-center py-2 xl:py-3 rounded-lg px-7 lg:px-8 xl:px-9"
                  onClick={() => handleContinue(item)}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
          {isLoadMore &&
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLayout key={index} index={index} />
            ))}
        </div>
      ) : (
        <div className="">
          <NoData description={"There are no auctions to display"} />
        </div>
      )}
      {count > lastId && (
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
