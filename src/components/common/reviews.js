/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { avataruser } from '../assets/icons/icon'

const Reviews = () => {
    return (
        <>
            <div className='flex gap-2 border-b border-[#E9E9E9] sm:py-4 max-sm:py-3'>
                <div className='' style={{ height: '53px', width: '53px' }}> <img src={avataruser} className=' min-h-[53px] max-h-[53px] h-100 w-100 min-w-[53px] max-w-[53px]  object-cover rounded-full' alt='' /> </div>
                <div>
                    <h1 className='sm:text-xl text-sm  text-[#222222] popins_medium' >Helene Moore</h1>
                    <div className=' flex gap-[4px] mb-1 text-[#FFBA49]'><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
                    <p className='text-[#060606] popins_light mb-0 italic max-sm:text-xs'>
                        Absolutely loved the curated collection! The quality is top-notch, and the recommendations were perfect for my style. Shipping was fast, and the packaging felt luxurious!
                    </p>
                </div>

            </div>
        </>
    )
}

export default Reviews