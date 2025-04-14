import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "@/components/Navbar";
import Alllisting from "./pages/listings/Alllisting";
import Home from "./pages/Landing/Home";
import LookingFor from "./pages/looking-for/LookingFor";
import RoomForm from "./pages/rooms/CreateRoom";
import ListingDetails from "./pages/listings/ListingDetails";
import RoommateDetails from "./pages/listings/RoomateDetails";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/listing" element={<Alllisting />} />
          <Route path="/looking-for" element={<LookingFor />} />
          <Route path="/create-room" element={<RoomForm />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/profile/:id" element={<RoommateDetails/>} />

          <Route path="/listing/:id" element={<> 
          <Navbar/>
            <ListingDetails />
          </>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}``

export default App;
