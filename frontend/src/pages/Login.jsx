import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("teamId", res.data.user.teamId);
      localStorage.setItem("userName", res.data.user.name || "");
      

      if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
      }

      alert("Login Successful 🚀");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Forgot Password
  const handleReset = async () => {
    if (!resetEmail) return;

   await axios.post(`${API}/api/auth/forgot-password`, {
  email: resetEmail,
});

alert("Reset link sent to your email 🚀");

    setResetEmail("");
    setOpenForgot(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-[#020617] text-white px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl 
      border border-white/10 rounded-2xl p-8 shadow-xl">

        <form onSubmit={handleSubmit}>

          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome Back 👋
          </h2>

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
          rounded-lg px-3 py-2 mb-2 bg-white/5">

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

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => setOpenForgot(true)}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 
            py-2 rounded-lg hover:scale-105 transition"
          >
            Login
          </button>

          {/* REGISTER */}
          <p className="text-center mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 font-medium">
              Register
            </Link>
          </p>

        </form>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {openForgot && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#020617] border border-white/10 
          p-6 rounded-2xl w-[300px]">

            <h3 className="text-lg font-semibold mb-4 text-center">
              Reset Password 🔐
            </h3>

            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 
              px-3 py-2 rounded-lg mb-4 text-white"
            />

            <div className="flex justify-between">

              <button
                onClick={() => setOpenForgot(false)}
                className="text-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-green-500 to-blue-500 
                px-4 py-1 rounded-lg"
              >
                Send
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Login;