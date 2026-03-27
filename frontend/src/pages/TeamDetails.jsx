import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const TeamDetails = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ REAL DATA FROM Team.jsx
  const member = location.state?.member;

  // ❌ safety check
  if (!member) {
    return (
      <div className="p-6 text-white">
        No member data found ❌
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white mb-6"
        >
          ← Back
        </button>

        {/* CARD */}
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">

          {/* TOP */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full 
            bg-gradient-to-r from-green-400 to-blue-500 
            flex items-center justify-center text-2xl font-bold shadow-lg">
              {member.name?.charAt(0)}
            </div>

            {/* INFO */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold">
                {member.user?.name}
              </h2>

              <p className="text-gray-400">
                {member.role}
              </p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                Online
              </span>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/10 mb-6"></div>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-4">

            <Card title="Email" value={member.user?.email || "Not available"} />
            <Card title="Role" value={member.role || "Member"} />

          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4 flex-wrap">

            {/* 💬 CHAT */}
            <button
              onClick={() =>
                navigate("/team-chat", { state: { user: member.user } })
              }
              className="bg-gradient-to-r from-green-500 to-blue-500 
              px-5 py-2 rounded-lg hover:scale-105 transition"
            >
              Message
            </button>

            {/* 📌 ASSIGN TASK */}
            <button
              onClick={() =>
                navigate("/assign-task", { state: { member } })
              }
              className="bg-white/10 border border-white/10 px-5 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Assign Task
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default TeamDetails;