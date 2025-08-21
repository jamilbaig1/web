"use client";
import React, { useState } from "react";
import { FiDollarSign, FiMail, FiUsers, FiSend } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import Toast from "./MessageTost";

type ToastType = { id: number; message: string , type: string };

const AdvertisePage = () => {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    message: "",
  });
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (message: string , type: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message , type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.businessName || !form.email || !form.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    try {
      const res = await fetch("/api/advertise-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast("Inquiry submitted successfully!" , 'success');
        setForm({ name: "", businessName: "", email: "", message: "" });
      } else {
        showToast("Something went wrong. Please try again.", 'error');
      }
    } catch (error) {
      showToast("⚠️ Network error. Try again later.", 'error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 text-black">
      {/* Toasts */}
        {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="flex justify-center mb-2">
          <FiDollarSign className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold text-orange-500">
          Advertise With Us
        </h1>
        <p className="mt-4 text-gray-600">
          Connect with the Winter Garden community and grow your business by
          partnering with The Local Loop FL.
        </p>
      </div>

      {/* Why Partner Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Why Partner with The Local Loop?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#F8FAFC] shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiMail className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Newsletter Sponsorship
            </h3>
            <p className="text-gray-600 text-sm">
              Feature your business in our popular weekly newsletter, reaching
              engaged local readers directly in their inbox.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8FAFC] shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FaImage className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Website Banner Ads</h3>
            <p className="text-gray-600 text-sm">
              Prominent ad placements on our website, seen by visitors exploring
              local content and events.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8FAFC] shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiUsers className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Sponsored Content & Spotlights
            </h3>
            <p className="text-gray-600 text-sm">
              In-depth articles or dedicated spotlights about your business,
              crafted by our team and shared with our audience.
            </p>
          </div>
        </div>
      </div>

      {/* Get in Touch Form */}
      <div className="mt-16 max-w-2xl mx-auto px-4 bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>

        <p className="text-gray-500 text-center">
          Interested in advertising or sponsorship? Fill out the form below, and
          we&#39;ll get back to you with our media kit and options.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Business Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
              placeholder="Business Name"
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Message */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Tell Us About Your Business & Advertising Goals
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Write message..."
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Button */}
          <div className="text-center w-full">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 w-full rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              <FiSend className="w-5 h-5" />
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertisePage;
