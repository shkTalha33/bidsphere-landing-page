/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import TopSection from '@/components/common/TopSection';
import OptionsHelpCenter from '@/components/optionsHelpCenter';
import TabHeader from '@/components/tabHeader';
import { Divider } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
/* eslint-disable @next/next/no-img-element */

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [faqData, setFaqData] = useState([]);

    // Static FAQ categories
    const staticCategories = [
        {
            _id: "cat1",
            title: "Bidding Process"
        },
        {
            _id: "cat2",
            title: "Payment & Fees"
        },
        {
            _id: "cat3",
            title: "Shipping & Delivery"
        },
        {
            _id: "cat4",
            title: "Returns & Refunds"
        },
        {
            _id: "cat5",
            title: "Account Management"
        }
    ];

    // Static FAQ data by category
    const staticFaqData = {
        "cat1": [
            {
                _id: "faq1",
                question: "How do I place a bid?",
                answer: "To place a bid, simply navigate to the lot you're interested in, enter your bid amount (at or above the minimum bid), and click 'Place Bid'. You'll receive a confirmation once your bid is placed successfully."
            },
            {
                _id: "faq2",
                question: "What is the minimum bid increment?",
                answer: "Minimum bid increments vary by price range. For items under $100, increments are $5. For items $100-$500, increments are $20. For items over $500, increments are $50 or 5% of the current bid, whichever is higher."
            },
            {
                _id: "faq3",
                question: "Can I retract my bid?",
                answer: "Bids are binding and cannot be retracted once placed. Please review lot details carefully before bidding."
            }
        ],
        "cat2": [
            {
                _id: "faq4",
                question: "What payment methods do you accept?",
                answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for payments. All transactions are processed securely."
            },
            {
                _id: "faq5",
                question: "Is there a buyer's premium?",
                answer: "Yes, a 15% buyer's premium is added to all winning bids. This fee helps cover our operating costs and service fees."
            },
            {
                _id: "faq6",
                question: "When is payment due for won lots?",
                answer: "Payment is due within 48 hours of auction close. Failure to pay within this timeframe may result in the lot being offered to the next highest bidder."
            }
        ],
        "cat3": [
            {
                _id: "faq7",
                question: "How long does shipping take?",
                answer: "Shipping times vary based on location and shipping method. Domestic shipments typically arrive within 3-7 business days, while international shipments may take 7-21 business days."
            },
            {
                _id: "faq8",
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping fees and potential customs duties vary by destination."
            },
            {
                _id: "faq9",
                question: "Can I arrange my own shipping?",
                answer: "Yes, you may arrange your own shipping for larger items. Please contact our customer service within 24 hours of winning to make arrangements."
            }
        ],
        "cat4": [
            {
                _id: "faq10",
                question: "What is your return policy?",
                answer: "Items may be returned within 14 days if they significantly differ from their description. All returns must be approved by our quality assurance team."
            },
            {
                _id: "faq11",
                question: "How do I request a refund?",
                answer: "To request a refund, please contact our customer service with your order number and reason for refund. All refund requests are reviewed within 3 business days."
            }
        ],
        "cat5": [
            {
                _id: "faq12",
                question: "How do I create an account?",
                answer: "To create an account, click 'Sign Up' in the top right corner of our website. You'll need to provide your name, email, and create a password."
            },
            {
                _id: "faq13",
                question: "Can I change my username?",
                answer: "Yes, you can change your username in your account settings. Note that this will change how your name appears on all bids and communications."
            },
            {
                _id: "faq14",
                question: "How do I reset my password?",
                answer: "To reset your password, click 'Forgot Password' on the login page. We'll send a password reset link to your registered email address."
            }
        ]
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setCategories(staticCategories);
            if (!activeCategory && staticCategories.length > 0) {
                setActiveCategory(staticCategories[0]._id);
                setFaqData(staticFaqData[staticCategories[0]._id]);
            } else if (activeCategory) {
                setFaqData(staticFaqData[activeCategory]);
            }
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (activeCategory) {
            setLoading(true);
            setTimeout(() => {
                setFaqData(staticFaqData[activeCategory] || []);
                setLoading(false);
            }, 500);
        }
    }, [activeCategory]);

    const navigate = (path) => {
        console.log(`Navigating to ${path}`);
    };

    return (
        <main className="bg-gray-100 pt-20 flex flex-col items-start min-h-screen">
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4">
                    <TabHeader />
                </div>
                <div className="w-full flex flex-col items-start gap-3 lg:w-3/4">
                    <TopSection description='See your FAQs here..' mt={0} title='Help Centre' />
                    <div className="bg-white px-8 rounded-lg w-full shadow-sm">
                        <div className='p-3 p-md-4 rounded-4 bg_white'>
                            <h6
                                className={`text-lg md:text-xl text-center text-md-start mb-4 xl:text-2xl poppins_medium`}
                            >
                                Frequently Asked Questions
                            </h6>
                            <div className='flex max-[900px]:flex-wrap gap-2'>
                                <div className='w-100 max-[900px]:w-100 min-[900px]:max-w-[300px]'>
                                    <div>
                                        {isLoading ? (
                                            <div className='m-2 text-center'>
                                                <HashLoader size={18} />
                                            </div>
                                        ) : (
                                            categories?.map((category, index) => (
                                                <Fragment key={index}>
                                                    <div>
                                                        <h6
                                                            onClick={() => setActiveCategory(category?._id)}
                                                            className={`mb-0 text-[1.2rem] capitalize cursor-pointer py-2 ${activeCategory === category?._id
                                                                ? 'text_primary poppins_medium'
                                                                : 'text_secondary poppins_regular'
                                                                }`}
                                                        >
                                                            {category?.title}
                                                        </h6>
                                                        <Divider className='my-2' />
                                                    </div>
                                                </Fragment>
                                            ))
                                        )}
                                    </div>
                                    <div className='contact-help-center rounded-2 bg-blue-700 mt-6'>
                                        <div className='p-4'>
                                            <p className='mb-2 sm:text-[12px] md:text-[15px] lg:text-[18px] poppins_medium text_white'>
                                                Didn't find what you were looking for?
                                            </p>
                                            <p className='md:text-[10px] lg:text-[14px] poppins_normal text_white'>
                                                Contact our customer service{' '}
                                            </p>
                                            <button
                                                onClick={() => navigate('/contact-us')}
                                                className='rounded-none bg-white text-blue-700 px-4 py-2 mt-2 font-medium hover:bg-gray-100 transition-colors'
                                            >
                                                Contact Us
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    {loading ? (
                                        <div className='flex justify-center items-center pt-5'>
                                            <HashLoader color="#0066CC" size={30} />
                                        </div>
                                    ) : (
                                        faqData?.map((items, index) => (
                                            <Fragment key={index}>
                                                <OptionsHelpCenter items={items} />
                                            </Fragment>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;