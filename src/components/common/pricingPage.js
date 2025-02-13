'use client'
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import PackageCard from "./packageCard";
import { useState } from "react";
import { useSelector } from "react-redux";

const PricingPage = ({ userType, currentStep }) => {
    const userData = useSelector(state => state.auth.userData)
    const [isActive, setIsActive] = useState(null);
    const tabList = [
        { label: 'Brand', value: 'brand' },
        { label: 'Influencer', value: 'influencer' },
        { label: 'Courier Company', value: 'courier_company' },
    ]
    const [selectedCategory, setSelectedCategory] = useState(userType ? userType : userData?.role ? userData?.role : "brand");
    const packageData = {
        courier_company:
            [
                {
                    title: "Basic Plan", type: 'basic', price: "$20", description: "Features & Benefits",
                    features: [
                        { text: "Limited order volume (up to 50 deliveries/month)", included: true },
                        { text: "Standard commission fee per delivery", included: true },
                        { text: "Basic analytics (number of deliveries, revenue tracking", included: true },
                        { text: "Standard visibility on the platform (lower ranking in search results)", included: true },
                    ]
                },
                {
                    title: "Pro Plan", type: 'pro', isPopular: true, price: "$20", description: "Features & Benefits",
                    features: [
                        { text: "Higher order volume allowance (up 200 deliveries/month)", included: true },
                        { text: "Lower commission fee per delivery", included: true },
                        { text: "Advanced analytics (tracking, heatmaps, performance insights)", included: true },
                        { text: "Priority listing in brand searches", included: true },
                        { text: "Live customer support", included: true },
                    ]
                },
                {
                    title: "Entreprise Plan", type: 'enterprise', price: "$20", description: "Features & Benefits.",
                    features: [
                        { text: "Unlimited deliveries", included: true },
                        { text: "Lowest commission fee per delivery", included: true },
                        { text: "Full analytics dashboard", included: true },
                        { text: "Dedicated account manager", included: true },
                        { text: "Premium visibility & brand customization", included: true },
                    ]
                }
            ],
        brand: [
            {
                title: "Basic",
                price: "$20",
                type: 'basic',
                features: [
                    { text: "Product Listing – Add and manage products (50 products)", included: true },
                    { text: "Influencer collaboration (5 Influencers)", included: true },
                    { text: "Featured Brand Placement – Priority display on homepage and category pages (1 day)", included: true },
                    { text: "Integration with Delivery Companies – Choose from registered logistics providers (1 delivery provider)", included: true },
                    { text: "Email & SMS Marketing Services – Brands pay to send promotions directly to customers (10 Email or SMS per month)", included: true },
                    { text: "Normal transaction fees 4% per transaction", included: true }
                ]
            },
            {
                title: "Premium",
                price: "$20",
                type: 'pro',
                isPopular: true,
                features: [
                    { text: "Product Listing – Add and manage products (100 products)", included: true },
                    { text: "Influencer collaboration (10 Influencers)", included: true },
                    { text: "Featured Brand Placement – Priority display on homepage and category pages (6 days)", included: true },
                    { text: "Integration with Delivery Companies – Choose from registered logistics providers (3 delivery providers)", included: true },
                    { text: "Email & SMS Marketing Services – Brands pay to send promotions directly to customers (50 Email or SMS per month)", included: true },
                    { text: "Normal transaction fees 3% per transaction", included: true }
                ]
            },
            {
                title: "Pro Plan",
                price: "$20",
                type: 'enterprise',
                features: [
                    { text: "Product Listing – Add and manage products (unlimited products)", included: true },
                    { text: "Influencer collaboration (unlimited Influencers)", included: true },
                    { text: "Featured Brand Placement – Priority display on homepage and category pages (2 weeks)", included: true },
                    { text: "Integration with Delivery Companies – Choose from registered logistics providers (unlimited delivery providers)", included: true },
                    { text: "Email & SMS Marketing Services – Brands pay to send promotions directly to customers (100 Email or SMS per month)", included: true },
                    { text: "Normal transaction fees 2% per transaction", included: true }
                ]
            }
        ],
        influencer: [
            {
                title: "Basic Plan",
                price: "$20",
                type: 'basic',
                features: [
                    { text: "For New & Micro-Influencers (0-10K followers)", included: true },
                    { text: "Access to a limited number of brand collaboration opportunities per month", included: true },
                    { text: "Add Badge “STARTER” on your photo profile", included: true },
                    { text: "1 virtual shop template (minimal customization)", included: true },
                    { text: "Lower commission rate per sale", included: true },
                    { text: "Standard analytics (basic performance tracking)", included: true },
                    { text: "Limited virtual shop customization", included: true },
                    { text: "Limited brand deals per month (10 deals)", included: true },
                    { text: "Standard commission rate (lower than higher plans)", included: true },
                    { text: "Basic analytics", included: true }
                ]
            },
            {
                title: "Pro Plan",
                isPopular: true,
                price: "$20",
                type: 'pro',
                features: [
                    { text: "For Growing Influencers (10K-100K followers)", included: true },
                    { text: "Unlimited brand collaboration requests", included: true },
                    { text: "1 virtual shop template with logo & banner", included: true },
                    { text: "Limited brand deals per month (30 deals)", included: true },
                    { text: "Add Badge “FAMOUS” on your photo profile", included: true },
                    { text: "Advanced analytics & insights (conversion rates, audience insights)", included: true },
                    { text: "Better virtual shop customization (branding, featured products)", included: true },
                    { text: "Priority listing for brand deals", included: true }
                ]
            },
            {
                title: "Elite Plan (VIP)",
                price: "$20",
                type: 'enterprise',
                features: [
                    { text: "For Established & Mega Influencers (100K+ followers)", included: true },
                    { text: "Exclusive brand partnership opportunities (VIP access to top brands)", included: true },
                    { text: "Maximum commission per sale", included: true },
                    { text: "Full analytics dashboard with real-time tracking", included: true },
                    { text: "Exclusive promotional tools (ads, boosted visibility)", included: true },
                    { text: "Premium virtual shop customization (emplacement ads)", included: true },
                    { text: "Special discounts on platform fees", included: true },
                    { text: "Add Badge “VIP” on your photo profile", included: true }
                ]
            }
        ],
    };
    const renderPricingCard = () => (<div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out transform">
            <div className="flex justify-center gap-3 py-4 items-center flex-lg-nowrap flex-wrap">
                {packageData[selectedCategory].map((pkg, index) => (
                    <PackageCard setIsActive={setIsActive} isActive={isActive} currentStep={currentStep} key={index} {...pkg} userType={selectedCategory} index={index} />
                ))}
            </div>
        </div>
    </div>)
    return (
        currentStep ? renderPricingCard() :
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12">
                <div className="flex justify-center mb-6">
                    {/* <Image src="/dark-logo.png" alt="Company Logo" width={300} height={50} className="max-w-[80%]" /> */}
                </div>
                <Container>
                    <div className="text-center mb-10">
                        <h1 className="text-2xl  font-extrabold text-gray-900 leading-tight mb-1">Simple, Transparent Pricing</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
                            Choose the perfect plan for your business. Real estate teams get limited free access, while financing brokers and banks can select from our tiered options.
                        </p>
                    </div>
                    <div className="w-full mx-auto pb-10">
                        {/* Top Level Tabs */}
                        {userType ? null :
                            <div className="flex justify-center space-x-3 mb-3">
                                {tabList.map((category) => (
                                    <button
                                        key={category.value}
                                        onClick={() => setSelectedCategory(category.value)}
                                        className={`px-6 py-1 text-sm rounded-3xl transition-all duration-300 ${selectedCategory === category.value ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                            }`}
                                    >
                                        {category.label.charAt(0).toUpperCase() + category.label.slice(1)}
                                    </button>
                                ))}
                            </div>}
                        {/* Animated Content */}
                        {renderPricingCard()}
                    </div>
                </Container>
            </div>
    );
};

export default PricingPage;
