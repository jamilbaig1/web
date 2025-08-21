"use client";

import React, { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsChatSquare } from "react-icons/bs";
import Toast from "./MessageTost";

type ToastType = { id: number; message: string ; type: string };

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    question: "",
    message: "",
  });
  const [toasts, setToasts] = useState<ToastType[]>([]);

  // Toast function
  const showToast = (message: string, type: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message , type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !form.name || !form.email || !form.question || !form.message ){
      showToast("Please fill in all required fields." , 'error' );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ( !emailRegex.test( form.email ) ){
        showToast("Please enter a valid emial address.", 'error');
        return;
    }

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast("Message sent successfully!",'success');
        setForm({ name: "", email: "", question: "", message: "" });
      } else {
       
        showToast("Something went wrong. Please try again.",'error');
      }
    } catch (error) {
      showToast("Network error. Try again later.",'error');
    }
  };

  return (
    <section className="py-16 px-4 text-black">
      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        />
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BsChatSquare className="text-orange-500 text-4xl" />
          </div>
          <h2 className="text-4xl font-bold text-orange-500">Get In Touch</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or a local story to share? We’d love to
            hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form, and our team will get back to you shortly.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Question about..."
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full border border-gray-300 bg-[rgb(248,250,252)] rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Type your message here..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
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
              <h4 className="text-lg font-bold text-gray-800 mb-4">Other Ways to Connect</h4>
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
              <h4 className="text-lg font-bold text-gray-800 mb-4">Follow Our Loop</h4>
              <p className="text-gray-600 text-sm mb-4">
                Stay updated and join the conversation on social media:
              </p>
              <div className="flex space-x-4 text-orange-500 text-md">
                <a href="#" className="hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-3xl p-1 bg-white">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-orange-600 border border-orange-500 hover:border-orange-600 rounded-3xl p-1 bg-white">
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
