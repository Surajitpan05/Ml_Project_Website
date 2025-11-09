import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const students = location.state?.students || [];
  const totalStudents = location.state?.total_students || students.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-16 px-6 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl border border-emerald-100 p-10">
        
        {/* 🌿 Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-3 tracking-tight">
            🌿 The Project Pairing Dilemma
          </h1>
          <p className="text-lg text-emerald-600 max-w-2xl mx-auto leading-relaxed">
            Faculty often struggle to form balanced project teams — this analysis helps predict whether a student prefers working <b>Solo</b> or in a <b>Group</b>.
          </p>
        </div>

        {/* 🧾 Summary */}
        {students.length > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-block bg-emerald-100 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-full shadow-sm font-semibold text-lg">
              👥 Total Students: {totalStudents}
            </div>
          </div>
        )}

        {/* 📊 Data Table */}
        {students.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-emerald-700 text-xl font-semibold">No Data Found</p>
            <p className="text-sm text-emerald-500 mt-2">
              Upload a dataset to view student teamwork preferences.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-emerald-100 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-gradient-to-r from-emerald-100 to-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-emerald-900 font-semibold border-b border-emerald-200">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-emerald-900 font-semibold border-b border-emerald-200">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-emerald-900 font-semibold border-b border-emerald-200">
                    Teamwork Preference
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={i}
                    className={`transition-all duration-300 ${
                      i % 2 === 0 ? "bg-white" : "bg-emerald-50"
                    } hover:bg-emerald-100`}
                  >
                    <td className="px-6 py-3 text-emerald-700 font-medium">{i + 1}</td>
                    <td className="px-6 py-3 text-emerald-800 font-medium">{s.name}</td>
                    <td className="px-6 py-3 font-semibold flex items-center gap-2">
                      {s.teamwork_preference === "Solo" ? (
                        <>
                          <span className="text-lg">🧍</span>
                          <span className="text-amber-700">Solo</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">👥</span>
                          <span className="text-emerald-700">Group</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 🌱 Footer */}
        <div className="text-center mt-12 border-t border-emerald-100 pt-6">
          <p className="text-sm text-emerald-600 italic">
            “Balancing collaboration and independence — one project team at a time.” 🌿
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
