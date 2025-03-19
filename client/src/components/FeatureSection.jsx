import React from "react";
import { motion } from "framer-motion";
import homw from "../assets/homw.png";

const FeatureSection = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-10 md:py-16 -mt-20 gap-10 md:gap-16"
      initial={{ opacity: 0, y: 50 }} // Start hidden & slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% visible
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <motion.img 
          src={homw} 
          alt="Find Rooms" 
          className="w-80 md:w-96"
          initial={{ scale: 0.8, opacity: 0 }} // Image starts small & hidden
          whileInView={{ scale: 1, opacity: 1 }} // Enlarges on scroll
          transition={{ duration: 0.8, ease: "easeOut" }} 
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Us?</h2>
        <ul className="space-y-3">
          {[
            "Find the Best Rooms",
            "Smart Roommate Matching",
            "Secure & Verified Listings",
            "Budget-Friendly Options",
            "Prime Location Rentals"
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center text-gray-700 text-lg"
              initial={{ opacity: 0, x: -20 }} // Text slides in from left
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect
            >
              <span className="text-green-500 text-2xl mr-3">✔</span> {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default FeatureSection;
