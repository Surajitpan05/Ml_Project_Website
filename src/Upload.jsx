import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsProcessing(true);
    try {
      const response = await axios.post("https://ml-project-website.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server response:", response.data);
      navigate("/dashboard", { state: { students: response.data.students } });
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-3">Upload Your Dataset</h1>
          <p className="text-emerald-700 text-lg">
            Upload your project dataset for smart friendship group analysis
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 📘 Guide Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-5 flex items-center gap-2">
              <span>📘</span>
              <span>Dataset Format Guide</span>
            </h2>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-emerald-700 mb-3 uppercase tracking-wide">
                Expected CSV Format
              </h3>
              <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-emerald-800 leading-relaxed">
                  <code>
{`student_name,skill1,skill2,interest1,interest2,team_preference
Alice,Coding,Leadership,Reading,Music,8
Bob,Design,Art,Gaming,Movies,7
Charlie,Math,Research,Chess,Drawing,9`}
                  </code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-emerald-600 italic">
                Ensure your dataset uses comma-separated values (.csv)
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="text-sm font-semibold text-emerald-800 mb-4 uppercase tracking-wide">
                Important Notes
              </h3>
              <ul className="space-y-3 text-emerald-700">
                <li>• File must be in .csv format</li>
                <li>• Headers must match the expected names</li>
                <li>• "team_preference" should be numeric(1 to any number greater than 1)</li>
                <li>• Avoid missing or inconsistent data</li>
              </ul>
            </div>
          </div>

          {/* 📤 Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 flex flex-col">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <span>📤</span>
              <span>Upload Dataset</span>
            </h2>

            <div className="flex-1 flex flex-col justify-start mt-2">
              {/* File Input */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-emerald-700 mb-2">
                  Select your CSV file
                </label>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-emerald-700 border border-emerald-200 rounded-lg p-3 bg-white file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:font-medium file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer transition-all"
                />

                {/* ✅ Unique File Card */}
                {file && (
                  <div className="mt-4 bg-gradient-to-r from-emerald-50 via-white to-green-50 border border-emerald-200 rounded-xl p-4 shadow-sm flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">📄</div>
                      <div>
                        <p className="font-semibold text-emerald-800">{file.name}</p>
                        <p className="text-sm text-emerald-600">
                          {(file.size / 1024).toFixed(1)} KB • {file.type || "CSV File"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setFile(null)}
                      className="text-sm text-emerald-600 hover:text-emerald-800 font-semibold transition"
                    >
                      ✖ Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={isProcessing}
                className={`w-full text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                  isProcessing
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
                }`}
              >
                {isProcessing ? "Processing Dataset..." : "Upload & Analyze"}
              </button>

              <p className="mt-6 text-center text-sm text-emerald-600">
                The uploaded dataset is processed to identify teamwork preferences, guiding faculty in forming effective project teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
