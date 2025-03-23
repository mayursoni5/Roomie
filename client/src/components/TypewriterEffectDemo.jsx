import React from "react";
import { TypewriterEffect } from "../components/ui/typewriter-effect"; // Ensure this matches your folder structure
; // Ensure this component is correctly imported

const TypewriterEffectDemo = () => {
  const words = [
    { text: "GREAT ROOMS BETTER ROOMATES BEST LIVING "}
    
  ];
  const words1= [
    { text: " WE PROVIDE ", className: "text-gray-700 dark:text-blue-500"}
    
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-24">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
       
      </p>
      <div className="text-red-400">
      <TypewriterEffect className="mb-6 text-lg font-medium" words={words1} />
</div>

      



      <TypewriterEffect words={words} />
      
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black text-white text-sm border border-transparent dark:border-white">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black text-sm border border-black">
          Signup
        </button>
      </div> */}
    </div>
  );
};

export default TypewriterEffectDemo;
