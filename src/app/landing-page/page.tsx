import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/hero-section";
import ServicesSection from "@/components/landing-page/services-section";
import TrackingSection from "@/components/landing-page/tracking-section";
import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TrackingSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
