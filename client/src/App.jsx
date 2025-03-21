import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import { apiClient } from "./lib/api-client";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAppStore } from "./store";
import Navbar from '@/components/Navbar'
import  Home  from "../src/pages/Home"
import Listing from "../src/pages/Listing"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to={"/auth"} />;
};

// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? <Navigate to={"/dashboard"} /> : children;
// };




function App() {
  const { userInfo, setUserInfo } = useAppStore();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const res = await apiClient.get(GET_USER_INFO, {
  //         withCredentials: true,
  //       });
  //       if (res.status === 200 && res.data.id) {
  //         setUserInfo(res.data);
  //       } else {
  //         setUserInfo(undefined);
  //       }
  //       console.log(res);
  //     } catch (error) {
  //       setUserInfo(undefined);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (!userInfo) {
  //     getUserData();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [userInfo, setUserInfo]);

  // if (loading) {
  //   return <div>Loading....</div>;
  // }

  return (
    <>
      <BrowserRouter>
    
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home />} />
        
      
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

       
        <Route path="/listings" element={<Listing />} />

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
