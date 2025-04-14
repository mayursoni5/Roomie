import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RoommateDetails() {
  const { id } = useParams();
  const [roommate, setRoommate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoommate = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/roomies/getroommate/${id}`);
        setRoommate(response.data.roommate);
      } catch (error) {
        console.error("Error fetching roommate:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoommate();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!roommate) {
    return <div className="text-center mt-8 text-gray-600">Roommate not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center text-gray-700 mb-3">
            <Users size={20} className="text-green-500 mr-2" />
            <span>Looking for </span>
            <span> {roommate.lookingfor}</span>
          </div>

          <h2 className="text-3xl font-bold mb-4">{roommate.userName}</h2>

          <div className="flex items-center text-gray-700 mb-3">
            <MapPin size={20} className="text-green-500 mr-2" />
            <span>{roommate.city}</span>
          </div>

          <p className="text-gray-600 mt-4">{roommate.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
