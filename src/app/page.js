"use client";

import AuctionEvents from "@/components/home/AuctionEvents";
import ContactSection from "@/components/home/ContactSection";
import DownloadSection from "@/components/home/DownloadSection";
import Experience from "@/components/home/experience";
import ForYou from "@/components/home/ForYou";
import HeroSection from "@/components/home/hero-section/hero-section";
import OurOffers from "@/components/home/OurOffers";
import Services from "@/components/home/Services";

/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurOffers />
      <ForYou />
      <AuctionEvents />
      {/* <Services /> */}
      {/* <Experience /> */}
      <DownloadSection />
      <ContactSection />
    </>
  );
}
