import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import roomieLogo from "../../assets/ROOMIE_LOGO_PROFILE.png";
import { apiClient } from "@/lib/api-client";
import { UPDATE_LOOKING_FOR_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const LookingFor = () => {
  const [lookingfor, setLookingfor] = useState("Rented Room");
  const navigate = useNavigate();

  const handleSelectChange = (lookfor) => {
    setLookingfor(lookfor);
  };

  const saveChanges = async () => {
    if (!lookingfor) {
      toast.error("Please select one option.");
      return;
    }

    try {
      const res = await apiClient.post(
        UPDATE_LOOKING_FOR_ROUTE,
        { lookingfor: lookingfor },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data) {
        toast.success("updated successfully!");
        console.log(res.data.userData.lookingfor);
        if (res.data.userData.lookingfor === "Roomates") {
          navigate("/create-room");
        } else {
          navigate("/listing");
        }
      }
    } catch (error) {
      console.error("Error saving selection:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const logoNavigation = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <div className="mb-10">
        <img
          src={roomieLogo}
          alt="Roomie Logo"
          onClick={logoNavigation}
          className="h-16 hover:cursor-pointer"
        />
      </div>

      <Card className="w-full max-w-4xl min-h-[400px] flex flex-col justify-center items-center mx-4 gap-5">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-[#666666]">
            You are looking for:
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-wrap gap-4 justify-center">
            {["Rented Room", "Roomates"].map((g) => (
              <Button
                key={g}
                type="button"
                variant={lookingfor === g ? "default" : "outline"}
                className={`rounded-full px-10 py-3 text-xl ${
                  lookingfor === g
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => handleSelectChange(g)}
              >
                {g}
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center w-full mt-5 px-6 pb-6">
          <Button
            onClick={saveChanges}
            className="w-full sm:w-1/2 text-2xl bg-green-500 hover:bg-green-600 rounded-full"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LookingFor;
