'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Carousel, Container } from 'react-bootstrap'
import HomeHeading from './homeHeading'
import { FaStar } from 'react-icons/fa'

const BestSeller = () => {
    const arrData = [1, 2, 3]
    return (
        <>
            <section className="bg-[#F5F5F5] my-4">
                <Carousel className='custom-carousel circle-indicators' >
                    {arrData.map((item, index) => (
                        <Carousel.Item key={index} className='max-sm:rounded-xl' >
                            <Container  fluid='sm'>
                                <div className="md:min-h-[620px] py-5 flex gap-3 items-center justify-between">
                                    <div className="max-w-[583px] w-100 flex flex-col gap-2">
                                        <div className="text-[#FFBA49] flex gap-2 mb-2"> <FaStar size={20} /> <FaStar size={20} />  <FaStar size={20} />  <FaStar size={20} />  <FaStar size={20} /> </div>
                                        <HomeHeading head={'Best Sellers'} center={false} />
                                        <p className="text-[#808080] max-sm:text-xs popins_light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                        <div className="mt-2">
                                            <button className="btn1 primary sm:text-sm text-xs px-4">Shop Category</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 max-w-[618px] w-100 max-md:hidden">
                                        <img className="lg:max-w-[301px] max-w-[200px] lg:h-[407px] h-[300px]" src="/assets/img-4.jpg" alt="" />
                                        <img className="lg:max-w-[301px] max-w-[200px] lg:h-[407px] h-[300px] mt-20" src="/assets/img-3.jpg" alt="" />
                                    </div>
                                </div>
                            </Container>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>
        </>
    )
}

export default BestSeller