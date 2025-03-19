import React from "react";
import SearchSection from "./SearchSection";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[120vh]  flex flex-col justify-center items-center text-center px-4">

        
    
<div className="text-center px-4 ">
  {/* "We Provide" - Now More Bold */}
  <h2 className="text-lg md:text-xl lg:text-3xl font-extrabold uppercase tracking-widest text-gray-700 mb-5 ">
    We Provide
  </h2>

  {/* Main Heading as SVG - Now Less Bold */}
  <a href="https://git.io/typing-svg">
    <img 
      src="https://readme-typing-svg.demolab.com?font=Poppins&weight=500&size=85&pause=2000&width=2000&height=130&lines=Great+Rooms.+Better+Roommates.++Best+Living.&color=000000" 
      alt="Typing SVG"
      className="mx-auto"
    />
  </a>
</div>
<SearchSection/>
    </div>
  );
};

export default HeroSection;
