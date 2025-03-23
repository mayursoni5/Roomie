import React from "react";
import Agreement from "../assets/Agreement.json"
import { motion } from "framer-motion";
import Lottie from "lottie-react";
// import agreementIllustration from "../assets/illustrations/agreement.png"; // Ensure correct path

const AgreementSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 lg:px-32 py-16 lg:py-24 mt-24 lg:mt-24 bg-gray-50">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
          Hassle-Free Renting, <br />
          Instant Agreements, <br />
          and a Seamless Move!
        </h2>
        <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg">
          Easily create and sign your rental agreement in just a few clicks.{" "}
          <span className="text-green-600 font-semibold">ROOMIE</span> keeps it simple.
        </p>
        <button className="mt-6 md:mt-8 bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg font-medium hover:bg-green-600 transition">
          Create Now ›
        </button>
      </div>

      {/* Animated Illustration */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0"
        initial={{ y: 10 }} // Start position
        animate={{ y: [-10, 10, -10] }} // Floating effect
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} // Smooth looping
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie animationData={Agreement}  loop={true} className="w-80 md:w-96" />
        </div>
      </motion.div>
    </section>
  );
};

export default AgreementSection;
