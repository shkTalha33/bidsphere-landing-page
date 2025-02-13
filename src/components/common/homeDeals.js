import React from 'react'
import { Container } from 'react-bootstrap'

const HomeDeals = () => {
    const Offers = () => (
        <>
            <h1 className="popins_semibold sm:text-5xl md:text-6xl lg:text-7xl text-3xl">70%</h1>
            <p>Unlimited time Offer!</p>
        </>
    )
    return (
        <>
            <section className="sm:py-12 ">
                <Container  fluid='sm' className="bg_primary rounded-3 py-5 px-xl-0 px-4">
                    <div className="sm:min-h-[250px] flex items-center min-[500px]:justify-around max-[500px]:justify-center  max-[500px]:text-center gap-3">
                        <div className="text-white flex flex-col gap-3 max-w-[551px]">
                            <h1 className="sm:text-2xl md:text-4xl lg:text-5xl text-xl" >Deals of the Day!</h1>
                            <p className="max-sm:text-xs popins_light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam. </p>
                            <div className="text-white min-[500px]:hidden">
                                <Offers />
                            </div>
                            <div className=' max-[500px]:mx-auto'>
                                <button className="btn1 white text-sm max-sm:text-xs">Get Discount Now</button>
                            </div>
                        </div>
                        <div className="max-w-[220px] w-100 text-center text-white max-[500px]:hidden">
                            <Offers />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default HomeDeals