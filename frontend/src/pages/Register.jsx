import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-[#020617] text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl 
      border border-white/10 rounded-2xl p-8 shadow-xl">

        <form onSubmit={handleSubmit}>

          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account 🚀
          </h2>

          {/* NAME */}
          <label className="text-sm text-gray-400 mb-1 block">
            Username
          </label>
          <div className="flex items-center border border-white/10 
          rounded-lg px-3 py-2 mb-4 bg-white/5">

            <FaUser className="text-gray-400 mr-2" />

            <input
              type="text"
              name="name"
              placeholder="Enter Username"
              value={formData.name}
              onChange={handleForm}
              className="bg-transparent outline-none w-full text-white"
              required
            />
          </div>

          {/* EMAIL */}
          <label className="text-sm text-gray-400 mb-1 block">
            Email
          </label>
          <div className="flex items-center border border-white/10 
          rounded-lg px-3 py-2 mb-4 bg-white/5">

            <FaEnvelope className="text-gray-400 mr-2" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleForm}
              className="bg-transparent outline-none w-full text-white"
              required
            />
          </div>

          {/* PASSWORD */}
          <label className="text-sm text-gray-400 mb-1 block">
            Password
          </label>
          <div className="flex items-center border border-white/10 
          rounded-lg px-3 py-2 mb-4 bg-white/5">

            <FaLock className="text-gray-400 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleForm}
              className="bg-transparent outline-none w-full text-white"
              required
            />

            <span
              className="cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <label className="text-sm text-gray-400 mb-1 block">
            Confirm Password
          </label>
          <div className="flex items-center border border-white/10 
          rounded-lg px-3 py-2 mb-4 bg-white/5">

            <FaLock className="text-gray-400 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleForm}
              className="bg-transparent outline-none w-full text-white"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 
            py-2 rounded-lg hover:scale-105 transition"
          >
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="text-center mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-medium">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;