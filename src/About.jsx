import React, { useState } from "react";
import AboutImage from "./assets/aboutimage.jpg";

function About() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-b from-emerald-50 via-white to-green-100">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex justify-center mb-10 md:mb-0">
          <img
            src={AboutImage}
            alt="Project teamwork illustration"
            className="rounded-2xl shadow-2xl w-4/5 md:w-3/4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-emerald-800 mb-6">
            Group or Solo? The Project Pairing Dilemma
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Faculty often struggle to form <span className="font-semibold text-emerald-600">balanced project teams</span>. 
            Some students thrive in collaborative group settings, while others prefer to work independently.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            This project leverages machine learning to predict whether a student prefers to work <strong>solo</strong> or in a <strong>group</strong> — enabling smarter team assignments that align with personal strengths and social preferences.
          </p>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600 font-bold text-xl">📊</span>
              <span><strong>Target:</strong> teamwork_preference</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600 font-bold text-xl">🧩</span>
              <span><strong>Features:</strong> introversion_extraversion, risk_taking, club_top1, weekly_hobby_hours</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600 font-bold text-xl">🏆</span>
              <span>Helps faculty assign balanced teams with compatible students</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-emerald-800">How It Works</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                  <h4 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                    <span>📂</span>
                    <span>Step 1: Upload Student Data</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Upload a CSV file containing student personality and activity data, including club preferences, hobbies, and teamwork scores.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span>🤖</span>
                    <span>Step 2: AI Model Prediction</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    The model analyzes traits like <strong>introversion-extraversion</strong> and <strong>risk-taking</strong> to predict a student's preferred work mode — solo or group.
                  </p>
                </div>

                <div className="bg-lime-50 rounded-xl p-6 border border-lime-100">
                  <h4 className="text-xl font-bold text-lime-800 mb-3 flex items-center gap-2">
                    <span>🧠</span>
                    <span>Step 3: Insights for Faculty</span>
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Get actionable insights to create balanced, harmonious teams. Faculty can use these predictions to enhance collaboration and performance.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
