import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye and eye-slash icons
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useToken } from "../store/Token.store";
import { useData } from "../store/login.user";


const LoginPage = () => {
  const { setUserData } = useData(); // Correctly place setUserData at the top level
    const { callSetToken } = useToken();
    const {  } = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Correctly place navigate at the top level

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      if (res.status === 201) {
        toast.success("Login successful!");
        // callSetToken(res.data.token, res.data.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setUserData({
          name: res.data.name,
          email: res.data.email,
        })
        navigate("/"); 
        reset(); 
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center">
                <FaUser className="mr-2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email format is invalid",
                    },
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center">
                <FaLock className="mr-2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"} // Conditionally change the input type
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                />
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                  className="absolute right-2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
