export const ProductCardSkeleton = () => {
    return (
        <div className="product-card animate-pulse">
            <div className="relative bg-gray-200 h-32 lg:h-60 w-full rounded"></div>
            <div className="mt-2 pt-1">
                <div className="bg-gray-200 h-3 lg:h-4 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-200 h-4 lg:h-6 w-full mb-2 rounded"></div>
                <div className="bg-gray-200 h-3 lg:h-4 w-1/3 rounded"></div>
            </div>
        </div>
    );
};
