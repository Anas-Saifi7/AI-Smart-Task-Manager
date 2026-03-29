import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import socket from "../socket";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const userId = localStorage.getItem("userId");

useEffect(() => {
  if (!userId) return;

  socket.emit("register", userId);

  socket.on("newInvite", (data) => {
    setNotifications((prev) => [
      ...prev,
      { message: "New Team Invite 📩" }
    ]);
  });

  socket.on("taskAssigned", (data) => {
    setNotifications((prev) => [
      ...prev,
      { message: "New Task Assigned 📌" }
    ]);
  });

  return () => {
    socket.off("newInvite");
    socket.off("taskAssigned");
  };
}, [userId]);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-lg text-sm ${
      location.pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl 
    bg-[#020617]/80 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <h2 className="text-xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          TaskManager
        </h2>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-4">

          {/* NEW TASK */}
          <Link to="/create-task">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-linear-to-r from-green-500 to-blue-500 text-sm">
              <FaPlus /> New Task
            </button>
          </Link>

          {/* THEME */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2  rounded-full bg-white/10"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* NOTIFICATION */}
        
<div className="relative">
  <div
    onClick={() => setOpenNotif(!openNotif)}
    className="cursor-pointer"
  >
    <FaBell className="text-xl text-gray-300" />

    {notifications.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
        {notifications.length}
      </span>
    )}
  </div>

  {openNotif && (
    <div className="absolute right-0 mt-3 w-72 bg-[#0f172a] 
    border border-white/10 rounded-xl shadow-lg p-3 z-50">

      <h3 className="text-sm mb-2 text-gray-400">
        Notifications
      </h3>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No notifications
        </p>
      ) : (
        notifications.map((n, i) => (
          <div
            key={i}
            className="p-2 bg-white/5 rounded mb-2 text-sm"
          >
            {n.message}
          </div>
        ))
      )}

    </div>
  )}
</div>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-r from-green-400 to-blue-500 flex items-center justify-center">
                A
              </div>
              <FaChevronDown className="text-xs text-gray-400" />
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-48 
              bg-[#020617] border border-white/10 rounded-xl p-3 space-y-2">

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Profile
                </button>

                <button
                  onClick={() => navigate("/team")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Team
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>

        {/* MOBILE ICON */}
        <div className="md:hidden">
          {mobileMenu ? (
            <FaTimes
              className="text-white text-xl"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <FaBars
              className="text-white text-xl"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-5 pt-3 space-y-3 
        bg-[#020617] border-t border-white/10">

          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>
    <button
            onClick={() => navigate("/team")}
            className="w-full px-4 py-3 rounded-xl text-left hover:bg-white/10"
          >
            Team
          </button>

          <Link to="/create-task">
            <button className="w-full flex items-center justify-center gap-2 
            bg-linear-to-r from-green-500 to-blue-500 py-3 rounded-xl">
              + New Task
            </button>
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full px-4 py-3 mt-4 rounded-xl bg-white/10 text-left"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-xl text-left text-red-400 bg-red-500/10"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;