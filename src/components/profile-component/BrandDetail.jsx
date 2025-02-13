/* eslint-disable @next/next/no-img-element */
"use client"
import Loading from "@/app/loading";
import { useState } from "react";
import { BiStore } from "react-icons/bi";
import { GoGlobe } from "react-icons/go";
import { useSelector } from "react-redux";
import { useGetByIdQuery } from "../redux/apiSlice2";

const BrandDetail = () => {
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth?.userData)

  const { data, isLoading, error: postsError } = useGetByIdQuery({
    endpoint: `api/users/brand`,
    id: userData?._id,
    category: "Brand",
  });

  const safeGet = (obj, path, defaultValue = "Not specified") => {
    try {
      const value = path.split('.').reduce((current, key) => current?.[key], obj);
      return value !== undefined && value !== null ? value : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);

  const getFollowerPreferences = () => {
    const followerCounts = safeGet(
      data,
      "brand.brand.preferences.influencer_info.followerCount",
      {}
    );
    return (
      Object.entries(followerCounts)
        .filter(([_, value]) => value)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
        .join(", ") || "No preferences"
    );
  };

  const getBrandData = (path, defaultValue) => safeGet(data, path, defaultValue);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* Header Section - Modified for better mobile responsiveness */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl relative mb-40 sm:mb-28">
        {data?.brand?.brand?.cover_image && (
          <img
            src={data?.brand?.brand?.cover_image}
            alt="Cover"
            className="w-full h-full object-cover rounded-2xl opacity-90"
          />
        )}

        <div className="absolute max-w-md -bottom-32 sm:-bottom-20 left-0 right-0 mx-4 sm:mx-8">
          <div className="flex flex-col sm:flex-row items-center bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg">
            <img
              src={data?.brand?.brand?.logo}
              className="w-[80px] sm:w-[100px] rounded-xl border-4 border-white shadow-md mb-4 sm:mb-0"
              alt="profile"
            />
            <div className="ml-0 sm:ml-6 space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl popins_bold text-gray-900">
                {getBrandData("brand.brand.name")}
              </h1>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a
                  href={`https://${getBrandData("brand.brand.website")}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoGlobe className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  {getBrandData("brand.brand.website")}
                </a>
                <span className="flex items-center text-gray-600 text-sm sm:text-base">
                  <BiStore className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  {getBrandData("brand.brand.businessType", "Business type not specified")}
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:space-x-4">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {getBrandData("plan")} Plan
                </div>
                <div className={`flex items-center space-x-1 ${data?.brand?.status === "active" ? "text-green-600" : "text-gray-600"}`}>
                  <div className={`w-2 h-2 rounded-full ${data?.brand?.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                  <span className="text-sm">{data?.brand?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Business Overview */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Business Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Annual Revenue</h3>
                  <p className="text-xl sm:text-2xl popins_bold text-purple-600">
                    {formatCurrency(getBrandData(`brand.annualRevenue`, 0))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">
                    Conversion Rate
                  </h3>
                  <p className="text-lg sm:text-xl popins_semibold">
                    {getBrandData("brand.brand.sales.conversionRate", 0)}%
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Total Sales</h3>
                  <p className="text-xl sm:text-2xl popins_bold text-purple-600">
                    {formatCurrency(getBrandData("brand.brand.sales.total", 0))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Return Policy</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {getBrandData("brand.brand.returnPolicy", "Standard return policy applies")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Product Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {data?.brand?.brand?.product_cats?.length > 0 ? (
                data.brand?.product_cats?.map((category, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No product categories defined</p>
              )}
            </div>
          </div>

          {/* Collaborations */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Active Collaborations
            </h2>
            <div className="space-y-4">
              {data?.brand?.brand?.collaborations?.length > 0 ? (
                data.brand?.collaborations?.map((collab, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="popins_medium">
                        {collab?.influencer?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {collab.influencer?.bio?.slice(0, 20)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No active collaborations</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Enhanced Legal Docs */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Legal Documents
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">
                  Tax Identification
                </h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono text-sm sm:text-base">
                    {getBrandData("brand.brand.legal_docs.taxId")}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-2">
                  Registration Certificate
                </h3>
                {data?.brand?.brand?.legal_docs?.registration_certificate ? (
                  <a
                    href={data?.brand?.brand?.legal_docs.registration_certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative"
                  >
                    <img
                      src={data?.brand?.brand?.legal_docs.registration_certificate}
                      alt="Registration Certificate"
                      className="w-full h-36 sm:h-48 object-contain rounded-lg border border-gray-200 group-hover:border-purple-300 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">View Document</span>
                    </div>
                  </a>
                ) : (
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-500">No certificate available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Payment Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm text-gray-500">Primary Method</h3>
                  <p className="popins_medium text-sm sm:text-base">
                    {getBrandData("brand.brand.payment_info.payment_method")}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm text-gray-500 mb-1">Bank Name</h3>
                  <p className="popins_medium text-sm sm:text-base">
                    {getBrandData("brand.brand.payment_info.bankName", "Not specified")}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm text-gray-500 mb-1">Account Number</h3>
                  <p className="font-mono text-sm sm:text-base">
                    {getBrandData("brand.brand.payment_info.accountNumber", "••••••••")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Preferences */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl popins_semibold mb-6 text-gray-800">
              Influencer Preferences
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-2">
                  Preferred Age Groups
                </h3>
                <div className="flex flex-wrap gap-2">
                  {safeGet(data, "brand.brand.preferences.influencer_info.ageGroup", []).map((age, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                    >
                      {age}
                    </span>
                  ))}
                  {data?.brand?.brand?.preferences?.influencer_info?.ageGroup?.length === 0 && (
                    <span className="text-gray-500 text-sm">Any age group</span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-2">
                  Follower Requirements
                </h3>
                <p className="popins_medium text-sm sm:text-base">{getFollowerPreferences()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-2">
                  Preferred Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {safeGet(data, "brand.brand.preferences.influencer_info.location", []).map((loc, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {loc}
                    </span>
                  ))}
                  {data?.brand?.brand?.preferences?.influencer_info?.location?.length === 0 && (
                    <span className="text-gray-500 text-sm">Any location</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;