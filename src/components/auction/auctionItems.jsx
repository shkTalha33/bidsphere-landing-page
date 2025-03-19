"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLikeAuctionMutation } from "../redux/apiSlice";
import SkeletonLayout from "../common/SkeletonLayout";
import { setAuctionProduct } from "../redux/auctionProduct";
import NoData from "../common/NoDataComponent";
import useCurrency from "../hooks/useCurrency";

export default function AuctionItems({
  items,
  loading,
  count,
  lastId,
  handleLoadMore,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formatPrice, convert } = useCurrency();

  // Use the mutation hook from our updated API slice
  const [likeAuction, { isLoading: isLiking }] = useLikeAuctionMutation();

  const [likedItems, setLikedItems] = useState({});

  // Reset the state when the items change (tab change)
  useEffect(() => {
    if (items?.length) {
      const initialLikes = {};
      items.forEach((item) => {
        initialLikes[item._id] = item.likes || false;
      });
      setLikedItems(initialLikes);
    } else {
      setLikedItems({});
    }
  }, [items]);

  const toggleLike = async (auctionId, event) => {
    event.stopPropagation(); // Prevent triggering other click handlers

    // Optimistic UI update
    setLikedItems((prev) => ({ ...prev, [auctionId]: !prev[auctionId] }));

    try {
      // Call the mutation
      await likeAuction(auctionId);
    } catch (err) {
      // If there's an error, revert the optimistic update
      setLikedItems((prev) => ({ ...prev, [auctionId]: !prev[auctionId] }));
      console.error("Error liking auction:", err);
    }
  };

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item._id}`);
  };

  const handleContinue = (item, event) => {
    event.stopPropagation(); // Prevent triggering the parent card click
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/lot?auctionId=${item._id}`);
  };

  return (
    <>
      {loading && items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLayout key={index} />
          ))}
        </div>
      ) : items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="space-y-3 p-3 bg_white shadow-sm rounded-lg border border-[#ECEFF3] transition-all hover:shadow-md cursor-pointer"
              style={{ boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)" }}
              onClick={() => handleAuctionDetail(item)}
            >
              <div className="relative">
                <Image
                  src={item?.images[0]}
                  alt={item?.title || item?.name}
                  width={300}
                  height={200}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg_primary text-white px-2 py-1 rounded-[4px] text-sm poppins_regular">
                    {`${item?.lots?.length || 0} Lots`}
                  </span>
                </div>
                {/* Like Button */}
                <button
                  onClick={(e) => toggleLike(item._id, e)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#433F46] flex items-center justify-center transition-all hover:bg-[#2D2A30]"
                  disabled={isLiking}
                >
                  <IoHeartSharp
                    className={`w-5 h-5 ${
                      likedItems[item._id] ? "text-red-500" : "text-white"
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
                    {formatPrice(convert(item?.depositamount, "LBP"))}
                  </p>
                </div>
                <button
                  className="bg_primary text_white py-2 px-7 rounded-lg hover:opacity-90 transition-opacity"
                  onClick={(e) => handleContinue(item, e)}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData description="There are no auctions to display" />
      )}

      {/* Loading indicator when fetching more data */}
      {loading && items.length > 0 && (
        <div className="flex justify-center my-5">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Load more button */}
      {count > lastId && !loading && (
        <div className="pb-3 text-center">
          <button
            className="bg_primary text_white py-2 px-5 rounded-md hover:opacity-90 transition-opacity"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
