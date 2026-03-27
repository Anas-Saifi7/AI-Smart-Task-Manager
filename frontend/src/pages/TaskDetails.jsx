import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 🔥 FETCH TASK
  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(res.data);
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // ❌ NO TASK
  if (!task) {
    return (
      <div className="p-6 text-white text-center">
        ❌ No Task Found
      </div>
    );
  }

  // 🔥 STATUS UPDATE
  const updateStatus = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      status,
    });
    fetchTask();
  };

  // 🔥 EDIT SAVE
  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
    setEditMode(false);
    fetchTask();
  };

  // 🔥 DELETE
  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    navigate("/");
  };

  // 💬 COMMENT ADD
  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { user: "You", text: newComment }]);
    setNewComment("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-4 py-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 mb-6"
        >
          ← Back
        </button>

        {/* MAIN CARD */}
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

          {/* TITLE */}
          {editMode ? (
            <input
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
              className="w-full p-2 bg-black mb-2"
            />
          ) : (
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
          )}

          {/* DESCRIPTION */}
          {editMode ? (
            <textarea
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="w-full p-2 bg-black mb-4"
            />
          ) : (
            <p className="text-gray-400 mb-6">{task.description}</p>
          )}

          {/* INFO GRID */}
          <div className="grid sm:grid-cols-2 gap-4">

            <Card
              title="Assigned To"
              value={
                task.assignedTo?.name
                  ? `${task.assignedTo.name} (${task.assignedTo.email})`
                  : task.assignedTo
              }
            />
            <Card title="Deadline" value={task.deadline?.slice(0,10)} />

            {/* STATUS */}
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-gray-400 mb-2">Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-black p-2"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button
                onClick={updateStatus}
                className="mt-2 bg-green-500 px-3 py-1 rounded"
              >
                Save Status
              </button>
            </div>

            <Card title="Priority" value={task.priority} />

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 px-5 py-2 rounded-lg"
              >
                Edit Task
              </button>
            ) : (
              <button
                onClick={saveEdit}
                className="bg-green-500 px-5 py-2 rounded-lg"
              >
                Save
              </button>
            )}

            <button
              onClick={deleteTask}
              className="bg-red-500/20 text-red-400 px-5 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>

          {/* COMMENTS */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Comments 💬</h3>

            <div className="space-y-3 mb-4">
              {comments.map((c, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-lg">
                  <p className="text-sm font-semibold">{c.user}</p>
                  <p className="text-gray-400 text-sm">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-black px-3 py-2"
              />
              <button
                onClick={addComment}
                className="bg-green-500 px-4"
              >
                Send
              </button>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white/5 p-4 rounded-xl">
    <p className="text-gray-400">{title}</p>
    <p>{value}</p>
  </div>
);

export default TaskDetails;