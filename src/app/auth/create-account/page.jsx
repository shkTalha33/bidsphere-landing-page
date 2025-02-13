/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
    Documents,
    LegalInformation,
    Preferences,
    RegistrationFee,
    VehicleDetails,
} from "@/components/common/registerFile";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

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
                                key={item.key}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => {
                                    if (isCompleted || stepNumber === Number(activeTab) + 1) {
                                        setActiveTab(String(stepNumber));
                                    }
                                }}
                            >
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
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("1");

    const {
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            vehicle: {
                type: "",
                registrationNumber: "",
                insuranceDetails: "",
                licenseNumber: "",
            },
            preferences: {
                workingHours: "",
                deliveryAreas: [],
            },
            legal: {
                isAutoEntrepreneur: false,
                autoEntrepreneurNumber: "",
                policeClearance: "",
            },
            documents: {
                nationalId: "",
                drivingLicense: "",
                vehicleRegistration: "",
                policeClearance: "",
                autoEntrepreneurCertificate: "",
                profilePhoto: "",
            },
        },
    });

    const onSubmit = (data) => {
        if (activeTab !== "5") {
            const nextTab = String(Number(activeTab) + 1);
            setActiveTab(nextTab);
            localStorage.setItem("activeTab", nextTab); // Save step in localStorage
        } else {
            console.log("Final form data:", data);
            // Handle final submission
        }
    };

    const items = [
        { key: "1", label: "Registration Fee", children: <RegistrationFee /> },
        {
            key: "2",
            label: "Vehicle Details",
            children: <VehicleDetails control={control} errors={errors} watch={watch} />,
        },
        {
            key: "3",
            label: "Preferences",
            children: <Preferences control={control} errors={errors} watch={watch} />,
        },
        {
            key: "4",
            label: "Legal Information",
            children: <LegalInformation control={control} errors={errors} watch={watch} />,
        },
        {
            key: "5",
            label: "Documents",
            // children: <Documents control={control} errors={errors} watch={watch} />,
        },
    ];

    // Initialize activeTab from localStorage
    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab && items.find((item) => item.key === savedTab)) {
            setActiveTab(savedTab);
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Rider Registration</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <StepNavigation
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                        setActiveTab(tab);
                        localStorage.setItem("activeTab", tab); // Save step in localStorage
                    }}
                    items={items}
                />

                <div className="mb-6">
                    {items.find((item) => item.key === activeTab)?.children}
                </div>

                <div className="flex justify-between mt-6">
                    {activeTab !== "1" && (
                        <button
                            type="button"
                            onClick={() => {
                                const prevTab = String(Number(activeTab) - 1);
                                setActiveTab(prevTab);
                                localStorage.setItem("activeTab", prevTab);
                            }}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#00A082] text-white rounded-lg ml-auto hover:bg-[#008F75] transition-colors"
                    >
                        {activeTab === "5" ? "Submit" : "Next"}
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Page;
