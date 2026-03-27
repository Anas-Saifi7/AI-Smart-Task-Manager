import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">

      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-gray-300 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-300 leading-relaxed">

          {/* Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect personal details such as name, email, and usage data
              to improve our services and user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. How We Use Data
            </h2>
            <p>
              Your data is used to provide services, improve performance, and
              personalize your experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Data Protection
            </h2>
            <p>
              We implement strong security measures to protect your data and
              ensure confidentiality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Cookies
            </h2>
            <p>
              Cookies help us improve functionality and analyze usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Third-Party Services
            </h2>
            <p>
              We do not share your personal data with third parties without your
              consent, except where required by law.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;