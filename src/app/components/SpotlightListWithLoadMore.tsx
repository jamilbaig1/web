"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Spotlight, SpotlightCategory } from "../../types/spotlight";
import Link from "next/link";

export default function SpotlightListWithLoadMore({
  allSpotlights,
  categories = [],
  all,
}: {
  allSpotlights: Spotlight[];
  categories?: SpotlightCategory[];
  all?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const showall = all;

  const handleLoadMore = () => {
    startTransition(() => {
      setVisibleCount((prev) => prev + 6);
    });
  };

  // Filter spotlights by search and category
  const filteredSpotlights = allSpotlights.filter((spotlight) => {
    const matchesSearch = spotlight.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || spotlight.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const spotlights = filteredSpotlights.slice(0, visibleCount);
  const allLoaded = visibleCount >= filteredSpotlights.length;

  return (
    <>
      {/* Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Spotlight..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(6);
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 pl-10 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </span>
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            type="button"
             className="w-full px-4 py-2 border border-orange-500 rounded-xl text-orange-500 font-semibold bg-white hover:bg-orange-500 hover:text-white transition flex items-center justify-center gap-2"
            onClick={() => setShowCategories((v) => !v)}
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h18M4 8h16M6 12h12M9 16h6"
              />
            </svg>
            Filter by Category
          </button>

          {showCategories && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow max-h-64 overflow-y-auto">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedCategory === null ? "font-semibold" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(null);
                  setShowCategories(false);
                  setVisibleCount(6);
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === cat._id ? "font-semibold" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setShowCategories(false);
                    setVisibleCount(6);
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spotlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {spotlights.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No Spotlight Found
          </div>
        ) : (
          spotlights.map((spotlight) => (
            <div
              key={spotlight._id}
              className="bg-white shadow rounded-xl overflow-hidden flex flex-col"
            >
              {spotlight.image && (
                <Image
                  src={spotlight.image}
                  alt={spotlight.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {spotlight.title}
                </h3>

                {spotlight.category && (
                  <span className="text-sm text-orange-500 mb-2">
                    {spotlight.category.title}
                  </span>
                )}

                <p className="text-sm text-gray-600 mb-3">
                  {spotlight.description.split(" ").slice(0, 20).join(" ")}
                  {spotlight.description.split(" ").length > 20 && "..."}
                </p>

                {spotlight.offerText && (
                  <div className="inline-block px-3 py-1 mb-4 bg-green-100 text-green-700 rounded-md text-sm">
                    {spotlight.offerText}
                  </div>
                )}

                <a
                  href={spotlight.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg font-medium text-sm hover:bg-orange-600 transition"
                >
                  Visit Website
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More / View All */}
      {showall ? (
        !allLoaded && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base flex items-center gap-2 hover:bg-transparent hover:text-orange-500 border border-orange-500 transition disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Load More"}
            </button>
          </div>
        )
      ) : (
        <div className="flex justify-center">
          <Link
            href="/local-spotlight"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base flex items-center gap-2 hover:bg-transparent hover:text-orange-500 border border-orange-500 transition"
          >
            View All Spotlights
          </Link>
        </div>
      )}
    </>
  );
}
