import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">

      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

        <p className="text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-300 leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this application, you agree to comply with these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. User Responsibilities
            </h2>
            <p>
              Users must not misuse the platform or engage in harmful activities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Account Security
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Service Modifications
            </h2>
            <p>
              We reserve the right to modify or discontinue services at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not responsible for any damages resulting from service usage.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Terms;