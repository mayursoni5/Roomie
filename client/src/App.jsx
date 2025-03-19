import { Route,Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@/components/ui/button";
import  Home  from "../src/pages/Home"
import Listing from "../src/pages/Listing"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import Navbar from '@/components/Navbar'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
