'use client'
import Image from 'next/image';
import Counter from './counter';
import { useDispatch } from 'react-redux';
import { decrementItemQuantity, incrementItemQuantity, removeItemFromCart } from '../redux/cart';

const CartItems = ({ closeBtn = false, data, index }) => {

    const product = data?.productId || ''
    const dispatch = useDispatch()
    return (
        <div className={`productCard sm:border-b-[0.5px] sm:border-[#A3A3A3] max-sm:border border-[#F0F0F0] sm:py-[.75rem] max-sm:p-2 max-sm:rounded-lg`}>
            <div className={`imageContainer`}>
                <Image
                    src={data?.image}
                    alt="Ultimate Crop Tops"
                    width={96}
                    className='h-100 w-100 object-contain'
                    height={96}
                />
            </div>

            <div className={`content`}>
                <div className={`header`}>
                    <div className={`flex flex-col gap-[3px] `}>
                        <h6 className={`popins_semibold text-[#303030] line-clamp-1 max-sm:text-sm`}>{data?.name} </h6>
                        <span className="text-xs text-[#999999] popins_medium">${data?.price}</span>
                        <span className="text-xs text-[#999999] popins_medium">{data?.shop?.name}</span>
                        <p className={`text-xs `}>
                            <span className='popins_medium' >Size: {data?.size}</span>
                            <div className="flex items-center gap-2 w-full">
                                <span className='popins_medium'>Color: </span>
                                <div style={{ backgroundColor: data?.color }} className='h-4 w-7 rounded-1 flex items-center justify-center '></div>
                            </div>
                        </p>
                        {!closeBtn &&
                            <div className=' pt-2 sm:hidden'>
                                <Counter
                                    disabled={data?.totalQuantity === data?.quantity}
                                    incrementFunc={() => dispatch(incrementItemQuantity({ product }))}
                                    decrementFunc={() => dispatch(decrementItemQuantity({ product }))}
                                    count={data?.quantity} />
                            </div>}
                    </div>

                    <div className={`controls`}>
                        {!closeBtn &&
                            <div className='max-sm:hidden'>
                                <Counter
                                    disabled={data?.totalQuantity === data?.quantity}
                                    incrementFunc={() => dispatch(incrementItemQuantity({ product }))}
                                    decrementFunc={() => dispatch(decrementItemQuantity({ product }))}
                                    count={data?.quantity} />
                            </div>}

                        <span className={`price`}>${data?.totalPrice}</span>
                        {!closeBtn && <button onClick={() => dispatch(removeItemFromCart({ product }))} className={`remove`}>×</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems