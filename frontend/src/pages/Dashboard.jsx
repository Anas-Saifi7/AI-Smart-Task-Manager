import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import socket from "../socket";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaProjectDiagram,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [chat, setChat] = useState([
    { role: "ai", text: "Hey 👋 I'm your AI assistant!" },
  ]);
  const [message, setMessage] = useState("");

  // ✅ USER ID FIX
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    if (!userId) {
      console.log("No userId found ❌");
      return;
    }

    try {
      const res = await axios.get(
       `${API}/api/tasks/user/${userId}`
      );

      setTasks(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 UPDATE STATUS
  const updateStatus = async (task) => {
    try {
      const newStatus =
        task.status === "Completed" ? "Pending" : "Completed";

      const res = await axios.put(
       `${API}/api/tasks/${task._id}` ,
        { status: newStatus }
      );

      socket.emit("taskUpdated", res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ⚡ SOCKET + FETCH
  useEffect(() => {
    fetchTasks();

    // 🆕 NEW TASK
    socket.on("taskCreated", (task) => {
      // Only show tasks that belong to this user
      if (String(task?.assignedTo) !== String(userId)) return;

      setTasks((prev) => {
        const exists = prev.find((t) => t._id === task._id);
        if (exists) return prev;
        return [task, ...prev];
      });
    });

    // 🔄 UPDATE TASK
    socket.on("taskUpdated", (updatedTask) => {
      if (String(updatedTask?.assignedTo) !== String(userId)) return;

      setTasks((prev) =>
        prev.map((t) =>
          t._id === updatedTask._id ? updatedTask : t
        )
      );
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
    };
  }, []);

  // 🤖 AI CHAT
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };

    try {
      const res = await axios.post(
        `${API}/api/ai/insights`,
        {
          message,
          tasks,
        }
      );

      setChat((prev) => [
        ...prev,
        userMsg,
        { role: "ai", text: res.data },
      ]);

      setMessage("");

    } catch (err) {
      console.error(err);
      alert("AI error ❌");
    }
  };

  // 🎤 Voice
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (e) => {
      setMessage(e.results[0][0].transcript);
    };
    recognition.start();
  };

  // 📊 DATA
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completed");

  const stats = [
    // { title: "Projects", value: 3, icon: <FaProjectDiagram />, type: "All" },
    { title: "Tasks", value: tasks.length, icon: <FaTasks />, type: "All" },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      type: "Completed",
    },
    {
      title: "Pending",
      value: pendingTasks.length,
      icon: <FaClock />,
      type: "Pending",
    },
  ];

  // 🔥 FILTER
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  // 📊 DYNAMIC CHART
  const chartData = tasks.reduce((acc, task) => {
    const day = new Date(task.createdAt).toLocaleDateString();

    const found = acc.find((d) => d.day === day);
    if (found) found.tasks += 1;
    else acc.push({ day, tasks: 1 });

    return acc;
  }, []);


  useEffect(() => {
  if (!userId) return;

  socket.emit("register", userId);

  socket.on("newInvite", (data) => {
    alert("New Team Invite 📩");
  });

  return () => {
    socket.off("newInvite");
  };
}, [userId]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white px-6 py-6">

        <h1 className="text-3xl font-bold mb-6">
          AI Smart Dashboard 🚀
        </h1>

        <div className="mb-4 text-sm text-gray-300">
          Logged in as: <span className="text-white">{userName || "Unknown"}</span>
          {userId ? <span className="text-gray-500"> ( {userId.slice(0, 6)}... )</span> : null}
        </div>

        {/* AI INSIGHTS */}
        <div className="bg-white/5 border rounded-2xl p-5 mb-6">
          <p>✅ Completed: {completed}</p>
          <p>⚠️ Pending: {pendingTasks.length}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
          {stats.map((item, i) => (
            <div
              key={i}
              onClick={() => setFilter(item.type)}
              className="bg-white/5 p-5 rounded-xl cursor-pointer hover:scale-105 transition"
            >
              <h2 className="text-2xl">{item.value}</h2>
              <p className="text-gray-400">{item.title}</p>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="bg-white/5 p-5 rounded-xl mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TASK LIST */}
        <div className="bg-white/5 p-5 rounded-xl mb-6">
          <h2 className="mb-4">{filter} Tasks</h2>

          {loading ? (
            <p>Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <p>No tasks found 🚫</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => updateStatus(task)}
                onDoubleClick={() => navigate(`/task/${task._id}`)}
                className="p-3 mb-2 bg-white/10 rounded flex justify-between cursor-pointer"
              >
                <div>
                  <span className="block font-medium">{task.title}</span>
                  <span className="block text-xs text-gray-400">
                    {task.assignedTo?.name
                      ? `Assigned to: ${task.assignedTo.name}`
                      : "Assigned to: -"}
                  </span>
                </div>

                <span
                  className={
                    task.status === "Completed"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* AI CHAT */}
        <div className="bg-white/5 p-5 rounded-xl">
          <h2 className="mb-3">AI Chat 🤖</h2>

          <div className="h-40 overflow-y-auto mb-3 space-y-2">
            {chat.map((c, i) => (
              <div key={i}>{c.text}</div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 bg-black rounded"
            />

            <button onClick={startVoice}>🎤</button>

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;