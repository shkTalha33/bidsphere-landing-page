"use client"

import Image from 'next/image'
import Link from 'next/link'
import { coveravatar } from '../assets/icons/icon'



const BrandCardCustomer = ({ data }) => {
    const formatTitleForURL = (title) => {
        return title?.toLowerCase().replace(/ /g, '-');
    };


    return (
        <Link
            href={`/brand/${data?._id}?name=${formatTitleForURL(data?.brand?.name)}`}
        >
            <div className="w-full h-20 relative">
                <Image
                    fill
                    src={data?.brand?.logo || coveravatar}
                    alt={data?.brand?.name || 'Brand logo'}
                    className="object-contain"
                />
            </div>
        </Link>
    )
}

export default BrandCardCustomer