"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import NoData from "@/components/common/NoDataComponent";
import SkeletonLayout from "@/components/common/SkeletonLayout";
import { setAuctionProduct } from "@/components/redux/auctionProduct";
import { formatPrice } from "@/components/utils/formatPrice";
import ApiFunction from "@/components/api/apiFuntions";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import useCurrency from "@/components/hooks/useCurrency";

export default function FavoriteAuctionItems({
  items = [],
  loading,
  count,
  lastId,
  handleLoadMore,
  toggleFavorite,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = ApiFunction();
  const { formatPrice, convert } = useCurrency();

  // No need for likedItems state as all items are liked in favorites view

  const handleAuctionDetail = (item) => {
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/${item._id}`);
  };

  const handleContinue = (item, event) => {
    event.stopPropagation(); // Prevent triggering the parent card click
    dispatch(setAuctionProduct(item));
    router.push(`/auctions/lot?auctionId=${item._id}`);
  };

  const handleToggleFavorite = async (auctionId, event) => {
    if (!userData?._id) {
      toast.error("Please login to continue");
      return;
    }
    event.stopPropagation(); // Prevent triggering other click handlers

    // Apply a visual transition effect for item removal
    const itemDiv = event.target.closest(`[data-auction-id="${auctionId}"]`);
    if (itemDiv) {
      itemDiv.style.opacity = "0";
      itemDiv.style.height = `${itemDiv.offsetHeight}px`;
      itemDiv.style.marginBottom = "0";
      itemDiv.style.padding = "0";
      itemDiv.style.overflow = "hidden";
      itemDiv.style.transition = "all 0.3s ease";

      // After animation completes, set to zero height
      setTimeout(() => {
        itemDiv.style.height = "0";
      }, 300);
    }

    try {
      // Call the toggle favorite mutation
      await toggleFavorite(auctionId);
    } catch (err) {
      // If there's an error, revert the animation
      console.error("Error toggling favorite:", err);

      if (itemDiv) {
        itemDiv.style.opacity = "1";
        itemDiv.style.height = "";
        itemDiv.style.marginBottom = "";
        itemDiv.style.padding = "";
        itemDiv.style.overflow = "";
      }
    }
  };

  return (
    <>
      {loading && items?.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLayout key={index} />
          ))}
        </div>
      ) : items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
          {items?.map((item) => (
            <div
              key={item._id}
              data-auction-id={item._id}
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
                    {/* {`${item?.lots?.length || 0} Lots`} */}
                      {item?.category?.name}
                  </span>
                </div>
                {/* Unlike Button (always filled heart in favorites) */}
                <button
                  onClick={(e) => handleToggleFavorite(item?._id, e)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#433F46] flex items-center justify-center transition-all hover:bg-[#2D2A30]"
                >
                  <IoHeartSharp className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <div className="flex flex-col justify-between mt-2">
                <div className="poppins_regular text_darkprimary text-[10px] mt-2">
                  <CountdownTimer
                    startDate={item?.start_date}
                    endDate={item?.end_date}
                  />
                </div>
                <div>
                 <p className="poppins_semibold mt-[7px] leading-[1.2] text_darkprimary text-[1.25rem]">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-start gap-2 mt-[5px]">
                    <span className="text-gray text-[0.8rem]">
                      Deposit Amount
                    </span>
                    <h5 className="mb-0 text_darkprimary text-lg">
                      {" "}
                      {formatPrice(convert(item?.depositamount, "LYD"))}
                    </h5>
                  </div>
                </div>
                {/* <button
                  className="bg_primary text_white py-2 px-7 rounded-lg hover:opacity-90 transition-opacity"
                  onClick={(e) => handleContinue(item, e)}
                >
                  Continue
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData description="You haven't favorited any auctions yet" />
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
