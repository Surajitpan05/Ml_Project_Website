import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      // Replace with your Formspree endpoint
      const response = await fetch("https://formspree.io/f/your_new_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 px-6 py-16">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Section */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-4">Get in Touch 🌿</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Have questions about <span className="font-semibold text-white">Project Pairing Dilemma</span>?  
              We’d love to hear from you! Drop us a message — we typically respond within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-green-100">support@ProjectPairingDilemma.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-semibold">Feedback</h3>
                  <p className="text-green-100">We value your ideas to improve our platform</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl">🤝</div>
                <div>
                  <h3 className="font-semibold">Collaboration</h3>
                  <p className="text-green-100">Interested in partnering? Let’s connect!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="p-10">
            <h3 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Send a Message ✉️</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-emerald-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Surename Title"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-emerald-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="youremail@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-emerald-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-emerald-200 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-lg font-semibold text-white transition duration-200 ${
                  isLoading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-xl"
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-emerald-800">Message sent successfully!</p>
                  <p className="text-sm text-emerald-700">We’ll get back to you soon.</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-red-800">Something went wrong!</p>
                  <p className="text-sm text-red-700">Please try again later.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
