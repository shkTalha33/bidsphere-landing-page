"use client"

import TopSection from '@/components/common/TopSection';
import TabHeader from '@/components/tabHeader';
/* eslint-disable @next/next/no-img-element */

const ProfilePage = () => {


    return (
        <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4">
                    <TabHeader />
                </div>
                <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
                    <TopSection description='See your Won lots here.' mt={0} title='Won Lots' />
                    <div className="bg-white p-8 rounded-lg w-full shadow-sm">
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;