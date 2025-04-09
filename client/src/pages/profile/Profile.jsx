import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import roomieLogo from "../../assets/ROOMIE_LOGO_PROFILE.png";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    gender: "Male",
    city: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    const { userName, gender, city, contactNumber } = formData;

    if (!userName || !gender || !city || !contactNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        { userName, gender, city, contactNumber },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data) {
        toast.success("Profile updated successfully.");
        navigate("/Listing");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <img className="mb-5" src={roomieLogo} alt="Roomie Logo" />

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-[#666666]">
            Let's Build Your ROOMIE Profile!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-6 px-12">
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="userName" className="text-sm font-medium">
                Your Name <span className="text-green-500">*</span>
              </Label>
              <Input
                id="userName"
                name="userName"
                placeholder="Please enter your full name"
                className="flex-1 ml-4 bg-gray-100 rounded-full"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Your Gender <span className="text-green-500">*</span>
              </Label>
              <div className="flex gap-2 ml-4">
                {["Male", "Female"].map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={formData.gender === g ? "default" : "outline"}
                    className={`rounded-full px-6 ${
                      formData.gender === g
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleSelectChange("gender", g)}
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="city" className="text-sm font-medium">
                Preferred City <span className="text-green-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("city", value)}
                value={formData.city}
              >
                <SelectTrigger className="flex-1 ml-4 bg-gray-100 rounded-full">
                  <SelectValue placeholder="Select one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="houston">Houston</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Contact Number <span className="text-green-500">*</span>
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter valid contact number"
                className="flex-1 ml-4 bg-gray-100 rounded-full"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={saveChanges}
            className="w-1/2 text-lg bg-green-500 hover:bg-green-600 rounded-full"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSetup;
