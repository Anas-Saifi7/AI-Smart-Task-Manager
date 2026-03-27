import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import socket from "../socket";

const CreateTask = () => {
  const API = import.meta.env.VITE_API_URL;
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
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

  try {
    const userId = localStorage.getItem("userId");

    const res = await axios.post(
      `${API}/api/tasks`,
      {
        ...task,
        assignedTo: userId, 
      }
    );

    socket.emit("newTask", res.data);

    alert("Task Created ✅");

  } catch (err) {
    console.error(err);
  }
};


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Create New Task 📝
        </h1>

        {/* FORM CARD */}
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

            {/* ASSIGN */}
            <Input
              label="Assign To"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              placeholder="Enter member name"
            />

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
                rounded-lg px-3 py-2 text-white 
                focus:outline-none"
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
              Create Task
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

export default CreateTask;