import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { CREATE_ROOM_ROUTE } from "@/utils/constants";

const RoomForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    rent: "",
    furnished: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const { title, description, address, city, rent } = formData;

    if (!title || !description || !address || !city || !rent) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const res = await apiClient.post(CREATE_ROOM_ROUTE, formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("Room created successfully!");
        navigate("/listing");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-3xl p-6 rounded-2xl shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-green-600">
            Create a Room Listing
          </CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Cozy 1BHK near MG Road"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Indore"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123, MG Road, Near XYZ Mall"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="rent">Rent (₹)</Label>
              <Input
                id="rent"
                name="rent"
                type="number"
                value={formData.rent}
                onChange={handleChange}
                placeholder="5000"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the room, locality, nearby places..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
              id="furnished"
              className="h-4 w-4 accent-green-500"
            />
            <Label htmlFor="furnished" className="text-sm">
              This room is furnished
            </Label>
          </div>
        </CardContent>

        <CardFooter className="w-full flex justify-center mt-6">
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-lg font-medium py-6 rounded-full"
          >
            Submit Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomForm;
