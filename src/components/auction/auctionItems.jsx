"use client"; 
import Image from "next/image";
import React, { useState } from "react";
import { Heart } from "react-feather";
import { useRouter } from "next/navigation";


export default function AuctionItems({ items }) {
  const router = useRouter();
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (index) => {
    setLikedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAuctionDetail = () => {
    router.push("/auctions/67890")
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item, index) => {
        return (
          <div 
            key={index} 
            className="space-y-3 p-3 bg_white shadow-sm rounded-lg border-[1px] border-[#ECEFF3]" 
            style={{ boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)' }}
          >
            <div className="relative">
              <Image 
                src={item?.image} 
                alt={item?.title} 
                className="w-full rounded-md" 
                onClick={handleAuctionDetail}
              />
              {/* New Offer Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg_primary text-white px-2 py-1 rounded-[4px] text-sm poppins_regular">
                  New Offer
                </span>
              </div>
              {/* Heart Icon */}
              <button 
                onClick={() => toggleLike(index)}
                className="absolute top-4 right-4 p-1 rounded-full bg-[#433F46] transition-colors"
              >
                <Heart className="w-5 h-5 text-white hover:text-black" />
                {/* <Heart 
                  className={`w-5 h-5 transition-colors ${
                    likedItems[index] 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`}
                /> */}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="poppins_medium text-[16.6px]">{item?.title}</p>
                <p className="poppins_medium text-sm">{item?.price}</p>
              </div>
              <button className="bg_primary text_white text-center py-2 xl:py-3 rounded-lg px-7 lg:px-8 xl:px-10">
                Join Auction
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}