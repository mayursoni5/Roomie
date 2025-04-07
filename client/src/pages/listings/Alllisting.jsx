import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Users } from "lucide-react";
import female_avatar_1 from "../../assets/female_avatar_1.png";
import female_avatar_2 from "../../assets/female_avatar_2.png";
import male_avatar_2 from "../../assets/male_avatar_2.png";
import male_avatar_1 from "../../assets/Male_avatar_1.png";
import image1 from "../../assets/i.webp";




const listings = [
  { id: 1, image: female_avatar_1, description: "AMAN PAWAR", rent: "₹ 5000", lookingFor: "Female", lookingfor: "Roommate", distance: "3.7 km", match: "60%" },
  { id: 2, image: female_avatar_2, description: "Rozy verma", rent: "₹ 4000", lookingFor: "Male", lookingfor:  "Roommate", distance: "2.5 km", match: "75%" },
  { id: 3, image:male_avatar_1 , description: "Niraj soni", rent: "₹ 6000", lookingFor: "Female", lookingfor: "Room", distance: "4.2 km", match: "50%" },
  { id: 4, image: male_avatar_2, description: "Deepak pawar", rent: "₹ 7000", lookingFor: "Any", lookingfor: "Room", distance: "5 km", match: "80%" },
  { id: 4, image: male_avatar_2, description: "Dharmendra salamae", rent: "₹ 7000", lookingFor: "Any", lookingfor: "Roommate", distance: "5 km", match: "80%" },
];

export default function Alllisting() {
  const [activeTab, setActiveTab] = useState("explore");
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        ROO<span className="text-green-500">MIE</span>
      </h1>
      <p className="text-center text-lg font-semibold my-2">
        Rooms & Roommates, Made Simple
      </p>
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex gap-4">
            <TabsTrigger 
              value="explore" 
              className="relative hover:after:content-[''] hover:after:block hover:after:w-full hover:after:h-[2px] hover:after:bg-green-500 hover:after:absolute hover:after:bottom-0"
            >
              Explore All
            </TabsTrigger>
            <TabsTrigger 
              value="room" 
              className="relative hover:after:content-[''] hover:after:block hover:after:w-full hover:after:h-[2px] hover:after:bg-green-500 hover:after:absolute hover:after:bottom-0"
            >
              Room
            </TabsTrigger>
            <TabsTrigger 
              value="roomie" 
              className="relative hover:after:content-[''] hover:after:block hover:after:w-full hover:after:h-[2px] hover:after:bg-green-500 hover:after:absolute hover:after:bottom-0"
            >
              Roomie
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button 
            variant="secondary" 
            className="bg-gray-700 text-white rounded-full px-4 py-2 transition-colors hover:bg-gray-600"
          >
            Location ▼
          </Button>
          <Button 
            variant="secondary" 
            className="bg-green-500 text-white rounded-full px-4 py-2 transition-colors hover:bg-green-400"
          >
            Gender ▼
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="p-4 shadow-lg rounded-lg border border-gray-200">
            <CardContent className="flex flex-col items-center text-center">
              <img src={listing.image} alt="Room" className="w-full h-48 object-cover rounded-lg" />
              <h2 className="mt-3 text-lg font-bold text-gray-900">{listing.description}</h2>
              <div className="mt-2 flex flex-col gap-2 text-gray-700">
                <p className="flex items-center gap-2"><DollarSign size={16} className="text-green-500" /> Rent: <span className="font-semibold">{listing.rent}</span></p>
                <p className="flex items-center gap-2"><Users size={16} className="text-green-500" /> Looking for: <span className="font-semibold">{listing.lookingFor}</span></p>
                <p className="flex items-center gap-2"><Users size={16} className="text-green-500" /> Looking for: <span className="font-semibold">{listing.lookingfor}</span></p>
                <p className="flex items-center gap-2"><MapPin size={16} className="text-green-500" /> Distance: <span className="font-semibold">{listing.distance}</span></p>
                <p className="font-semibold text-green-600">{listing.match} Match</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
