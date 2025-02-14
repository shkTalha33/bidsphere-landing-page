"use client";

import AuctionEvents from "@/components/home/AuctionEvents";
import DownloadSection from "@/components/home/DownloadSection";
import ForYou from "@/components/home/ForYou";
import HeroSection from "@/components/home/hero-section/hero-section";
import OurOffers from "@/components/home/OurOffers";

/* eslint-disable @next/next/no-img-element */

export default function Home() {

  return (
    <>
      <HeroSection />
      <OurOffers />
      <ForYou />
      <AuctionEvents />
      <DownloadSection />
    </>
  );
}