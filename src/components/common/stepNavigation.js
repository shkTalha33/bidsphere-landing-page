/* eslint-disable react-hooks/exhaustive-deps */
"use client";

const StepNavigation = ({ activeTab, setActiveTab, items }) => {
    return (
        <div className="w-full mb-8 overflow-auto">
            <div className="flex items-center justify-between relative">
                {/* Background line */}
                <div className="absolute h-[2px] bg-gray-200 left-10 right-10 overflow-hidden top-1/4 -translate-y-1/2 z-0" />
                {/* Active progress line */}
                <div
                    className="absolute h-[3px] bg-[#FFC244] left-10 right-10 top-1/4 -translate-y-1/2 z-0 transition-all duration-300"
                    style={{
                        width: `${Math.min(
                            ((Number(activeTab) - 1) / (items.length - 1)) * 90,
                            100
                        )}%`,
                    }}
                />
                {/* Steps */}
                <div className="flex justify-between w-full relative z-10">
                    {items.map((item, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === Number(activeTab);
                        const isCompleted = stepNumber < Number(activeTab);

                        return (
                            <div
                                key={item.number}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    if (isCompleted || stepNumber === Number(activeTab) + 1) {
                                        setActiveTab(String(stepNumber));
                                    }
                                }}
                            >
                                {/* {index < items.length - 1 && ( */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                    ${isCompleted ? "bg-[#FFC244]" : isActive ? "bg-[#FFC244]" : "bg-gray-200"}
                    ${(isCompleted || isActive) ? "text-white" : "text-gray-500"}
                    transition-all duration-300`}
                                >
                                    {isCompleted ? (
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span
                                    className={`text-sm whitespace-nowrap
                    ${isActive ? "text-black font-medium" : "text-gray-500"}
                    ${isCompleted ? "text-[#FFC244] font-medium" : ""}`}
                                >
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};



export default StepNavigation;
