"use client";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Script from "next/script";
import { IoNewspaper } from "react-icons/io5";

export interface NewsletterProps {
  iframeWidth?: string;
  iframeHeight?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
  iframeWidth = "100%",
  iframeHeight = "415px",
}) => {
  return (
    <>
      <div className="bg-white">
        {/* Main Container */}
        <div className="main-content mx-auto px-5 py-16 text-black max-w-5xl">
          {/* Top Card */}
          <div className="bg-gradient-to-b mx-0 lg:mx-40 from-orange-50 to-yellow-50 rounded-xl shadow-lg p-8 text-center">
            {/* Image */}
            <div className="flex justify-center mb-4">
                <span>
                    <IoNewspaper size={60} className="text-orange-500" />
                </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-orange-500 mb-2">
              Join The Local Loop FL Newsletter
            </h1>
            <p className="text-gray-700 mb-6">
              Be the first to know what’s happening in Winter Garden. Our free
              weekly newsletter is packed with local goodness, delivered
              straight to your inbox every Friday!
            </p>

            {/* Email Subscription Box */}
            <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg shadow-md p-8 flex flex-col gap-3 lg:gap-6 border border-gray-200">
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">
                  Join Our Weekly Newsletter!
                </p>
                <p className="text-gray-600 text-sm">
                  Get the latest Winter Garden news, events, and local
                  spotlights delivered to your inbox.
                </p>
              </div>

              {/* Subscription iframe */}
              <div className="flex w-full">
                <iframe
                  src="https://subscribe-forms.beehiiv.com/7714b0d6-2799-48b3-add9-8f38209814af"
                  className="beehiiv-embed w-full"
                  data-test-id="beehiiv-embed"
                  style={{
                    width: iframeWidth,
                    height: iframeHeight,
                    margin: "0",
                    borderRadius: "0px",
                    backgroundColor: "transparent",
                    boxShadow: "0 0 #0000",
                    display: "block",

                  }}
                  allow="clipboard-write"
                  title="Subscribe Form"
                ></iframe>
              </div>
            </div>

            {/* What You'll Get Section */}
            <div className="mt-15">
              <h2 className="text-2xl font-bold text-center mb-6">
                What You&apos;ll Get:
              </h2>
              <ul className="space-y-3">
                {[
                  "Weekly updates on new restaurant openings and reviews.",
                  "Spotlights on local businesses and creators.",
                  "Curated list of upcoming community events and festivals.",
                  "Exclusive insights into Winter Garden happenings.",
                  "Special offers and promotions from local partners (coming soon!).",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center bg-[rgb(255,254,246)] rounded-lg p-3 shadow-sm text-gray-500"
                  >
                    <IoMdCheckmarkCircleOutline className="text-green-500 mr-3 size-6" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-center text-gray-500 text-sm mt-6">
                We respect your privacy. Unsubscribe at any time.
                <br />
                No spam, just local love.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beehiiv embed script */}
      <Script
        src="https://subscribe-forms.beehiiv.com/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default Newsletter;
