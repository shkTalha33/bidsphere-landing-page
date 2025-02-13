import { Divider } from "antd";
import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";
import { FaCheck } from "react-icons/fa";
import { Check } from "react-feather";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "../api/axiosInstance";
import { handleError } from "../api/errorHandler";
import { BeatLoader } from "react-spinners";

export default function PackageCard({ title, price, type, features, isPopular = false, ctaText = "Get Started", userType, currentStep, isActive, setIsActive, index }) {
  const userData = useSelector(state => state.auth.userData)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async () => {
    if (userData) {
      setIsLoading(true)
      await axiosInstance.post('auth/pay/registration-fee', { paymentMethod: 'paypal', redirect: 'https://setofshops-web.vercel.app/account-created', cancel_url: 'https://setofshops-web.vercel.app/', subscriptionFee: 20, plan: type })
        .then((result) => {
          if (result.data.success) {
            window.location.href = result.data.approvalLink;
          }
        }).catch((err) => {
          handleError(err)
        }).finally(() => setIsLoading(false))
    } else {
      router.push(`/auth/signup?user=${userType}&plan=${type}`)
    }
  }
  const handleSelectCard = () => {
    if (currentStep === 6) {
      setIsActive(index)
      router.replace(`/auth/signup?step=${currentStep}&user=${userType}&plan=${type}`)

    }
  }
  return (
    <>
      <div className="max-w-[340px] w-100 h-100 transform transition-transform cursor-pointer duration-300 hover:-translate-y-2" onClick={handleSelectCard}>
        <Card className={`relative h-100 rounded-2xl shadow-md overflow-hidden ${isActive === index ? 'border-2 sm:scale-100 border-purple-500  bg-purple-50' : isActive === index && isPopular ? 'border-2 sm:scale-105 border-purple-500  bg-purple-50' : 'border border-gray-200 bg-white'}`}>
          {isPopular && (
            <div className="absolute top-2 text-xs left-auto right-3 bg-purple-500 text-white px-3 py-1 rounded-full shadow-md">
              Most Popular
            </div>
          )}
          <CardBody className="">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <div className="flex items-baseline text-3xl font-bold text-gray-900">
              {price}
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </div>
            <p className="text-gray-600 mt-3 mb-2 text-sm  popins_medium leading-relaxed">Features & Benefits.</p>
            <ul className="space-y-3 mb-0">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div>  <Check className={`w-5 h-5 ${feature?.included ? 'text_primary' : 'text-gray-300'}`} /></div>
                  <span className={`text-sm  ${feature?.included ? 'text-gray-900' : 'text-gray-400'}`}>{feature?.text}</span>
                </li>
              ))}
            </ul>

          </CardBody>
          {currentStep !== 6 &&
            <CardFooter className="bg-transparent border-0 pb-3">

              <button
                style={{ minHeight: 'auto' }}
                className={`btn1 primary w-full small-btn py-2`}
                onClick={handleRegister}
                disabled={isLoading}
              // href={`/auth/register?plan=${title}`}

              >
                {isLoading ? <BeatLoader color="#fff" size={10} /> : ctaText}
              </button>
            </CardFooter>}
        </Card>
      </div>
    </>
  );
}
