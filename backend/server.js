const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Prevent the whole process from silently dying during dev.
// This will not fix the root cause, but it will surface the stack trace.
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

connectDB();

// 🔥 CREATE SERVER + SOCKET
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ REGISTER USER (FIXED)
  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User registered:", userId);
  });

  // 🔔 SEND INVITE
  socket.on("sendInvite", ({ receiverId, data }) => {
    const socketId = onlineUsers.get(receiverId);

    if (socketId) {
      io.to(socketId).emit("newInvite", data);
    } else {
      console.log("User offline, invite saved in DB");
    }
  });

  // 🔔 TASK ASSIGNED
  socket.on("taskAssigned", ({ receiverId, data }) => {
    const socketId = onlineUsers.get(receiverId);

    if (socketId) {
      io.to(socketId).emit("taskAssigned", data);
    }
  });

  // 🆕 NEW TASK
  socket.on("newTask", (task) => {
    io.emit("taskCreated", task);
  });

  // 🔄 UPDATE TASK
  socket.on("taskUpdated", (task) => {
    io.emit("taskUpdated", task);
  });

  // 💬 CHAT (TEAM ROOM)
  socket.on("joinTeam", (teamId) => {
    socket.join(teamId);
  });

  socket.on("sendMessage", ({ teamId, message }) => {
    io.to(teamId).emit("receiveMessage", message);
  });

  // ❌ DISCONNECT FIX
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

// ROUTES
app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/team", teamRoutes);

// Express error handler (keeps API from crashing on thrown errors)
app.use((err, req, res, next) => {
  console.error("API ERROR:", err);
  res.status(500).json({ message: "Server error", error: err?.message });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});