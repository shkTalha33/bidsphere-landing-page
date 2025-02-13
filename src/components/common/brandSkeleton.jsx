"use client"

import React from 'react'

const BrandCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="w-3/4 h-5 bg-gray-200 rounded mb-4"></div>

                <div className="w-full flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
                </div>

                <div className="w-1/2 h-4 bg-gray-200 rounded mt-3"></div>
            </div>
        </div>
    )
}

export default BrandCardSkeleton