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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";
import roomieLogo from "../../assets/ROOMIE_LOGO_PROFILE.png";

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    name: "",
    lookingFor: "",
    gender: "Male",
    city: "",
    contactNumber: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleAvatarUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarOptions = [
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <img className=" mb-5" src={roomieLogo} alt="Roomie Logo" />

      <Card className="w-full max-w-4xl ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl text-[#666666]">
            Let's Build Your ROOMIE Profile!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5 pl-20 pr-20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name<span className="text-green-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Please enter your full name"
                className="flex-1 ml-4 bg-gray-100 rounded-full"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="lookingFor" className="text-sm font-medium">
                You are looking for?<span className="text-green-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("lookingFor", value)
                }
                value={formData.lookingFor}
              >
                <SelectTrigger className="flex-1 ml-4 bg-gray-100 rounded-full">
                  <SelectValue placeholder="Select one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roommate">Roommate</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Your Gender<span className="text-green-500">*</span>
              </Label>
              <div className="flex gap-2 ml-4">
                <Button
                  type="button"
                  variant={formData.gender === "Male" ? "default" : "outline"}
                  className={`rounded-full px-6 ${
                    formData.gender === "Male"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleGenderSelect("Male")}
                >
                  Male
                </Button>
                <Button
                  type="button"
                  variant={formData.gender === "Female" ? "default" : "outline"}
                  className={`rounded-full px-6 ${
                    formData.gender === "Female"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleGenderSelect("Female")}
                >
                  Female
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="city" className="text-sm font-medium">
                Choose your preferred city
                <span className="text-green-500">*</span>
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Your verified contact number
                <span className="text-green-500">*</span>
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

          <div className="mt-6">
            <div className="flex items-start gap-4">
              {avatarPreview ? (
                <Avatar className="h-24 w-24 rounded-xl border-4 border-green-500">
                  <AvatarImage src={avatarPreview} alt="Preview" />
                  <AvatarFallback className="bg-green-500">DP</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-24 w-24 rounded-xl border-4 border-green-500">
                  <AvatarFallback className="bg-green-500">DP</AvatarFallback>
                </Avatar>
              )}

              <div className="flex-1">
                <div
                  className="border-2 border-dashed rounded-md border-gray-300 p-6 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                >
                  <UploadCloud className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">
                    Drag & drop to upload (.jpg/.png)
                  </p>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>

                <div className="text-center my-2">-- OR --</div>

                <div className="flex justify-center gap-2 mt-2">
                  {avatarOptions.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="cursor-pointer h-12 w-12 border-2 hover:border-green-500"
                      onClick={() => setAvatarPreview(avatar)}
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Avatar option ${index + 1}`}
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button className="w-[50%] text-lg bg-green-500 hover:bg-green-600 rounded-full">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSetup;
