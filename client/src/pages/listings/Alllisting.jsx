import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Users, Search, Filter, Home, CalendarClock, User, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Avatar images
import placeholderImage from "../../assets/Male_avatar_2.png";
import maleAvatar from "../../assets/Male_avatar_1.png";
import femaleAvatar from "../../assets/female_avatar_1.png";

export default function Alllisting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("explore");
  const [rooms, setRooms] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [selectedGender, setSelectedGender] = useState("Any");
  const [locationQuery, setLocationQuery] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rooms");
        const roomsData = response.data.rooms.map(room => ({ ...room, type: "room" }));
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    const fetchRoommates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/roomies/getroommates");
        const roommatesData = response.data.roommates.map(user => ({ ...user, type: "roomie" }));
        setRoommates(roommatesData);
      } catch (error) {
        console.error("Error fetching roommates:", error.message);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchRooms(), fetchRoommates()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locationFromURL = queryParams.get("location") || "";
    setLocationQuery(locationFromURL);
  }, [location]);

  const getAvatar = (gender) => {
    if (gender === "Male") return maleAvatar;
    if (gender === "Female") return femaleAvatar;
    return placeholderImage;
  };

  const combinedList = activeTab === "room"
    ? rooms
    : activeTab === "roomie"
    ? roommates
    : [...rooms, ...roommates];

  const filteredList = combinedList.filter((item) => {
    const gender = item.gender || item.genderPreference;
    const itemLocation = item.city || item.location || "";
    if (selectedGender !== "Any" && gender !== selectedGender) return false;
    if (locationQuery && !itemLocation.toLowerCase().includes(locationQuery.toLowerCase())) return false;
    return true;
  });

  // Function to render a room card
  const renderRoomCard = (room) => (
    <Link
      to={`/listing/${room._id}`}
      key={room._id}
      className="group block transition-transform transform hover:scale-105"
    >
      <Card className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:border-green-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img
                src={getAvatar(room.gender || room.genderPreference)}
                alt="Avatar"
                className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
              />
              <div className="ml-4">
                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-xl">
                  {room.name || room.userName}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="text-green-500 mr-1" />
                  <span className="line-clamp-1">{room.city || room.location || "Location not specified"}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 flex items-center">
              <Home size={12} className="mr-1" /> Room
            </span>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <DollarSign size={18} className="text-green-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium"> Monthly Rent </div>
                <div className="text-lg font-semibold text-green-600">₹{room.rent?.toLocaleString() || "Not specified"}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Users size={18} className="text-green-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Looking for</div>
                <div className="text-gray-600">Roommate</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <CalendarClock size={18} className="text-green-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Availability</div>
                <div className="text-gray-600">Immediate</div>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              {room.genderPreference ? (
                <>
                  <User size={18} className="text-green-500 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Preferred</div>
                    <div className="text-gray-600">{room.genderPreference}</div>
                  </div>
                </>
              ) : (
                <>
                  <User size={18} className="text-green-500 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Preferred</div>
                    <div className="text-gray-600">Any</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {room.description && (
            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 line-clamp-2 italic">{room.description}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  // Function to render a roommate card
  const renderRoommateCard = (roommate) => (
    <Link
      to={`/profile/${roommate._id}`}
      key={roommate._id}
      className="group block transition-transform transform hover:scale-105"
    >
      <Card className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:border-blue-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img
                src={getAvatar(roommate.gender || roommate.genderPreference)}
                alt="Avatar"
                className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
              />
              <div className="ml-4">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-xl">
                  {roommate.name || roommate.userName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {roommate.gender || "Not specified"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">{roommate.age || "Age not specified"}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 flex items-center">
              <User size={12} className="mr-1" /> Roomie
            </span>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <MapPin size={18} className="text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Preferred Location</div>
                <div className="text-gray-600 line-clamp-1">{roommate.city || "Not specified"}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <BadgeCheck size={18} className="text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Status</div>
                <div className="text-gray-600">Looking for room</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <DollarSign size={18} className="text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Budget</div>
                <div className="text-gray-600">
                  {roommate.budget ? `₹${roommate.budget.toLocaleString()}` : "Not specified"}
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <CalendarClock size={18} className="text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Move-in</div>
                <div className="text-gray-600">Ready now</div>
              </div>
            </div>
          </div>

          {roommate.description && (
            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 line-clamp-2 italic">{roommate.description}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 pt-8 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h1 onClick={() => navigate('/')} className="text-4xl  cursor-pointer md:text-5xl font-bold text-center">
            ROO<span className="text-green-500">MIE</span>
          </h1>
          <p className="text-center text-gray-600 text-lg md:text-xl mt-2 mb-8">
            Rooms & Roommates, Made Simple
          </p>

          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg w-full">
                  <TabsTrigger value="explore" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">
                    Explore All
                  </TabsTrigger>
                  <TabsTrigger value="room" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">
                    Room
                  </TabsTrigger>
                  <TabsTrigger value="roomie" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">
                    Roomie
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location"
                    className="rounded-lg px-10 py-2 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full md:w-auto border border-gray-200 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowGenderOptions(prev => !prev)}
                  >
                    <Filter size={16} className="text-green-500" />
                    <span>{selectedGender}</span>
                  </Button>

                  {showGenderOptions && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                      {["Any", "Male", "Female"].map((gender) => (
                        <button
                          key={gender}
                          onClick={() => {
                            setSelectedGender(gender);
                            setShowGenderOptions(false);
                          }}
                          className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${
                            selectedGender === gender ? "font-semibold text-green-600 bg-gray-50" : "text-gray-700"
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredList.length} {activeTab === "roomie" ? "Roommates" : activeTab === "room" ? "Rooms" : "Listings"} Available
          </h2>
          <p className="text-gray-500 text-sm">
            {selectedGender !== "Any" ? `Filtered by: ${selectedGender}` : ""}
            {locationQuery ? `${selectedGender !== "Any" ? " • " : ""}Location: ${locationQuery}` : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No listings found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 text-green-600 border-green-500 hover:bg-green-50"
              onClick={() => {
                setSelectedGender("Any");
                setLocationQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredList.map((item) => (
              item.type === "room" ? renderRoomCard(item) : renderRoommateCard(item)
            ))}
          </div>
        )}
      </div>
    </div>
  );
}