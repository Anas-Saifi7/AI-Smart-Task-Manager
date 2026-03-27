import React, { useState } from "react";

const HelpCenter = () => {

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const faqs = [
    {
      q: "How to create a task?",
      a: "Go to dashboard → click New Task → fill details."
    },
    {
      q: "How to edit a task?",
      a: "Click task → edit option."
    },
    {
      q: "How to delete a task?",
      a: "Open task → delete button."
    }
  ];

  const filteredFaqs = faqs.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent ✅ (Backend later connect karenge)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">

      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold mb-4">Help Center</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search your problem..."
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 mb-6 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FAQ */}
        <div className="space-y-4">
          {filteredFaqs.map((item, index) => (
            <div key={index} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="text-sm mt-1 text-gray-300">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Contact Support</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 outline-none"
              onChange={(e) => setForm({...form, name: e.target.value})}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 outline-none"
              onChange={(e) => setForm({...form, email: e.target.value})}
            />

            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 outline-none"
              rows="4"
              onChange={(e) => setForm({...form, message: e.target.value})}
            ></textarea>

            <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;