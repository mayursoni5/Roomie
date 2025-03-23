import React from "react";
import SearchSection from "./SearchSection";
import TypewriterEffectDemo from "./TypewriterEffectDemo";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[110vh] flex flex-col justify-center items-center text-center px-4  bg-gray-100">
      
      {/* "We Provide" Section - Adjusted to be Bolder and Higher */}
      {/* <div className="mb-2 md:mb-4 lg:mb-6">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-black uppercase tracking-widest text-gray-800">
          We Provide
        </h2>
      </div> */}

      <TypewriterEffectDemo className={"mt-30"}/>

      {/* Search Section - Moved Closer to Animated Text */}
      <div className="mt-[-20px] md:mt-[-20px] lg:mt-[-10px] w-full flex justify-center">
        <SearchSection />
      </div>
    </div>
  );
};

export default HeroSection;
