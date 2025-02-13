/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { message } from 'antd';
import { useRouter } from 'next/navigation'

const OrderSummary = ({ placeOrder = false, hanldePlaceOrder, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { push } = useRouter()
    const cartDetail = useSelector(state => state.cart.cartDetail)
    const totalPrice = cartDetail?.reduce((total, item) => total + (item.totalPrice || 0), 0)
    const deliveryAddress = useSelector(state => state.auth.deliveryAddress)
    const selectedPayment = useSelector(state => state.auth.selectedPayment)
    const userData = useSelector(state => state.auth.userData)
    return (
        <>
            <div className=''>
                <div className=" sm:border sticky top-0  sm:border-[#EBEBEB] sm:p-8 max-sm:p-3 max-[992px]:max-w-[588px] max-[992px]:mx-auto   rounded-lg">
                    {placeOrder ?
                        <>
                            <h2 className="text-xl max-sm:hidden popins_semibold mb-2">{'Checkout'}</h2>
                            <>
                                <div>
                                    <h6 className='popins_medium pt-2'> Delivery address</h6>
                                </div>
                                <div className='flex justify-between shadow-md rounded-md my-2 p-2'>
                                    <div className="">
                                        <h6 className="text-sm  popins_medium text-[#222222]">{deliveryAddress?.fname + ' ' + deliveryAddress?.lname || ''}</h6>
                                        <h6 className="text-sm  popins_medium text-[#222222]">{deliveryAddress?.email}</h6>
                                        <h6 className="text-sm  popins_medium text-[#222222]">{deliveryAddress?.phone}</h6>
                                        <div className="mt-1 text-xs text-[#222222]">
                                            <p>{deliveryAddress?.address1} </p>
                                            <p>{deliveryAddress?.city}, {deliveryAddress?.state} {deliveryAddress?.zipcode}, {deliveryAddress?.country}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={'/checkout?steps=1'} className='link text-xs link-danger' >Change</Link>
                                    </div>
                                </div>
                            </>
                            <>
                                <div>
                                    <h6 className='popins_medium pt-2'> Payment Method</h6>
                                </div>
                                <div className='flex justify-between shadow-md rounded-md mt-2 mb-3 p-2'>
                                    <div className="flex gap-2 items-center">
                                        <div className='h-10 p-2'>
                                            {selectedPayment === 'stripe' ?
                                                <Image src={'/assets/visa.png'} width={35} height={25} className='object-contain' alt='mastercard' /> :
                                                <Image src={'/assets/paypal.svg'} width={20} height={20} className='object-contain' alt='mastercard' />}
                                        </div>
                                        <h6 className="text-sm  mb-0 popins_medium text-[#222222]">{selectedPayment === 'stripe' ? 'Credit/Debit Card' : 'Paypal'}  </h6>
                                    </div>
                                    <div>
                                        <Link href={'/checkout?steps=2'} className='link text-xs link-danger' >Change</Link>
                                    </div>
                                </div>
                            </>

                        </> :
                        <h2 className="text-xl popins_semibold mb-3">{'Order Summary'}</h2>}
                    <div className="mb-3 custom-form">
                        <label className="text-sm text-[#545454]">Discount code / Promo code</label>
                        <input
                            type="text"
                            placeholder="Code"
                            className="form-control"
                        />
                    </div>

                    <div className="sm:space-y-3 space-y-2 mb-6 pb-3">
                        <div className="flex pb-2 justify-between items-center">
                            <span className="popins_semibold">Subtotal</span>
                            <span className="popins_semibold">${totalPrice}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 max-sm:text-sm">Tax</span>
                            <span className="popins_semibold">$0</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 max-sm:text-sm">Shipping</span>
                            <span className="popins_semibold">$0</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">${totalPrice}</span>
                        </div>
                    </div>
                    {placeOrder ?
                        <button disabled={isLoading} onClick={() => hanldePlaceOrder()} className="w-full btn1 primary">
                            {isLoading ? <BeatLoader color="#fff" size={10} /> : "Place Your Order"}
                        </button> :
                        <>
                            {userData ?
                                <Link href={'/checkout'} className="w-full btn1 primary">
                                    Checkout
                                </Link> :
                                <button onClick={() => {
                                    if (!userData) {
                                        message.error('Please login your account')
                                        push('/auth/login')
                                        return
                                    }
                                }} className="w-full btn1 primary">
                                    Checkout
                                </button>}
                            {/* <Link href={'/checkout?steps=3'} className="w-full min-sm-hidden  btn1 primary">
                                Checkout
                            </Link> */}
                        </>
                    }
                </div>
            </div>
            <Modal centered className='rounded-3' animation show={isOpen}>
                <Modal.Header className='border-0 pb-0' closeButton onHide={() => setIsOpen(false)} />
                <Modal.Body>
                    <div className=' py-4 flex flex-col justify-center items-center animate__animated animate__bounceIn'>
                        <Image src={'/assets/box-1.svg'} className='mb-2' height={98} width={98} alt='' />
                        <h1 className='popins_semibold max-sm:text-base text-[#292929] text-2xl mb-1' >Your Order is Placed</h1>
                        <p className='text-[#727272] max-sm:text-sm' >Your account had been successfully Placed</p>
                        <Link href={'/'} replace={true} className='btn1 primary small-btn-2 mt-2' >Show Now</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderSummary