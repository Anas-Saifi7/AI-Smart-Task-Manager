import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-[#020617] text-white">

      {/* HERO */}
      <section className="py-24 px-6 text-center relative overflow-hidden">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Manage Tasks with <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AI Smart System
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Organize tasks, collaborate with your team, and boost productivity
            with real-time AI-powered task management.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link to="/register">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-lg hover:scale-105 transition">
                Get Started 🚀
              </button>
            </Link>

            <Link to="/login">
              <button className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition">
                Login
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Powerful Features
          </h2>

          <p className="text-center text-gray-400 mt-3">
            Everything you need in one platform
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <Feature title="Task Management" desc="Create and track tasks easily" />
            <Feature title="Team Collaboration" desc="Work with your team in real time" />
            <Feature title="Real-time Updates" desc="Live notifications & sync" />
            <Feature title="AI Suggestions" desc="Smart AI task recommendations" />
            <Feature title="Notifications" desc="Stay updated always" />
            <Feature title="Analytics" desc="Track productivity insights" />

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white/5">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Step number="01" title="Create Account" desc="Sign up in seconds" />
            <Step number="02" title="Add Tasks" desc="Assign tasks to team" />
            <Step number="03" title="Track Progress" desc="Monitor everything" />

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to boost productivity?
        </h2>

        <p className="text-gray-400 mt-3">
          Join now and experience smart task management
        </p>

        <Link to="/register">
          <button className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 px-8 py-3 rounded-lg hover:scale-105 transition">
            Create Free Account
          </button>
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © 2026 TaskCollab | Built by Anas 🚀
      </footer>

    </div>
  );
};

/* FEATURE CARD */
const Feature = ({ title, desc }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 
    hover:scale-105 transition">

      <CheckCircle className="text-green-400 mb-4" size={28} />

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2 text-sm">{desc}</p>

    </div>
  );
};

/* STEP CARD */
const Step = ({ number, title, desc }) => {
  return (
    <div>
      <div className="text-3xl font-bold text-green-400">
        {number}
      </div>

      <h3 className="text-lg font-semibold mt-3">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {desc}
      </p>
    </div>
  );
};

export default Home;