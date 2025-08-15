"use client";
import React from "react";
import { FiDollarSign, FiMail, FiUsers, FiSend } from "react-icons/fi";
import { FaImage } from "react-icons/fa";

const AdvertisePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 text-black">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="flex justify-center mb-2">
          <FiDollarSign className="w-15 h-15 text-orange-500" />
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
          {/* Card 1 - Newsletter Sponsorship */}
          <div className="bg-[#F8FAFC] shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <FiMail className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Newsletter Sponsorship</h3>
            <p className="text-gray-600 text-sm">
              Feature your business in our popular weekly newsletter, reaching
              engaged local readers directly in their inbox.
            </p>
          </div>

          {/* Card 2 - Website Banner Ads */}
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

          {/* Card 3 - Sponsored Content */}
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

      {/* Get in Touch */}
      <div className="mt-16 max-w-2xl mx-auto px-4 bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>

        <p className="text-gray-500 text-center">
          Interested in advertising or sponsorship? Fill out the form below, and
          we&#39;ll get back to you with our media kit and options.
        </p>

        <form>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Business Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Business Name</label>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full border bg-[#F8FAFC] text-gray-700 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
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
