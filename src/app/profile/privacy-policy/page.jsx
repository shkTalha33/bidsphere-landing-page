/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import TopSection from '@/components/common/TopSection';
import TabHeader from '@/components/tabHeader';
import { useEffect, useState } from 'react';

const PrivacyPolicyPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    const navigate = (path) => {
        console.log(`Navigating to ${path}`);
    };

    const policySection = [
        {
            id: 1,
            title: "Information Collection",
            content: "Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla."
        },
        {
            id: 2,
            title: "Information Usage",
            content: "Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla."
        },
        {
            id: 3,
            title: "Information Setting",
            content: "Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla."
        },
        {
            id: 4,
            title: "Security Measures",
            content: "Lorem ipsum dolor sit amet consectetur. Faucibus viverra ante amet elementum pretium. Sapien id lobortis venenatis phasellus laoreet. Pulvinar pharetra magna vel augue. Massa parturient nisl tempor fringilla."
        },

    ];

    return (
        <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4">
                    <TabHeader />
                </div>
                <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
                    <TopSection description='See Privacy Policy Here.' mt={0} title='Privacy Policy' />
                    <div className="bg-white px-8 py-6 rounded-lg w-full shadow-sm">
                        <div className='p-3 p-md-4 rounded-4 bg_white'>
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h6 className="text-xl md:text-2xl poppins_medium">
                                        Privacy Policy
                                    </h6>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">Sort by:</span>
                                        <span className="font-medium">Effective Date: May 20, 2024</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    This Privacy Policy describes how we collect, use, and disclose your personal information when you use our services, website, and mobile application.
                                </p>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {policySection.map((section) => (
                                        <div key={section.id} className={`border border-gray-200 rounded-md p-6 ${section.id === 4 ? 'border-2 border-blue-600' : ''}`}>
                                            <h2 className="text-xl font-medium mb-3">
                                                {section.id}. {section.title}
                                            </h2>
                                            <p className="text-gray-700">
                                                {section.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicyPage;