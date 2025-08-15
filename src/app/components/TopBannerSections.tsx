"use client";
import React from "react";
import Link from "next/link";

interface TopBannerSectionsProps {
  bgImage: string;
  text: string;
  viewLink?: string;
}

const TopBannerSections: React.FC<TopBannerSectionsProps> = ({
  bgImage,
  text,
  viewLink = "https://google.com",
}) => {
  const trimmedText = text.length > 50 ? text.substring(0, 50) + "..." : text;
  return (
    <div
      className="rounded-md mb-5 max-w-[1200px] mx-auto h-40 flex flex-col items-center gap-5 justify-center px-5"
      style={{
        backgroundImage: `linear-gradient(90deg, #fff 0%, #F97316 100%), url(${bgImage})`,
        backgroundBlendMode: "multiply",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <p className="text-white  font-bold drop-shadow-lg">{trimmedText}</p>
      <Link
        href={viewLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 px-4 py-2 bg-orange-500 text-white font-semibold rounded shadow hover:bg-orange-600 transition"
      >
        View
      </Link>
    </div>
  );
};

export default TopBannerSections;
