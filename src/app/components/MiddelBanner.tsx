"use client";
import React from "react";
import Link from "next/link";

interface MiddelBannerProps {
  bgImage: string;
  text: string;
  viewLink?: string;
}

const MiddelBanner: React.FC<MiddelBannerProps> = ({
  bgImage,
  text,
  viewLink = "https://example.com",
}) => {
  return (
    <div
      className="rounded-md mb-5 max-w-[1200px] mx-auto h-40 flex  flex-col items-center gap-5 justify-center px-5"
      style={{
        backgroundImage: `linear-gradient(90deg, #fff 0%, #FACC15 100%), url(${bgImage})`,
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-white text-lg font-bold drop-shadow-lg">{text}</h1>
      <Link
        href={viewLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-yellow-400 text-white font-semibold rounded shadow hover:bg-yellow-500 transition"
      >
        View
      </Link>
    </div>
  );
};

export default MiddelBanner;
