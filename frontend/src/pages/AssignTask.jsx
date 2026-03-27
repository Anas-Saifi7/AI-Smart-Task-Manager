import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import socket from "../socket";

const AssignTask = () => {
  const location = useLocation();
  const member = location.state?.member;

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.emit("taskAssigned", {
  receiverId: member.user._id,
  data: {
    message: `New task assigned by Admin 📌`,
  },
});


    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        ...task,
        assignedTo: member.user._id, // 🔥 auto assign
      });

      // 🔥 Real-time update for the assignee's dashboard
      socket.emit("newTask", res.data);

      alert("Task Assigned Successfully ✅");

      setTask({
        title: "",
        description: "",
        priority: "Medium",
        deadline: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error assigning task ❌");
    }
  };

  if (!member) {
    return <div className="text-white p-6">No member selected ❌</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Assign Task to {member.user?.name} 📌
        </h1>

        {/* CARD */}
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl 
        border border-white/10 rounded-2xl p-6 md:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <Input
              label="Task Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task details"
                rows="3"
                className="w-full bg-transparent border border-white/10 
                rounded-lg px-3 py-2 text-white 
                focus:outline-none focus:border-white/30"
                required
              />
            </div>

            {/* ASSIGNED TO (READ ONLY) */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Assigned To
              </label>
              <input
                value={member.user?.name}
                readOnly
                className="w-full bg-white/5 border border-white/10 
                rounded-lg px-3 py-2 text-gray-300"
              />
            </div>

            {/* PRIORITY */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/10 
                rounded-lg px-3 py-2 text-white"
              >
                <option className="bg-black">Low</option>
                <option className="bg-black">Medium</option>
                <option className="bg-black">High</option>
              </select>
            </div>

            {/* DEADLINE */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={task.deadline}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/10 
                rounded-lg px-3 py-2 text-white 
                focus:outline-none focus:border-white/30"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 
              py-2 rounded-lg hover:scale-105 transition"
            >
              Assign Task 🚀
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-400 mb-1 block">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full bg-transparent border border-white/10 
      rounded-lg px-3 py-2 text-white 
      focus:outline-none focus:border-white/30"
    />
  </div>
);

export default AssignTask;