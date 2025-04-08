/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ApiFunction from "@/components/api/apiFuntions";
import { auctionDetail } from "@/components/api/ApiFile";
import { handleError } from "@/components/api/errorHandler";
import RegistrationReviewPage from "@/components/common/RegistrationReviewPage";
import TopSection from "@/components/common/TopSection";
import debounce from "debounce";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { get, userData } = ApiFunction();
  const navigate = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const fetchAuctionDetail = debounce(async () => {
    setLoading(true);
    await get(`${auctionDetail}${id}`)
      .then((result) => {
        if (result?.success) {
          setData(result?.auction);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);
  useEffect(() => {
    if (id) {
      fetchAuctionDetail();
    }
  }, []);

  const handlenavi = () => {
    navigate.push(`/auctions/${id}`);
  };
  return (
    <>
      <main className="bg_mainsecondary p-2 md:py-4">
        <TopSection
          title={`${getGreeting()}, ${userData?.fname} ${userData?.lname}`}
          description={"Here are your auctions whom you can join."}
          // button={button}
        />
        <Container className="bg_white rounded-[9px] my-4 p-3 p-sm-4 shadow-[0px_4px_22.9px_0px_#0000000D]">
          <div className="flex items-center justify-between">
            <p className="poppins_semibold text-2xl capitalize">{data?.name}</p>
            <div
              onClick={handlenavi}
              className="px-5 py-2 cursor-pointer bg-[#f5f5f5] text_primary text-sm rounded-2xl capitalize"
            >
              {data?.status}
            </div>
          </div>
          <RegistrationReviewPage
            data={data?.applications}
            pageType="detailPage"
            isLoading={loading}
          />
        </Container>
      </main>
    </>
  );
}
