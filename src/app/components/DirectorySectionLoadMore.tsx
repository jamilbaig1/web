"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { Directory } from "../../lib/fetchDirectory";
import { DirectoryCategory } from "../../lib/fetchDirectoryCategories";

export default function DirectoryListWithLoadMore({
  allDirectories,
  categories = [],
  all,
}: {
  allDirectories: Directory[];
  categories?: DirectoryCategory[];
  all?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLoadMore = () => {
    startTransition(() => {
      setVisibleCount((prev) => prev + 3);
    });
  };

  // Filter logic
  const filteredDirectories = allDirectories.filter((directory) => {
    const matchesSearch = directory.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || directory.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const directories = filteredDirectories.slice(0, visibleCount);
  const allLoaded = visibleCount >= filteredDirectories.length;

  return (
    <>
      {/* Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search directories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(3);
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

        {/* Filter */}
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
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedCategory === null ? "font-bold text-orange-600" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(null);
                  setShowCategories(false);
                  setVisibleCount(3);
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedCategory === cat._id
                      ? "font-bold text-orange-600"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setShowCategories(false);
                    setVisibleCount(3);
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {directories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No Directory Found
          </div>
        ) : (
          directories.map((directory) => (
            <div
              key={directory._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition duration-200"
            >
              {directory.logo && (
                <Image
                  src={directory.logo}
                  alt={directory.name}
                  width={600}
                  height={300}
                  className="w-full h-44 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-grow">
                {directory.category && (
                  <span className="text-xs font-medium text-orange-500 mb-2">
                    {directory.category.title}
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                  {directory.name}
                </h3>
                <p className="text-sm text-gray-600 flex-grow mb-4">
                  {directory.description.split(" ").slice(0, 20).join(" ")}
                  {directory.description.split(" ").length > 20 && "..."}
                </p>
                <Link
                  href={directory.link}
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold mt-auto hover:gap-3 transition-all duration-200"
                >
                  View
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More / View All */}
      {all ? (
        !allLoaded && (
          <div className="flex justify-center mb-5">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base flex items-center gap-2 min-w-[180px] justify-center hover:bg-transparent hover:text-orange-500 border border-orange-500 transition disabled:opacity-50 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Load More"}
            </button>
          </div>
        )
      ) : (
        <div className="flex justify-center">
          <Link
            href="/directory"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base flex items-center gap-2 min-w-[200px] justify-center hover:bg-transparent hover:text-orange-500 border border-orange-500 transition"
          >
            View All Directories
          </Link>
        </div>
      )}
    </>
  );
}
