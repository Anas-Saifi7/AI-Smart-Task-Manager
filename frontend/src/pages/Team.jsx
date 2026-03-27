import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Team = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // ✅ REAL IDs (IMPORTANT)
  const userId = localStorage.getItem("userId");
  const teamId = localStorage.getItem("teamId");

  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    email: "",
    role: "",
  });

  // 🔄 FETCH DATA
  const fetchData = async () => {
    try {
      const memRes = await axios.get(
        `${API}/api/team/team/${teamId}`
      );

      const reqRes = await axios.get(
        `${API}/api/team/requests/${userId}`
      );

      setMembers(Array.isArray(memRes.data) ? memRes.data : []);
      setRequests(Array.isArray(reqRes.data) ? reqRes.data : []);

    } catch (err) {
      console.error(err.response?.data || err.message);
      setMembers([]);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !teamId) {
      alert("User or Team ID missing ❌");
      return;
    }

    fetchData();
  }, []);

  // 📩 SEND INVITE
  const sendInvite = async () => {
    try {
      if (!form.email || !form.role) {
        alert("Fill all fields ❌");
        return;
      }

      const res = await axios.post(
        `${API}/api/team/invite`,
        {
          email: form.email,
          role: form.role,
          teamId,
          senderId: userId,
        }
      );

      // 🔔 SOCKET
      socket.emit("sendInvite", {
        receiverId: res.data.receiverId,
        data: {
          message: "You got a team invite 🔔",
        },
      });

      alert(res.data.msg);

      // reset form
      setForm({ email: "", role: "" });

      fetchData();

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  // ✅ ACCEPT
  const accept = async (id) => {
    try {
      await axios.post(
        `${API}/api/team/accept/${id}`
      );

      fetchData();

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ❌ REJECT
  const reject = async (id) => {
    try {
      await axios.post(
        `${API}/api/team/reject/${id}`
      );

      fetchData();

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-6">

        <h1 className="text-3xl font-bold mb-6">
          Team Management 👥
        </h1>

        {/* 🔹 INVITE SECTION */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl mb-6">
          <h2 className="text-lg mb-3 text-green-400">
            Invite Member
          </h2>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="flex-1 p-3 bg-white/10 rounded-lg outline-none"
            />

            <input
              type="text"
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="flex-1 p-3 bg-white/10 rounded-lg outline-none"
            />

            <button
              onClick={sendInvite}
              className="bg-green-500 px-6 rounded-lg hover:bg-green-600"
            >
              Invite
            </button>
          </div>
        </div>

        {/* 🔹 MEMBERS */}
        <div className="mb-6">
          <h2 className="text-xl mb-3 text-blue-400">
            Team Members
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : members.length === 0 ? (
            <p className="text-gray-400">
              No members yet
            </p>
          ) : (
            members.map((m, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/10 rounded-lg mb-2 flex justify-between items-center"
              >
                <span>
                  {m.user?.name} ({m.role})
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm">
                    Active
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/team/${i}`, {
                        state: { member: m },
                      })
                    }
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🔹 REQUESTS */}
        <div>
          <h2 className="text-xl mb-3 text-yellow-400">
            Pending Requests
          </h2>

          {requests.length === 0 ? (
            <p className="text-gray-400">
              No pending requests
            </p>
          ) : (
            requests.map((r) => (
              <div
                key={r._id}
                className="p-4 bg-white/5 border border-white/10 rounded-lg mb-2 flex justify-between items-center"
              >
                <span>{r.sender?.name}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => accept(r._id)}
                    className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => reject(r._id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Team;