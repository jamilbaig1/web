"use client";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import NewsletterBox from "./NewsLetterBox";
import { IoNewspaper } from "react-icons/io5";

const Newsletter: React.FC = () => {
  return (
    <>
      {/* Main Container */}
      <div className="main-content mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-black max-w-5xl">
        {/* Top Card */}
        <div className="bg-gradient-to-b from-orange-50 to-yellow-50 rounded-xl shadow-lg p-6 sm:p-8 lg:p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <span>
              <IoNewspaper size={60} className="text-orange-500" />
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-3">
            Join The Local Loop FL Newsletter
          </h1>
          <p className="text-gray-700 mb-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Be the first to know what’s happening in Winter Garden. Our free
            weekly newsletter is packed with local goodness, delivered straight
            to your inbox every Friday!
          </p>

          {/* Email Subscription Box */}
          <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg shadow-md p-5 sm:p-8 flex flex-col gap-4 lg:gap-6 border border-gray-200">
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                Join Our Weekly Newsletter!
              </p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                Get the latest Winter Garden news, events, and local spotlights
                delivered to your inbox.
              </p>
            </div>

            {/* Subscription iframe component */}
            <NewsletterBox iframeHeight="10px" />
          </div>

          {/* What You'll Get Section */}
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
              What You&apos;ll Get:
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {[
                "Weekly updates on new restaurant openings and reviews.",
                "Spotlights on local businesses and creators.",
                "Curated list of upcoming community events and festivals.",
                "Exclusive insights into Winter Garden happenings.",
                "Special offers and promotions from local partners (coming soon!).",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center bg-[rgb(255,254,246)] rounded-lg p-3 shadow-sm text-gray-600 text-sm sm:text-base"
                >
                  <IoMdCheckmarkCircleOutline className="text-green-500 mr-3 size-6 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-gray-500 text-xs sm:text-sm md:text-base mt-6">
              We respect your privacy. Unsubscribe at any time.
              <br />
              No spam, just local love.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
