"use client";

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { IoIosHeart } from 'react-icons/io';
import { message } from "antd";
import { product1 } from '../assets/icons/icon';
import { usePostMutation } from '../redux/apiSlice2';
import { addToCart } from '../redux/cart';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ isFav = false, data, venderSide = false }) => {
    const [favProduct] = usePostMutation();
    const cartItem = useSelector(state => state.cart.cartDetail)
    const router = useRouter()
    const isLogin = useSelector((state) => state.auth.isLogin)
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [localData, setLocalData] = useState(data);

    const formatTitleForURL = (title) => {
        return title?.toLowerCase().replace(/ /g, '-');
    };
    const handleAddtocart = async () => {
        const product = localData;
        const quantity = 1;
        const totalPrice = product?.price * quantity;
        const formData = {
            image: product?.images?.length > 0 ? product?.images[0] : '',
            productId: product?._id,
            created_by: product?.created_by,
            name: product?.name,
            shop: product?.shop,
            price: product?.price,
            brand: product?.brand,
            quantity: quantity,
            totalQuantity: product?.quantity,
            color: product?.variant_color[0],
            size: product?.variant_size[0],
            totalPrice: totalPrice,
        };

        dispatch(addToCart(formData));
        message.success('Product Added Successfully');
    };

    const handleFav = async () => {
        if (!isLogin) {
            message.error('Please login to add to favorites');
            return;
        }
        try {
            const endpoint = localData.isFavourite
                ? `api/wishlist/products/remove/${localData?._id}`
                : `api/wishlist/products/add/${localData?._id}`;
            const response = await favProduct({
                endpoint,
                data: {},
                tag: 'Favorite',
            }).unwrap();

            if (response.success) {
                // Update local state for isFavourite
                setLocalData(prevState => ({
                    ...prevState,
                    isFavourite: !prevState.isFavourite,
                }));
                message.success(
                    !localData.isFavourite
                        ? "Added to favorites successfully!"
                        : "Removed from favorites successfully!"
                );
            }
        } catch (error) {
            message.error(error?.data?.message || 'Failed to update favorites');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="product-card">
                <div className="relative">
                    <img className="card-img" src={localData?.images?.[0] || product1} alt={localData?.name || 'Product Image'} />
                    {!venderSide &&
                        <div className="product-btn flex gap-2 justify-center left-0 right-0">
                            <Link href={`/product/${localData?._id}?name=${formatTitleForURL(localData?.name)}`} className="btn1 white">Quick View</Link>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleAddtocart();
                            }} className="btn1 primary">{t('btnText.addToCard')}</button>
                        </div>}
                </div>
                {!venderSide &&
                    <button className="fav-icon" onClick={handleFav}>
                        {isFav ? <IoIosHeart size={36} className="text-red-500" /> : localData?.isFavourite ? <IoIosHeart size={36} className="text-red-500" /> : <CiHeart size={36} />}
                    </button>}
                <div className="mt-2 pt-2">
                    <Link href={`/product/${localData?._id}?name=${formatTitleForURL(localData?.name)}`}>
                        <h6 className="brand mb-0 max-sm:text-xs text-sm line-clamp-1">{localData?.brand?.name || 'Brand Name'}</h6>
                        <h1 className="title mb-0 max-sm:text-sm text-base popins_medium line-clamp-1">{localData?.name || 'Product Name'}</h1>
                        <h2 className="price mb-0 max-sm:text-xs text-sm">${localData?.price || 0}</h2>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
