import { useRouter } from 'next/navigation'
import React from 'react'
import { GoArrowLeft } from 'react-icons/go'

const StepperHeading = ({ heading, subHeading, path, currentStep, email, isSmall = false }) => {
    const router = useRouter()
    return (
        <>
            <div className={` ${isSmall ? 'pt-3' : 'pt-[54px]'} `}>
                <button disabled={currentStep === 1}  onClick={() => path()}>
                    <GoArrowLeft size={24} />
                </button>
            </div>
            {heading &&
                <div className={`lg:text-start ${isSmall ? 'pt-1' : 'pt-4'}`}>
                    <h1 className={`${isSmall ? 'sm:text-2xl text-xl' : 'text-2xl md:text-3xl  lg:text-4xl '} poppins_semibold`}>{heading}</h1>
                    {email ? <p className="md:text-lg text-base poppins_regular mt-1">
                        {subHeading} <br />
                        <span className="poppins_medium"> {email} </span>
                    </p> :
                        <p className="md:text-lg text-base poppins_regular mt-1">{subHeading}</p>}
                </div>}
        </>
    )
}

export default StepperHeading