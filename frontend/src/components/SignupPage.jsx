import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye and eye-slash icons
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Move this out of the onSubmit function
import { useData } from "../store/login.user";
const SignupPage = () => {
  const { setUserData } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // use reset from react-hook-form to reset the form
  } = useForm();

  const navigate = useNavigate(); // Use it here at the top level

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("successful signup, logged in !");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        console.log(response.data);
        setUserData({
          email: response.data.email,
          name: response.data.name,
        });
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log('error! ', error)
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Sign Up</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Username Field */}
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="flex items-center">
                <FaUser
                  className={`mr-2 ${errors.username ? "text-red-500" : "text-gray-400"
                    }`}
                />
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username cannot exceed 20 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username can only contain letters and numbers",
                    },
                  })}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? "border-red-500" : "border-gray-600"
                    }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center">
                <FaEnvelope
                  className={`mr-2 ${errors.email ? "text-red-500" : "text-gray-400"
                    }`}
                />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email format is invalid",
                    },
                    validate: {
                      checkEmail: async (value) => {
                        // Mock check for existing email (replace with your own logic)
                        const existingEmails = [
                          "test@example.com",
                          "user@example.com",
                        ];
                        return (
                          !existingEmails.includes(value) ||
                          "Email is already in use"
                        );
                      },
                    },
                  })}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : "border-gray-600"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center">
                <FaLock
                  className={`mr-2 ${errors.password ? "text-red-500" : "text-gray-400"
                    }`}
                />
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot exceed 20 characters",
                    },
                  })}
                  className={`shadow relative appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : "border-gray-600"
                    }`}
                />
                {/* Toggle Password Visibility Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                  className="absolute right-20 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Use eye icon */}
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
                disabled={isSubmitting} // Disable the button while submitting
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
