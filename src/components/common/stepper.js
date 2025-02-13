/* eslint-disable @next/next/no-img-element */
'use client'
import { Fragment, useEffect, useRef, useState } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Stepper = ({ currentStep = 1, steps, is_Sm_Hidden = true, isCheckout = false }) => {
    const [animatedStep, setAnimatedStep] = useState(currentStep);
    const stepperRef = useRef(null);
    const activeStepRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedStep(currentStep);
        }, 100);

        return () => clearTimeout(timer);
    }, [currentStep]);

    // Auto-scroll to active step when it changes
    useEffect(() => {
        if (activeStepRef.current && stepperRef.current) {
            stepperRef.current.scrollTo({
                left: activeStepRef.current.offsetLeft - stepperRef.current.offsetWidth / 2 + activeStepRef.current.offsetWidth / 2,
                behavior: "smooth"
            });
        }
    }, [animatedStep]);

    return (
        <div className={`relative w-full`}>
            <div
                ref={stepperRef}
                className={`flex items-center overflow-x-auto overflow-y-hidden py-2 no-scrollbar ${is_Sm_Hidden ? 'max-sm:hidden' : ''} my-4 justify-between w-full`}
            >
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.number === animatedStep;
                    const isCompleted = step.number < animatedStep;

                    return (
                        <Fragment key={step.number}>
                            {/* Step Item */}
                            <div
                                ref={isActive ? activeStepRef : null}
                                className={`flex items-center max-md:flex-wrap transition-all duration-300 ease-in-out transform 
                                    ${isActive ? "scale-110" : "scale-100"} `}
                            >
                                <div className="text-center w-[92px]">
                                    <div
                                        className={`flex mx-auto items-center justify-center w-7 h-7 max-sm:h-6 max-sm:w-6 rounded-full transition-all duration-300 ease-in-out
                                        ${isActive ? "bg_primary text-white shadow-lg" :
                                                isCompleted ? "bg_primary text-white  opacity-80" :
                                                    "bg-[#dadada] text-white"}`}
                                    >
                                        {step.number}
                                    </div>
                                    <div className="mt-1">
                                        <div className={`${isCheckout ? '' : 'line-clamp-1 '} text-xs max-md:text-xs max-sm:text-[10px] popins_medium transition-all duration-300 
                                        ${isActive ? "text_primary" :
                                                isCompleted ? "text_primary  opacity-80" :
                                                    "text-[#717171]"}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (!isCheckout ?
                                <div className={`flex-1 ${isCompleted ? 'text_primary' : ''} flex mb-3 justify-center`}>
                                    <MdOutlineArrowRightAlt size={25} />
                                </div> :
                                <div className="mx-auto">
                                    <img src="/assets/dot-line.svg" alt="dot-line" />
                                </div>
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
