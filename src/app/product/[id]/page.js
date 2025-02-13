'use client'
import Loading from '@/app/loading';
/* eslint-disable @next/next/no-img-element */
import Counter from '@/components/common/counter';
import HomeHeading from '@/components/common/homeHeading';
import ProductSwiper from '@/components/common/product-swiper';
import Reviews from '@/components/common/reviews';
import ReviewsProgress from '@/components/common/reviews-progress';
import { useGetByIdQuery, usePostMutation } from '@/components/redux/apiSlice2';
import { addToCart } from '@/components/redux/cart';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineMessage } from "react-icons/ai";
import { CiHeart } from 'react-icons/ci';
import { IoIosCheckmarkCircle, IoIosHeart, IoIosStar } from 'react-icons/io';
import { MdChevronRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { message } from 'antd';
function ColorSelector({ data, selectedColor, setSelectedColor }) {
    // const [selectedColor, setSelectedColor] = useState('');

    return (
        <div className="flex sm:gap-4 max-sm:gap-3 flex-wrap">
            {data?.product?.variant_color?.map((color, index) => (
                <div
                    key={index}
                    style={{ ['--tw-ring-color']: color }}
                    className={`sm:w-12 sm:h-12 w-10 h-10 rounded-full cursor-pointer transition-all ${selectedColor === color
                        ? `ring-2 sm:p-1 max-sm:p-[2px]`
                        : ''
                        }`}
                    // ? 'ring-2 ring-[#7F55DF] sm:p-1 max-sm:p-[2px]'

                    onClick={() => setSelectedColor(color)}
                >
                    <div style={{ backgroundColor: color }} className='h-100 w-100 rounded-full  flex items-center justify-center '>
                        {selectedColor === color && (
                            <div className={`w-6 h-6 rounded-full bg-white flex items-center justify-center`} style={{ color: color }} >
                                <IoIosCheckmarkCircle size={30} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
function SizeSelector({ data, selectedSize, setSelectedSize }) {
    // const [selectedSize, setSelectedSize] = useState('');

    return (
        <div className="flex sm:gap-4 max-sm:gap-3 flex-wrap">
            {data?.product?.variant_size?.map((size, index) => (
                <div
                    key={index}
                    className={`sm:w-12 sm:h-12 w-10 h-10 text-sm flex items-center justify-center text-center rounded-full cursor-pointer transition-all ${selectedSize === size
                        ? 'ring-1 ring-[#7F55DF] sm:p-1 max-sm:p-[2px]'
                        : 'ring-1 ring-[#F1F0F3]'
                        }`}

                    onClick={() => setSelectedSize(size)}
                >
                    {size}
                </div>
            ))}
        </div>
    );
}

const ProductDetail = () => {
    const { id } = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const [selectedColor, setSelectedColor] = useState('');
    const [isFavouriteLocal, setIsFavouriteLocal] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const isLogin = useSelector((state) => state.auth.isLogin)
    const [favProduct] = usePostMutation();
    const [isFollow, setIsFollow] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const reviews = [1, 2, 3]
    const { data, isLoading: isLoading, error: postsError } = useGetByIdQuery({
        endpoint: `api/products`,
        id: id,
        category: "Products",
    });

    const handleFav = async () => {
        if (!isLogin) {
            message.error('Please login to add to favorites');
            return;
        }
        try {
            const endpoint = isFavouriteLocal
                ? `api/wishlist/products/remove/${data?.product?._id}`
                : `api/wishlist/products/add/${data?.product?._id}`;
            const response = await favProduct({
                endpoint,
                data: {},
                tag: 'Favorite',
            }).unwrap();

            if (response.success) {
                setIsFavouriteLocal(!isFavouriteLocal);
                message.success(
                    !isFavouriteLocal
                        ? "Added to favorites successfully!"
                        : "Removed from favorites successfully!"
                );
            }
        } catch (error) {
            message.error(error?.data?.message || 'Failed to update favorites');
            console.error('Error:', error);
        }
    };

    const handleFollow = async () => {
        try {
            const endpoint = isFollow
                ? `api/shops/${data?.product?.shop?._id}/remove-follower`
                : `api/shops/${data?.product?.shop?._id}/add-follower`;

            const response = await followShop({
                endpoint,
                data: {},
                tag: 'Shops',
            }).unwrap();

            if (response.success) {
                setIsFollow(!isFollow)
                message.success(
                    !isFollow
                        ? "Followed successfully"
                        : "Unfollowed successfully"
                );
            }
        } catch (error) {
            message.error(error?.data?.message || 'Failed to update Follow');
            console.error('Error:', error);
        }
    };

    const formatTitleForURL = (title) => {
        return title?.toLowerCase().replace(/ /g, '-');
    };

    const handleAddtocart = async () => {
        const product = data?.product
        const totalPrice = product?.price * quantity;
        const formData = {
            image: product?.images?.length > 0 ? product?.images[0] : '',
            productId: product?._id,
            created_by: product?.created_by,
            name: product?.name,
            shop: product?.shop,
            brand: product?.brand,
            price: product?.price,
            quantity: quantity,
            totalQuantity: product?.quantity,
            color: selectedColor,
            size: selectedSize,
            totalPrice: totalPrice,
        };

        dispatch(addToCart(formData));
        // router.push('/cart')
        message.success('Product Added Successfully')
    };

    useEffect(() => {
        if (data) {
            const nData = data?.product;
            setSelectedSize(nData?.variant_size?.length > 0 ? nData?.variant_size[0] : '');
            setSelectedColor(nData?.variant_color?.length > 0 ? nData?.variant_color[0] : '');
            setIsFavouriteLocal(nData?.isFavourite);
            setIsFollow(nData?.shop?.isFollow);
        }
    }, [data]);

    return (
        isLoading ?
            <Loading /> :
            <>
                <section>
                    <Container fluid='lg'>
                        <div className="product-slider pt-4 pb-md-4 pb-3 mb-2 flex-lg-nowrap flex-wrap flex justify-center gap-4 ">
                            <div className="min-[992px]:w-1/2 sm:w-4/5 max-sm:w-[99%]">
                                <div>
                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#4D4D4D',
                                        }}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Thumbs, Autoplay]}
                                        loop={true}
                                    >
                                        {data?.product?.images?.map((image, index) => (
                                            <SwiperSlide key={index} className="relative">
                                                <img
                                                    src={`${image}`}
                                                    alt={`Slide ${index + 1}`}
                                                    className="w-full sm:h-[550px] h-[302px] object-contain bg-[#f0f0f0]"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="mt-3">
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            {data?.product?.images?.map((image, index) => (
                                                <SwiperSlide
                                                    key={index}
                                                    className={`relative`}
                                                >
                                                    <img
                                                        src={`${image}`}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-100 sm:h-[130px] h-[100px] object-cover cursor-pointer border rounded-md"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>

                                </div>
                            </div>
                            <div className="min-[992px]:w-1/2 sm:w-4/5 max-sm:w-[99%]">

                                <div className=" flex gap-3 justify-between  items-center flex-wrap">
                                    <span className='text-[#999999]'>{data?.product?.brand?.name}</span>
                                    <div className='ms-auto'>
                                        <div className='flex gap-1 items-center'><IoIosStar className='text-[#FFC220]' size={20} />
                                            <span className='popins_regular text-sm '>3.0</span> <span className=' text-sm text-[#9B9B9B]'>(4,579 ratings)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6 mt-2">
                                    <h2 className="popins_semibold sm:text-2xl md:text-3xl lg:text-4xl text-xl mb-3">{data?.product?.name}</h2>
                                    <div>
                                        <h2 className="sm:text-base text-sm popins_semibold mb-2">Description</h2>
                                        <p className="text-[#252C32] line-clamp-2 popins_regular sm:text-sm text-xs">
                                            {data?.product?.description}
                                        </p>
                                    </div>
                                    <div className='mt-3 mb-3'>
                                        <h2 className="popins_semibold sm:text-2xl md:text-3xl lg:text-4xl text-xl mb-0">${data?.product?.price} <del className='text-[#B8B5C3] text-xl'>${data?.product?.dis_price}</del> </h2>
                                    </div>
                                    <div>
                                        <h2 className="sm:text-xl text-sm popins_medium mb-2">Select Color</h2>
                                        <ColorSelector data={data} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                    </div>
                                    <div className='mt-3'>
                                        <h2 className="sm:text-xl text-sm popins_medium mb-2">Select Size</h2>
                                        <SizeSelector data={data} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                    </div>
                                    <div className='mt-3'>
                                        <h2 className="sm:text-base text-sm popins_semibold mb-2">Quantity</h2>
                                        <Counter
                                            disabled={data?.product?.quantity === quantity}
                                            count={quantity} setCount={setQuantity} />
                                        {data?.product?.quantity === 0 &&
                                            <span className='text-red-500 text-xs popins_regular'>Out of stock</span>}
                                        {data?.product?.quantity === quantity &&
                                            <span className='text-red-500 text-xs popins_regular'>You cannot add more quantity in this Product.</span>}
                                    </div>
                                    <div className='mt-3 flex gap-2'>
                                        <button
                                            disabled={!selectedColor || !selectedSize}
                                            onClick={handleAddtocart}
                                            className='btn1 primary w-100'>Add to Cart</button>
                                        <button onClick={handleFav} className='btn1 outline-primary'>
                                            {isFavouriteLocal ?
                                                <IoIosHeart size={23} className="text-red-500" />
                                                : <CiHeart size={23} />}
                                        </button>
                                    </div>
                                </div>
                                <Link href={`/shop/${data?.product?.shop?._id}?name=${formatTitleForURL(data?.product?.shop?.name)}`} className='flex justify-between gap-2 p-2 border-t border-b border-[#F1F0F3]'>
                                    <div className='text_primary flex gap-2 max-sm:text-sm items-center'>
                                        <span><img src='/assets/follow.svg' alt='' /> </span>
                                        {data?.product?.shops[0]?.influencer?.name || 'Not found'}
                                    </div>
                                    <div>
                                        <div onClick={handleFollow} className='ms-auto mt-auto'>
                                            <button className={`btn1 ${isFollow ? 'lightsecondary' : 'primary'} small-btn-2`}>
                                                {isFollow ? 'Un Follow' : 'Follow'}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </Container>
                    <Container fluid="md">
                        <h2 className="sm:text-2xl text-sm  max-sm:hidden md:text-3xl popins_medium mb-3">Reviews [17]</h2>
                        <ReviewsProgress />
                        <div className='flex sm:hidden justify-between items-center gap-2 px-2 py-[16px] border-t border-b border-[#F1F0F3]'>
                            <div className='text_primary flex gap-2 max-sm:text-sm items-center'>
                                <span><AiOutlineMessage size={24} /> </span>
                                Reviews
                            </div>
                            <div className='text-[#B8B5C3]'>
                                <MdChevronRight size={25} />
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='mt-md-4 mt-3'>
                    <Container fluid="sm">
                        {reviews.map((item, index) => (<Fragment key={index}>  <Reviews /> </Fragment>))}
                        <section className='py-sm-5 py-3'>
                            <div className='mb-3'>
                                <HomeHeading head={'You May Also Like'} center={false} />
                            </div>
                            <ProductSwiper />
                        </section>
                    </Container>
                </section>
            </>
    )
}

export default ProductDetail