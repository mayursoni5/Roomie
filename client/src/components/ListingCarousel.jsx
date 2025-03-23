import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/Homeimage.webp";
import image2 from "../assets/2BHK.webp";
import image3 from "../assets/i.webp";

// Sample Listing Data
const listings = [
  {
    id: 1,
    title: "Prime PG",
    price: "Well-lit and fully furnished, perfect for students and professionals.",
    image: image1,
  },
  {
    id: 2,
    title: "Chill 2BHK",
    price: "High-speed WiFi, power backup, and vibrant interiors for a cozy stay.",
    image: image2,
  },
  {
    id: 3,
    title: "Cozy Nest",
    price: "Safe locality with 24/7 security and modern amenities.",
    image: image3,
  },
];

// Slick Slider Settings
const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const ListingCarousel = () => {
  return (
    <section className="py-16  mt-20">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-green-600">ROOMIE</span>’s Finest Listings – Curated for You!
        </h2>
        <p className="text-lg text-gray-700 font-semibold">
          <strong>Only the finest listings, verified and curated just for you.</strong>
        </p>
        <p className="text-gray-600 mb-8">
          Swipe. Choose. Move in – it’s that easy with <strong>ROOMIE!</strong>
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-6">
        <Slider {...settings}>
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="px-3"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={listing.image} alt={listing.title} className="w-full h-56 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
                  <p className="text-gray-600 mt-2">{listing.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ListingCarousel;
