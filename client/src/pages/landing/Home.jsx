import React from "react";
import HeroSection from "../../components/HeroSection";
import FeatureSection from "../../components/FeatureSection";
import AgreementSection from "../../components/AgreementSection";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <AgreementSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
