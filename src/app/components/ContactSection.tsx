"use client";

import React from "react";
import { FiMail, FiSend } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsChatSquare } from "react-icons/bs";

const ContactSection = () => {
  return (
    <section className="py-16 px-4 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BsChatSquare className="text-orange-500 size-15" />
          </div>
          <h2 className="text-4xl font-bold text-orange-500">Get In Touch</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or a local story to share? We&#39;d love to
            hear from you!
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Send Us a Message
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form, and our team will get back to you shortly.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Question about..."
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Type your message here..."
                rows={5}
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              ></textarea>
                <button
                    type="submit"
                    className="bg-orange-500 w-full hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition flex items-center justify-center space-x-2"
                >
                    <FiSend className="w-5 h-5" />
                    <span>Send Message</span>
                </button>
            </form>
          </div>

          {/* Other Ways to Connect */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-200 border border-gray-200 rounded-lg shadow p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Other Ways to Connect
              </h4>
              <p className="flex items-start mb-4 text-sm">
                <FiMail className="text-orange-500 w-5 h-5 mr-3 mt-0.5" />
                <span>
                  <strong>Email Us Directly</strong>
                  <br />
                  <a
                    href="mailto:hello@thelocalloopfl.com"
                    className="text-orange-500 hover:underline"
                  >
                    hello@thelocalloopfl.com
                  </a>
                </span>
              </p>
              <p className="flex items-start text-sm">
                <GoLocation className="text-orange-500 w-5 h-5 mr-3 mt-0.5" />
                <span>
                  <strong>Our Community Base</strong>
                  <br />
                  Winter Garden, Florida (Online First!)
                </span>
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-green-50 to-green-200 border border-gray-200 rounded-lg shadow p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Follow Our Loop
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Stay updated and join the conversation on social media:
              </p>
              <div className="flex space-x-4 text-orange-500 text-md">
                <a href="#" className="hover:text-orange-600 border border-orange-500  hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500  hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500  hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500  hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
