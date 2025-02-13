import React from 'react';

const ShopCardSkeleton = () => {

    return (
        <div className="shop-card mx-auto animate-pulse">
            <div className="relative">
                <div className="card-img bg-gray-300 h-40 w-full rounded"></div>
            </div>
            <div className="flex justify-between flex-wrap gap-2 pt-1">
                <div className="mt-2 w-full">
                    <div className="flex gap-2">
                        <div className="h-10 w-10">
                            <div className="rounded-circle bg-gray-300 h-8 w-8"></div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                            <div className="bg-gray-300 h-3 w-1/3 rounded"></div>
                        </div>
                    </div>
                    <div className="flex gap-1 mt-2 items-center">
                        <div className="bg-gray-300 h-3 w-3 rounded"></div>
                        <div className="bg-gray-300 h-3 w-8 rounded"></div>
                        <div className="bg-gray-300 h-3 w-12 rounded"></div>
                    </div>
                </div>
                <div className="ms-auto mt-auto">
                    <div className="btn1 small-btn-2 bg-gray-300 h-8 w-16 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ShopCardSkeleton;
