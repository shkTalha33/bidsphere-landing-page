"use client"

/* eslint-disable @next/next/no-img-element */
import Loading from "@/app/loading";

import { useState } from "react";
import { MapPin, Users } from "react-feather";
import { BiCalendarEvent } from "react-icons/bi";
import { FaChartPie } from "react-icons/fa6";
import { GoGlobe } from "react-icons/go";
import { LuLink } from "react-icons/lu";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader/ImageLoader";
import { useGetByIdQuery } from "../redux/apiSlice2";

const InfluencerDetail = () => {
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth?.userData)

  const { data, isLoading, error: postsError } = useGetByIdQuery({
    endpoint: `api/users/influencer`,
    id: userData?._id,
    category: "Influencer",
  });

  if (isLoading) return <Loading />
  if (error) return <div>Error: {error}</div>;

  const formatNumber = (num) => num?.toLocaleString() || "0";

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl relative mb-24">
        {data?.influencer.influencer.cover_image && (
          <img
            src={data?.influencer.influencer.cover_image}
            alt="Cover"
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8 flex items-end">
          <ImageLoader
            circeltrue={false}
            imageUrl={data?.influencer?.influencer?.profile_image}
            // onClick={() => handleImageClick(row?.influencer?.cover_image)}
            classes={`w-32 h-32 rounded-2xl border-4 border-white shadow-lg`}
          />
          <div className="flex items-center gap-3 ml-4 mb-2">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm popins_medium text-gray-700">Active</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-sm popins_medium text-gray-700">
              {data?.influencer?.influencer?.followersCount || 0} Followers
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl popins_semibold text-gray-800">
            About {data?.influencer?.influencer?.name}
          </h2>
          {/* Bio Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-lg popins_semibold mb-1">Bio</h2>
            <h4 className="text-sm md:text-base popins_regular text-gray-900 mb-4">
              {data?.influencer?.influencer?.bio}
            </h4>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                <span className="popins_medium">
                  {data?.influencer?.location?.address?.city || "N/A"}
                </span>
              </div>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <BiCalendarEvent className="h-5 w-5 text-purple-600 mr-2" />
                <span className="popins_medium">
                  {new Date(
                    data?.influencer?.influencer?.dateOfBirth
                  ).toLocaleDateString() || "N/A"}
                </span>
              </div>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <GoGlobe className="h-5 w-5 text-purple-600 mr-2" />
                <span className="popins_medium">
                  {data?.influencer?.influencer?.nationality || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl popins_semibold text-gray-800">
            Social Media Information
          </h2>
          {/* Social Media Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.influencer?.influencer?.social_media_info?.length > 0 ? (
              data?.influencer?.influencer?.social_media_info?.map((platform) => (
                <div
                  key={platform._id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="popins_semibold text-lg flex items-center">
                      {platform.platform}
                    </h3>
                    <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      @{platform.username}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Followers</span>
                      <span className="popins_semibold text-purple-600">
                        {formatNumber(platform.followers)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="popins_semibold text-purple-600">
                        {platform.avg_engagement_rate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Reach</span>
                      <span className="popins_semibold text-purple-600">
                        {formatNumber(platform.monthly_reach)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center py-6">
                  <p className="text-gray-500">
                    No social media information available
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Audience Demographics */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl popins_semibold mb-6 flex items-center text-gray-800">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              Audience Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Age Group */}
              <div className="space-y-4">
                <h3 className="popins_medium text-gray-700">Age Distribution</h3>
                <div className="relative h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4">
                    <div className="text-3xl popins_semibold text-purple-600">
                      {data?.influencer?.influencer?.audience_info?.ageGroup || "N/A"}
                    </div>
                    <div className="text-gray-600 mt-2">Average Age</div>
                  </div>
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="space-y-4">
                <h3 className="popins_medium text-gray-700">Gender Split</h3>
                <div className="flex items-center justify-center h-40">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl popins_semibold text-purple-600">
                        {
                          data?.influencer?.influencer?.audience_info?.gender_percent
                            ?.male
                        }
                        %
                      </div>
                      <div className="text-sm text-gray-600">Male</div>
                    </div>
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="fill-none stroke-gray-200"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="fill-none stroke-purple-600"
                        strokeWidth="10"
                        strokeDasharray={`${data?.influencer?.influencer?.audience_info?.gender_percent
                          ?.male * 3.14
                          } 282`}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Top Locations */}
              <div className="space-y-4">
                <h3 className="popins_medium text-gray-700">Top Locations</h3>
                <div className="space-y-3">
                  {data?.influencer?.influencer?.audience_info?.location?.map(
                    (loc, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                        {loc}
                      </div>
                    )
                  )}
                  {data?.influencer?.influencer?.audience_info?.location?.length ===
                    0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No locations Available</p>
                      </div>
                    )}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="popins_medium text-gray-700">Top Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {data?.influencer?.influencer?.audience_info?.interests?.map(
                    (interest, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm popins_medium flex items-center"
                      >
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        {interest}
                      </span>
                    )
                  )}
                  {data?.influencer?.influencer?.audience_info?.interests?.length ===
                    0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No Interests Available</p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Connected Brands */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl popins_semibold mb-6 flex items-center text-gray-800">
              <LuLink className="h-6 w-6 text-purple-600 mr-2" />
              Connected Brands
            </h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {data?.influencer?.influencer?.connected_brands?.map((brand) => (
                <div
                  key={brand._id}
                  className="group border border-gray-200 rounded-xl p-4 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="popins_medium text-gray-600">
                        {brand.brand.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="popins_semibold text-gray-900 group-hover:text-purple-600">
                        {brand.brand.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {brand.brand.website}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Target:{" "}
                    <span className="popins_medium">
                      {brand.brand.targetAudience?.ageGroup} •{" "}
                      {brand.brand.targetAudience?.gender}
                    </span>
                  </div>
                </div>
              ))}
              {data?.influencer?.influencer?.connected_brands?.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No Brands associated</p>
                </div>
              )}
            </div>
          </div>

          {/* Products & Commissions */}
          <div className="bg-white rounded-xl shadow-sm p-6 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl popins_semibold mb-6 flex items-center text-gray-800">
              <FaChartPie className="h-6 w-6 text-purple-600 mr-2" />
              Products & Commissions
            </h2>

            <div className="space-y-3">
              {data?.influencer?.influencer?.products?.map((product) => (
                <div
                  key={product._id}
                  className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-all hover:bg-purple-50 hover:border-purple-200 cursor-pointer"
                >
                  <div className="flex-1 min-w-0 ">
                    <h3 className="text-base popins_semibold text-gray-900 group-hover:text-purple-600 ">
                      {product?.product?.name || "Unnamed Product"}
                    </h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${product.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                          }`}
                      ></div>
                      <span className="text-sm text-gray-600 capitalize">
                        {product.status || "unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-right">
                      <span className="text-lg popins_semibold text-purple-600">
                        {product.commission || 0}%
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Commission</p>
                    </div>
                  </div>
                </div>
              ))}

              {data?.influencer?.influencer?.products?.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">No products associated</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetail;
