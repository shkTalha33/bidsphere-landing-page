/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
const AuthLayout = ({ children, isCenter, isStepper }) => {


    return (

        <section className="bg-white relative max-w-[1800px] w-100 h-screen mx-auto min-[3057px]:h-[70rem]">
            <div className="flex h-100">
                <section className={`relative bg-black w-100 ${isStepper ? 'min-[1200px]:max-w-[35%]  d-xl-block d-none' : ' min-[1440px]:max-w-[50%]  d-md-block d-none'}`}>
                    <Link href='/' className="absolute top-7 left-7">
                        <Image src={"/assets/logo.svg"} width={99} height={60} alt="logo" />
                    </Link>

                    <img
                        src={"/assets/signup.jpg"}
                        alt=""
                        style={{ objectPosition: 'center 25%' }}
                        className="object-cover h-100 w-100"
                    />
                </section>

                <main className={` ${isCenter && 'flex'} ${isStepper ? 'min-[1200px]:max-w-[65%] min-[1200px]:overflow-auto' : 'min-[1440px]:max-w-[50%] md:max-w-[603px] md:overflow-auto'}  w-100 py-3 px-md-5 px-3  h-100 mx-md-0 mx-auto`}>
                    <div className={`${isStepper ? '' : 'max-w-[600px] mx-auto'}`}>
                        {children}
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout