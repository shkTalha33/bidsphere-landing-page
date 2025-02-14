import { useRouter } from 'next/navigation'
import React from 'react'
import { GoArrowLeft } from 'react-icons/go'

const AuthHeading = ({ heading, subHeading, path, email, isSmall = false }) => {
    const router = useRouter()
    return (
        <>
            <div className={`pt-3`}>
                <button className="" onClick={() => path ? router.push(path) : router.back()}>
                    <GoArrowLeft size={24} />
                </button>
            </div>
            {heading &&
                <div className={`lg:text-start ${isSmall ? 'pt-1' : 'pt-3'}`}>
                    <h1 className={`${isSmall ? 'sm:text-2xl text-xl' : 'text-2xl md:text-3xl  lg:text-4xl '} text_dark poppins_semibold`}>{heading}</h1>
                    {email ? <p className="md:text-lg text-base poppins_regular mt-1">
                        {subHeading} <br />
                        <span className="poppins_medium"> {email} </span>
                    </p> :
                        <p className="md:text-lg text-base text_dark poppins_regular mt-1">{subHeading}</p>}
                </div>}
        </>
    )
}

export default AuthHeading