"use client";
import React from "react";
import Link from "next/link";


interface AdItem {
  _id: string;
  imageUrl: string;
  text: string;
  buttonLink?: string;
}

interface SideBarProps {
  sidebar: AdItem[];
}

const SideBar: React.FC<SideBarProps> = ( {sidebar}) => {
  return (
    <aside className="overflow-x-auto lg:overflow-y-auto bg-gray-100 p-3 flex flex-row lg:flex-col gap-5 lg:gap-0 rounded-md ">
      {sidebar.map((item) => (
        <div key={item._id} className="mb-6 flex-shrink-0 lg:flex-shrink">
          {/* Image with Overlay */}
          <div className="relative rounded-md overflow-hidden shadow-md w-48 lg:w-full">
            <img
              src={item.imageUrl}
              alt={item.text}
              className="w-full h-auto"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-end p-3 text-center">
              {/* Ad Text */}
            <p className="text-white text-sm mb-2">
                {item.text.length > 20 ? item.text.slice(0, 20) + "..." : item.text}
            </p>

              {/* Small Button with Icon */}
              <Link
                href={item.buttonLink ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 text-xs rounded shadow hover:bg-orange-600 transition"
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
