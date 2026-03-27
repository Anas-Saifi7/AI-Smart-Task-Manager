import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import socket from "../socket"; // ✅ correct place

const TeamChat = () => {
  const API = import.meta.env.VITE_API_URL;
  const location = useLocation();

  const teamId = localStorage.getItem("teamId");
  const localUserId = localStorage.getItem("userId");
  const [localUserName, setLocalUserName] = useState("");

  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(location.state?.user || null);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState({}); // partnerName -> messages[]

  // Load real members for this team
  useEffect(() => {
    const loadMembers = async () => {
      if (!teamId) return;
      try {
        const res = await axios.get(
          `${API}/api/team/team/${teamId}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setMembers(data);

        // Determine currently logged-in user's display name for chat routing
        const me = data.find(
          (m) => String(m?.user?._id) === String(localUserId)
        );
        setLocalUserName(me?.user?.name || "");

        // If navigation didn't provide a partner, pick the first member
        if (!location.state?.user && data[0]?.user) {
          setSelectedUser(data[0].user);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    loadMembers();
  }, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 🔥 SOCKET SETUP
  useEffect(() => {
    if (!teamId) return;

    socket.emit("joinTeam", teamId);

    const handler = (msg) => {
      // message shape (frontend):
      // { text, fromName, toName, senderId }
      const fromName = msg?.fromName;
      const toName = msg?.toName;
      const partnerName =
        toName && localUserName
          ? toName === localUserName
            ? fromName
            : toName
          : msg?.partnerName; // backward compatibility

      if (!partnerName) return;

      // If the message is addressed to me, auto-select the conversation partner
      // so the receiver sees the chat instantly.
      if (toName === localUserName && selectedUser?.name !== partnerName) {
        const partner = members.find(
          (m) => m?.user?.name === partnerName
        );
        if (partner?.user) setSelectedUser(partner.user);
      }

      setChat((prev) => {
        const partnerChats = prev[partnerName] || [];
        return {
          ...prev,
          [partnerName]: [...partnerChats, msg],
        };
      });
    };

    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, [teamId, localUserName, members, selectedUser?.name]);

  // ✅ SEND MESSAGE (FIXED)
  const sendMessage = () => {
    if (!message.trim() || !teamId || !selectedUser || !localUserId) return;

    socket.emit("sendMessage", {
      teamId,
      message: {
        text: message,
        fromName: localUserName,
        toName: selectedUser.name,
        senderId: localUserId,
      },
    });

    setMessage("");
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    chatBox?.scrollTo(0, chatBox.scrollHeight);
  }, [chat]);

  if (!teamId) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#020617] text-white p-6">
          Team not found. Please create/join a team first.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-70px)] bg-[#020617] text-white">

        {/* LEFT USERS */}
        <div className="w-1/3 border-r border-white/10 p-4 overflow-y-auto">

          <h2 className="font-semibold text-lg mb-4">Team 👥</h2>

          {members.map((m, index) => (
            <div
              key={m.user?._id || index}
              onClick={() => setSelectedUser(m.user)}
              className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition
              ${
                selectedUser?.name === m.user?.name
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full 
              bg-gradient-to-r from-green-400 to-blue-500 
              flex items-center justify-center font-bold"
              >
                {m.user?.name?.charAt(0)}
              </div>

              <div>
                <p className="font-medium">{m.user?.name}</p>
                <p className="text-xs text-gray-400">{m.role}</p>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT CHAT */}
        <div className="w-2/3 flex flex-col">

          {/* HEADER */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center font-bold">
              {selectedUser?.name?.charAt(0)}
            </div>

            <div>
              <p className="font-semibold">{selectedUser?.name || "Select a member"}</p>
              <p className="text-xs text-gray-400">Chat</p>
            </div>
          </div>

          {/* CHAT */}
          <div id="chatBox" className="flex-1 p-4 overflow-y-auto space-y-3">
            {(chat[selectedUser?.name] || []).map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-xl text-sm ${
                  msg.senderId === localUserId
                    ? "ml-auto bg-green-500 text-white"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-white/10 flex gap-2 bg-white/5">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 bg-transparent border border-white/10 px-3 py-2 rounded"
            />

            <button
              onClick={sendMessage}
              className="bg-green-500 px-4 rounded"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default TeamChat;