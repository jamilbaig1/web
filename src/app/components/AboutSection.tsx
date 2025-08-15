"use client";

import React from "react";
import { FiMapPin, FiEye, FiHeart, FiEdit3 } from "react-icons/fi";
import Link from "next/link";

const GetInvolvedSection = () => {
  return (
    <section className="main-content mx-auto px-6 py-12 text-black">
      <div className="bg-gradient-to-l to-orange-100 via-white from-yellow-100 p-10 rounded-lg shadow-sm mb-12">
        <h2 className="text-4xl text-orange-500 font-bold text-center mb-8">
          How to Get Involved
        </h2>
        <div className="max-w-2xl mx-auto mb-6">
          <p className="text-center text-gray-700 mb-12">
            Connecting you to the vibrant heart of Winter Garden, Florida. Your
            community, your events, your stories – all in one loop.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="text-center">
            <FiMapPin className="text-orange-500 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mission</h3>
            <p className="text-gray-600 mb-4">
              To serve and strengthen the local community by connecting people
              with what matters most — from small businesses and local events
              to hidden gems and everyday happenings. The Local Loop FL exists
              to make it easier for residents to discover, enjoy, and support
              the community they live in — while helping local businesses grow
              and thrive.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <FiEye className="text-green-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vision</h3>
            <p className="text-gray-600 mb-4">
              To build a network of trusted local newsletters and websites
              across Florida that bring people together, support small
              business, and shine a light on the best each area has to offer.
              Our goal is to help every town feel more connected — and to give
              small businesses a voice in a world where they’re often
              overlooked.
            </p>
          </div>

          {/* A Note From Me */}
          <div className="text-center">
            <FiHeart className="text-red-500 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">A Note From Me</h3>
            <p className="text-gray-600 mb-4">
              This isn’t about building a media company. It’s about helping
              neighbors find great places to eat, things to do, and businesses
              worth supporting. It’s about making life just a little easier, a
              little more fun, and a lot more local.
            </p>
            <p className="text-gray-600 mb-4">
              If you love your community, care about small business, or just
              want to be more in the loop — you’re in the right place. The Local
              Loop FL is here for you.
            </p>
          </div>
        </div>
      </div>

      {/* Help Us Improve */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Help Us Improve</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          The Local Loop FL is for the community, by the community. If you have
          feedback, story ideas, or notice an error, please let us know!
        </p>
        <div className="flex items-center justify-center">
        <Link href='/contact'  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
          <FiEdit3 className="w-5 h-5" />
          Share Your Feedback
        </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
