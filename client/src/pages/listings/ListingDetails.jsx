import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageSquare, Users, DollarSign } from "lucide-react";
import axios from "axios";
import ChatBox from "@/components/Chat/ChatBox";

// Avatar images
import placeholderImage from "../../assets/Male_avatar_2.png";
import maleAvatar from "../../assets/Male_avatar_1.png";
import femaleAvatar from "../../assets/female_avatar_1.png";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [receiverId, setReceiverId] = useState(null);

  const senderId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/listings/${id}`);
        setListing(response.data.data);
      } catch (error) {
        console.error("Error fetching listing details:", error.message);
      }
    };

    fetchListingDetails();
  }, [id]);

  const getAvatar = (gender) => {
    if (gender === "Male") return maleAvatar;
    if (gender === "Female") return femaleAvatar;
    return placeholderImage;
  };

  const handleChatOpen = () => {
    setReceiverId(listing.owner); // Set the listing owner's ID as the receiver
    setShowChat(true);
  };

  if (!listing) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">
        ROO<span className="text-green-500">MIE</span>
      </h1>
      <p className="text-center text-lg font-semibold my-2">
        Rooms & Roommates, Made Simple
      </p>

      <div className="text-gray-500 text-sm">
        Home / Looking for {listing.type === "room" ? "Room" : "Roommate"} / {listing.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Profile Section */}
        <Card className="p-6 flex flex-col items-center border border-gray-200 shadow-md">
          <img
            src={getAvatar(listing.genderPreference)}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border border-gray-300 shadow"
          />
          <h2 className="text-xl font-semibold mt-3">{listing.name}</h2>

          {/* Contact Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleChatOpen}
              className="bg-green-500 text-white flex items-center px-4 py-2 rounded-full hover:bg-green-600"
            >
              <MessageSquare size={16} className="mr-2" /> Chat
            </Button>
            <Button className="bg-green-500 text-white flex items-center px-4 py-2 rounded-full hover:bg-green-600">
              <Phone size={16} className="mr-2" /> Call
            </Button>
          </div>
        </Card>

        {/* Details Section */}
        <div className="md:col-span-2 p-6 border border-gray-200 shadow-md rounded-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-gray-700 flex items-center gap-2">
              <MapPin size={18} className="text-green-500" />
              {listing.location}
            </p>
          </div>

          <h3 className="text-lg font-semibold">Basic Info</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-500" />
              Gender: <span className="font-semibold">{listing.genderPreference}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              Rent: <span className="font-semibold">₹{listing.rent}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-500" />
              Occupancy: <span className="font-semibold">{listing.occupancy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-500" />
              Looking For: <span className="font-semibold">{listing.genderPreference}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box Component */}
      {showChat && receiverId && (
        <ChatBox
          senderId={senderId}
          receiverId={receiverId}
          onClose={() => {
            setShowChat(false);
            setReceiverId(null);
          }}
        />
      )}
    </div>
  );
}
