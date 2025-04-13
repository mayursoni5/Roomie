import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Users, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Avatar images
import placeholderImage from "../../assets/Male_avatar_2.png";
import maleAvatar from "../../assets/Male_avatar_1.png";
import femaleAvatar from "../../assets/female_avatar_1.png";

export default function Alllisting() {
  const [activeTab, setActiveTab] = useState("explore");
  const [listings, setListings] = useState([]);
  const [selectedGender, setSelectedGender] = useState("Any");
  const [locationQuery, setLocationQuery] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Fetch listings from the server
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/listings/alllisting");
        setListings(response.data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Set locationQuery from URL when component mounts or URL changes
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

  const filteredListings = listings.filter((listing) => {
    if (activeTab === "room" && listing.type !== "room") return false;
    if (activeTab === "roomie" && listing.type !== "roomie") return false;
    if (selectedGender !== "Any" && listing.genderPreference !== selectedGender) return false;
    if (locationQuery && !listing.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 pt-8 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            ROO<span className="text-green-500">MIE</span>
          </h1>
          <p className="text-center text-gray-600 text-lg md:text-xl mt-2 mb-8">
            Rooms & Roommates, Made Simple
          </p>

          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg w-full">
                  <TabsTrigger value="explore" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">Explore All</TabsTrigger>
                  <TabsTrigger value="room" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">Room</TabsTrigger>
                  <TabsTrigger value="roomie" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow">Roomie</TabsTrigger>
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
                    onClick={() => setShowGenderOptions((prev) => !prev)}
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
            {filteredListings.length} {activeTab === "explore" ? "Listings" : activeTab === "room" ? "Rooms" : "Roomies"} Available
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
        ) : filteredListings.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredListings.map((listing) => (
              <Link to={`/listing/${listing._id}`} key={listing._id} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-green-200 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <img src={getAvatar(listing.genderPreference)} alt="Avatar" className="w-20 h-20 object-cover rounded-full border-2 border-white shadow-md" />
                      <div className="ml-5">
                        <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-xl">{listing.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            listing.type === "room" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                          }`}>{listing.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 -mx-8 my-6"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center text-gray-700">
                        <DollarSign size={20} className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-lg">₹{listing.rent.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users size={20} className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-lg">{listing.genderPreference}</div>
                          <div className="text-sm text-gray-500">preference</div>
                        </div>
                      </div>
                      <div className="flex items-start text-gray-700">
                        <MapPin size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-lg line-clamp-1">{listing.location}</div>
                          <div className="text-sm text-gray-500">location</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar size={20} className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-lg">Looking For</div>
                          <div className="text-sm text-gray-500">
                            {listing.type === "room" ? "Roommate" : "Room"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {listing.description && (
                      <div className="mb-6">
                        <p className="text-gray-600 line-clamp-2">
                          {listing.description}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-gray-100 -mx-8 my-6"></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
