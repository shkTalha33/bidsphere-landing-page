"use client"

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { message } from "antd";
import { IoIosStar } from 'react-icons/io'
import { coveravatar } from '../assets/icons/icon'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { usePostMutation } from '../redux/apiSlice2';

const ShopCard = ({ data }) => {
    const isLogin = useSelector((state) => state.auth.isLogin)
    const router = useRouter()
    const [isFollow, setIsFollow] = useState(data?.isFollow);
    const [followShop] = usePostMutation()

    const formatTitleForURL = (title) => {
        return title?.toLowerCase().replace(/ /g, '-');
    };

    const handleFollow = async () => {
        if (!isLogin) {
            message.info('Please login to follow Influencer')
            return;
        }
        try {
            const endpoint = isFollow
                ? `api/shops/${data?._id}/remove-follower`
                : `api/shops/${data?._id}/add-follower`;

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

    return (
        <>
            <div className="shop-card mx-auto">
                <Link href={`/shop/${data?._id}?name=${formatTitleForURL(data?.influencer?.name)}`} className="relative">
                    <Image className="card-img" width={1000} height={1000} src={data?.influencer?.cover_image || coveravatar} alt="" />
                </Link>
                <div className='flex justify-between flex-wrap gap-2 pt-1'>
                    <div onClick={() => router.push(`/shop/${data?._id}?name=${formatTitleForURL(data?.influencer?.name)}`)} className='mt-2'>
                        <div className="flex gap-2">
                            <div className=' '>
                                <Image width={30} height={30} className='rounded-full w-10 object-cover h-10' src={data?.influencer?.profile_image || coveravatar} alt='' />
                            </div>
                            <div>
                                <h1 className="title text-sm  popins_medium line-clamp-1">{data?.influencer?.name}</h1>
                                <h2 className="price text-xs ">{data?.influencer?.followersCount || 0} Followers</h2>
                            </div>
                        </div>
                        <div className='flex gap-1 mt-2'><IoIosStar className='text-[#FFC220]' size={14} />
                            <span className='popins_medium text-xs text-[#000] '>{data?.influencer?.rating?.average || 0}</span> <span className=' text-xs text-[#9B9B9B]'>({data?.influencer?.rating?.total_reviews} reviews)</span>
                        </div>
                    </div>
                    <div onClick={handleFollow} className='ms-auto mt-auto'>
                        <button className={`btn1 ${isFollow ? 'lightsecondary' : 'primary'} small-btn-2`}>
                            {isFollow ? 'Un Follow' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard