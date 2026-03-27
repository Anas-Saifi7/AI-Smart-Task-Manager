// // import React, { useState } from "react";
// // import Navbar from "../components/Navbar";
// // import { FaUserPlus } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";

// // const Team = () => {
// //   const navigate = useNavigate();

// //   const [openModal, setOpenModal] = useState(false);

// //   const [members, setMembers] = useState([
// //     { name: "Anas", role: "Admin", status: "Online" },
// //     { name: "Ali", role: "Developer", status: "Offline" },
// //     { name: "Sara", role: "Designer", status: "Online" },
// //   ]);

// //   const [form, setForm] = useState({
// //     name: "",
// //     role: "",
// //   });

// //   const addMember = () => {
// //     if (!form.name || !form.role) return;

// //     setMembers([...members, { ...form, status: "Online" }]);
// //     setForm({ name: "", role: "" });
// //     setOpenModal(false);
// //   };

// //   return (
// //     <>
// //       <Navbar />

// //       <div className="min-h-screen bg-[#020617] text-white px-4 md:px-8 py-6">

// //         {/* HEADER */}
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl md:text-4xl font-semibold">
// //             Team Members 👥
// //           </h1>

// //           <button
// //             onClick={() => setOpenModal(true)}
// //             className="bg-gradient-to-r from-green-500 to-blue-500 
// //             px-5 py-2 rounded-lg flex items-center gap-2 
// //             hover:scale-105 transition"
// //           >
// //             <FaUserPlus /> Add Member
// //           </button>
// //         </div>

// //         {/* MEMBERS GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// //           {members.map((member, index) => (
// //             <div
// //               key={index}
// //               onClick={() => navigate(`/team/${index}`)}
// //               className="bg-white/5 backdrop-blur-xl border border-white/10 
// //               p-6 rounded-2xl hover:scale-105 hover:border-white/20 
// //               transition cursor-pointer"
// //             >

// //               {/* TOP */}
// //               <div className="flex items-center gap-4 mb-4">

// //                 <div className="w-12 h-12 rounded-full 
// //                 bg-gradient-to-r from-green-400 to-blue-500 
// //                 flex items-center justify-center font-bold">
// //                   {member.name.charAt(0)}
// //                 </div>

// //                 <div>
// //                   <h2 className="font-semibold text-lg">{member.name}</h2>
// //                   <p className="text-gray-400 text-sm">{member.role}</p>
// //                 </div>

// //               </div>

// //               {/* STATUS */}
// //               <div className="flex justify-between items-center">

// //                 <div className="flex items-center gap-2 text-sm">
// //                   <span
// //                     className={`w-2.5 h-2.5 rounded-full ${
// //                       member.status === "Online"
// //                         ? "bg-green-400"
// //                         : "bg-gray-500"
// //                     }`}
// //                   ></span>
// //                   <span className="text-gray-400">
// //                     {member.status}
// //                   </span>
// //                 </div>

// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     navigate(`/team/${index}`);
// //                   }}
// //                   className="text-blue-400 text-sm hover:underline"
// //                 >
// //                   View
// //                 </button>

// //               </div>

// //             </div>
// //           ))}

// //         </div>

// //       </div>

// //       {/* MODAL */}
// //       {openModal && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

// //           <div className="w-[350px] md:w-[400px] p-6 rounded-2xl 
// //           bg-[#020617] border border-white/10">

// //             <h2 className="text-xl font-semibold text-center mb-5">
// //               Add Member 👤
// //             </h2>

// //             <div className="space-y-4">

// //               <input
// //                 type="text"
// //                 placeholder="Enter Name"
// //                 value={form.name}
// //                 onChange={(e) =>
// //                   setForm({ ...form, name: e.target.value })
// //                 }
// //                 className="w-full p-3 rounded-lg 
// //                 bg-white/5 border border-white/10 text-white 
// //                 focus:outline-none"
// //               />

// //               <input
// //                 type="text"
// //                 placeholder="Enter Role"
// //                 value={form.role}
// //                 onChange={(e) =>
// //                   setForm({ ...form, role: e.target.value })
// //                 }
// //                 className="w-full p-3 rounded-lg 
// //                 bg-white/5 border border-white/10 text-white 
// //                 focus:outline-none"
// //               />

// //             </div>

// //             <div className="flex justify-between mt-6">

// //               <button
// //                 onClick={() => setOpenModal(false)}
// //                 className="text-gray-400"
// //               >
// //                 Cancel
// //               </button>

// //               <button
// //                 onClick={addMember}
// //                 className="bg-gradient-to-r from-green-500 to-blue-500 
// //                 px-5 py-2 rounded-lg hover:scale-105 transition"
// //               >
// //                 Add
// //               </button>

// //             </div>

// //           </div>

// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Team;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import socket from "../socket";

// const Team = () => {
// const navigate = useNavigate();
//   // ⚠️ Replace with real auth later
//   const userId = "USER_ID_HERE";
//   const teamId = "TEAM_ID_HERE";
//   const useDummy = true; // 🔥 toggle

//   const [members, setMembers] = useState([
//   {
//     user: { name: "Anas" },
//     role: "Admin",
//   },
//   {
//     user: { name: "Ali" },
//     role: "Developer",
//   },
//   {
//     user: { name: "Sara" },
//     role: "Designer",
//   },
// ]);

// const [requests, setRequests] = useState([
//   {
//     _id: "1",
//     sender: { name: "John" },
//   },
//   {
//     _id: "2",
//     sender: { name: "Aman" },
//   },
// ]);
//   const [form, setForm] = useState({
//     email: "",
//     role: "",
//   });

//   const [loading, setLoading] = useState(true);

//   // 🔄 FETCH DATA
//   const fetchData = async () => {
//     try {
//       const memRes = await axios.get(`/api/team/team/${teamId}`);
//       const reqRes = await axios.get(`/api/team/requests/${userId}`);

//       console.log("Members:", memRes.data);
//       console.log("Requests:", reqRes.data);

//       // ✅ SAFE ARRAY SET
//       setMembers(Array.isArray(memRes.data) ? memRes.data : []);
//       setRequests(Array.isArray(reqRes.data) ? reqRes.data : []);

//     } catch (err) {
//       console.error(err);
//       setMembers([]);
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);
//   useEffect(() => {
//   if (!useDummy) {
//     fetchData();
//   } else {
//     setLoading(false);
//   }
// }, []);

//   // 📩 SEND INVITE
// const sendInvite = async () => {
//   try {
//     const res = await axios.post("http://localhost:5000/api/team/invite", {
//       email: form.email,
//       role: form.role,
//       teamId,
//       senderId: userId,
//     });

//     // 🔥 emit real-time
//     socket.emit("sendInvite", {
//       receiverId: res.data.receiverId, // backend se bhejna padega
//       data: {
//         message: "You got a team invite 🔔",
//       },
//     });

//     alert("Invite sent ✅");

//   } catch (err) {
//     console.error(err);
//   }
// };

//   // ✅ ACCEPT
// const accept = async (id) => {
//   try {
//     if (useDummy) {
//       // ✅ dummy accept
//       setRequests((prev) => prev.filter((r) => r._id !== id));

//       const acceptedUser = requests.find((r) => r._id === id);

//       setMembers((prev) => [
//         ...prev,
//         {
//           user: { name: acceptedUser.sender.name },
//           role: "Member",
//         },
//       ]);

//       return;
//     }

//     // 🔥 REAL API
//     await axios.post(`http://localhost:5000/api/team/accept/${id}`);
//     fetchData();

//   } catch (err) {
//     console.error(err);
//   }
// };

//   // ❌ REJECT
// const reject = async (id) => {
//   try {
//     if (useDummy) {
//       setRequests((prev) => prev.filter((r) => r._id !== id));
//       return;
//     }

//     await axios.post(`http://localhost:5000/api/team/reject/${id}`);
//     fetchData();

//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-6">

//         <h1 className="text-3xl font-bold mb-6">Team Management 👥</h1>

//         {/* 🔹 INVITE SECTION */}
//         <div className="bg-white/5 border border-white/10 p-5 rounded-xl mb-6">
//           <h2 className="text-lg mb-3 text-green-400">Invite Member</h2>

//           <div className="flex flex-col md:flex-row gap-3">
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//               className="flex-1 p-3 bg-white/10 rounded-lg outline-none"
//             />

//             <input
//               type="text"
//               placeholder="Role"
//               value={form.role}
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//               className="flex-1 p-3 bg-white/10 rounded-lg outline-none"
//             />

//             <button
//               onClick={sendInvite}
//               className="bg-green-500 px-6 rounded-lg hover:bg-green-600"
//             >
//               Invite
//             </button>
//           </div>
//         </div>

//         {/* 🔹 MEMBERS */}
//      <div className="mb-6">
//   <h2 className="text-xl mb-3 text-blue-400">Team Members</h2>

//   {loading ? (
//     <p className="text-gray-400">Loading...</p>
//   ) : members.length === 0 ? (
//     <p className="text-gray-400">No members yet</p>
//   ) : (
//     members.map((m, i) => (
//       <div
//         key={i}
//         className="p-4 bg-white/5 border border-white/10 rounded-lg mb-2 flex justify-between items-center"
//       >
//         <span>{m.user?.name} ({m.role})</span>

//         <div className="flex items-center gap-3">
//           <span className="text-green-400 text-sm">Active</span>

//           <button
//             onClick={() =>
//               navigate(`/team/${i}`, {
//                 state: { member: m }
//               })
//             }
//             className="text-blue-400 hover:underline text-sm"
//           >
//             View
//           </button>
//         </div>
//       </div>
//     ))
//   )}
// </div>

//         {/* 🔹 REQUESTS */}
//         <div>
//           <h2 className="text-xl mb-3 text-yellow-400">Pending Requests</h2>

//           {requests.length === 0 ? (
//             <p className="text-gray-400">No pending requests</p>
//           ) : (
//             requests.map((r) => (
//               <div
//                 key={r._id}
//                 className="p-4 bg-white/5 border border-white/10 rounded-lg mb-2 flex justify-between items-center"
//               >
//                 <span>{r.sender?.name}</span>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => accept(r._id)}
//                     className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
//                   >
//                     Accept
//                   </button>

//                   <button
//                     onClick={() => reject(r._id)}
//                     className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </>
//   );
// };

// export default Team;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Team = () => {
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
        `http://localhost:5000/api/team/team/${teamId}`
      );

      const reqRes = await axios.get(
        `http://localhost:5000/api/team/requests/${userId}`
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
        "http://localhost:5000/api/team/invite",
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
        `http://localhost:5000/api/team/accept/${id}`
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
        `http://localhost:5000/api/team/reject/${id}`
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