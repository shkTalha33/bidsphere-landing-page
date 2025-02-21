/* eslint-disable @next/next/no-img-element */
"use client";
const AuthLayout = ({ children, src, isCenter, description, title }) => {

    return (

        <section className="bg-white relative max-w-[1800px] w-100 h-screen mx-auto min-[3057px]:h-[70rem]">
            <div className="flex h-100">
                <section className={`relative bg-black w-100 min-[1440px]:max-w-[55%] d-md-block d-none`}>
                    <div className="flex absolute h-screen items-center justify-center gap-2 w-full">
                        <div className="flex flex-col gap-2 max-w-md w-full">
                            <h1 className="text-white poppins_semibold text-4xl">{title}</h1>
                            <p className="text-white poppins_regular text-lg">{description}</p>
                        </div>
                    </div>
                    <img
                        src={src || "/assets/auth1.png"}
                        alt=""
                        style={{ objectPosition: 'center 25%' }}
                        className="object-cover h-100 w-100"
                    />
                </section>

                <main className={` ${isCenter && 'flex'} md:items-center flex w-full min-[1440px]:max-w-[45%] md:max-w-[603px] md:overflow-auto w-100 py-3 px-md-5 px-3 h-100 mx-md-0 mx-auto`}>
                    <div className={`max-w-[600px] w-full mx-auto`}>
                        {children}
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout