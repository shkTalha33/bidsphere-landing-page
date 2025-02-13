"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { message } from 'antd';
import { setOrderData, setPaymentDetail } from '../redux/loginForm';
import { setCartDetail } from '../redux/cart';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import axiosInstance from '../api/axiosInstance';

const OrderDataSuccess = () => {
    const cartDetail = useSelector(state => state.cart.cartDetail)
    const selectedPayment = useSelector(state => state.auth.selectedPayment)
    const paymentDetail = useSelector(state => state.auth.paymentDetail)
    const orderData = useSelector(state => state.auth.orderData)
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const PayerID = searchParams.get("PayerID");
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoadingPay, setIsLoadingPay] = useState(true);

    // const HandlePaymentReturn = () => {
    let stripePayment = {
        checkoutId: '',
        payment_intent: '',
        payment_method_configuration_details: '',
        payment_status: ''
    }
    const handleReset = () => {
        dispatch(setPaymentDetail(null))
        dispatch(setOrderData(null));
        dispatch(setCartDetail([]));
    }

    const HandleRetrievePayment = async () => {
        if (paymentDetail?.id && selectedPayment !== null && paymentDetail !== null && orderData !== null) {
            const endpoint = `stripe/session/retrieve/${paymentDetail?.id}`
            await axiosInstance.get(endpoint)
                .then((result) => {
                    if (result.data.success) {
                        const data = result.data?.payment
                        if (data?.payment_intent) {
                            stripePayment = {
                                checkoutId: data?.id,
                                payment_intent: data?.payment_intent,
                                payment_method_configuration_details: data?.payment_method_configuration_details?.id,
                                payment_status: data?.payment_status
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                })
        }
    }
    const HandleOrder = debounce(async () => {
        HandleRetrievePayment()
        const { payment_intent, payment_status, payment_method_configuration_details, checkoutId } = stripePayment
        const nData = {
            ...orderData,
            paymentStatus: (payment_status === 'paid' || (token && PayerID)) ? 'succeeded' : payment_status || "pending",
            paypal: {
                token, PayerID
            },
            stripe: {
                payment_intent, payment_status, payment_method_configuration_details, checkoutId
            }
        }
        // try {
        setIsLoadingPay(true)
        const endpoint = `order/create`;
        await axiosInstance.post(endpoint, nData)
            .then((result) => {
                if (result.data.success) {
                    message.success("Checkout successfully");
                    router.replace('/')
                    handleReset()
                }
            }).catch((err) => {
                handleError(err)
            })
            .finally(() => {
                setIsLoadingPay(false)
            })
    }, 300)
    useEffect(() => {
        if (selectedPayment !== null && paymentDetail !== null && orderData !== null) {
            HandleOrder()
        }
    }, []);

    return (
        <>
            <div style={{ height: 'calc(100vh - 120px)' }} className=' flex justify-center items-center'>
                {isLoadingPay ? <Loading /> :
                    <div className=' py-4 flex flex-col justify-center items-center animate__animated animate__bounceIn'>
                        <Image src={'/assets/box-1.svg'} className='mb-2' height={98} width={98} alt='' />
                        <h1 className='popins_semibold max-sm:text-base text-[#292929] text-2xl mb-1' >Your Order is Placed</h1>
                        <p className='text-[#727272] max-sm:text-sm' >Your account had been successfully Placed</p>
                        <Link href={'/'} replace={true} className='btn1 primary small-btn-2 mt-2' >Show Now</Link>
                    </div>}
            </div>
        </>
    )
}


const OrderSuccess = () => {
    return (
        <> <Suspense fallback={<Loading />}><OrderDataSuccess /> </Suspense> </>
    )
}

export default OrderSuccess