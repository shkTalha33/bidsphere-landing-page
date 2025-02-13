"use client";

/* eslint-disable @next/next/no-img-element */
import DownloadSection from "@/components/common/DownloadSection";
import HeroSection from "@/components/hero-section/hero-section";

export default function Home() {

  return (
    <>
      <section className="">
        <HeroSection />
      </section>
      <DownloadSection />
    </>
  );
}
