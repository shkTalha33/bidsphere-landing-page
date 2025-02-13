"use client";

import DownloadSection from "@/components/home/DownloadSection";
import HeroSection from "@/components/home/hero-section/hero-section";
import OurOffers from "@/components/home/OurOffers";

/* eslint-disable @next/next/no-img-element */

export default function Home() {

  return (
    <>
      <HeroSection />
      <OurOffers />
      <DownloadSection />
    </>
  );
}