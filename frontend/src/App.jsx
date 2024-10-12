import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar
import Footer from "./components/Footer"; // Import the Footer
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogOut from "./components/LogOut";
import axios from "axios";
import { useData } from "./store/login.user";

// Lazy load your components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./components/LoginPage")); // Lazy load Login component
const Signup = lazy(() => import("./components/SignupPage")); // Lazy load Signup component
const NotFound = lazy(() => import("./components/NotFound"));
const Services = lazy(() => import("./components/ServicePage"));

const App = () => {
  const { setUserData } = useData();
  // const navigate = useNavigate();

  useEffect(() => {
    const userIsLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const response = await axios.post("http://localhost:5000/api/check", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if(response.status === 200) {
          setUserData({
            name: response.data.user.name,
            email: response.data.user.email
          });
        }
      } catch (error) {
        console.error('Error checking user:', error);
        toast.error('Session expired or invalid token. Please log in again.');
        // navigate('/login'); 
      }
    };
    userIsLoggedIn();
  }, []);

  return (
    <Router>
      {/* Navbar at the top */}
      <div className="bg-gray-950 w-full text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        {/* Main content */}
        <div className="flex-grow">
          <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} /> {/* Login route */}
              <Route path="/signup" element={<Signup />} /> {/* Signup route */}
              <Route path="/logout" element={<LogOut />} /> {/* Logout route */}
              <Route path="/services" element={<Services />} /> {/* Services route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
