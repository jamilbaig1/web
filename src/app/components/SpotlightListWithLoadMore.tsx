"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Spotlight, SpotlightCategory } from "../../types/spotlight";
import Link from "next/link";

export default function SpotlightListWithLoadMore({ allSpotlights, categories = [] , all }: { allSpotlights: Spotlight[], categories?: SpotlightCategory[] , all?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const showall = all;

  const handleLoadMore = () => {
    startTransition(() => {
      setVisibleCount((prev) => prev + 3);
    });
  };

  // Filter spotlights by search and category
  const filteredSpotlights = allSpotlights.filter(spotlight => {
    const matchesSearch = spotlight.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || (spotlight.category?._id === selectedCategory);
    return matchesSearch && matchesCategory;
  });
  const spotlights = filteredSpotlights.slice(0, visibleCount);
  const allLoaded = visibleCount >= filteredSpotlights.length;

  return (
    <>
      {/* Search and Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] gap-4 mb-8">
        <div className="relative flex items-center w-full min-w-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
          </span>
          <input
            type="text"
            placeholder="Search Spotlight"
            value={search}
            onChange={e => { setSearch(e.target.value); setVisibleCount(3); }}
            className="w-full border border-gray-300 rounded px-4 py-2 pl-10 focus:outline-none focus:ring-0 focus:border-gray-300 hover:border-gray-300 text-base sm:text-base md:text-lg"
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className="relative min-w-0">
          <button
            type="button"
            className="w-full px-4 py-2 border border-[#f97316] rounded text-[#f97316] font-semibold bg-white hover:bg-[#f97316] hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 text-base sm:text-base md:text-lg"
            onClick={() => setShowCategories(v => !v)}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{display: 'inline'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" /></svg>
            <span style={{display: 'inline'}}>Filter by Category</span>
          </button>
          {showCategories && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow max-h-60 overflow-y-auto">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCategory === null ? 'font-bold' : ''}`}
                onClick={() => { setSelectedCategory(null); setShowCategories(false); setVisibleCount(3); }}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat._id}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCategory === cat._id ? 'font-bold' : ''}`}
                  onClick={() => { setSelectedCategory(cat._id); setShowCategories(false); setVisibleCount(3); }}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '32px' }} className="grid grid-cols-1 gap-6 mb-10
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        ">
        {spotlights.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">No Spotlight Found</div>
        ) : (
          spotlights.map((spotlight) => (
            <div key={spotlight._id} className="bg-white shadow rounded overflow-hidden flex flex-col h-full p-0 sm:p-0 md:p-0">
              {spotlight.image && (
                <div className="w-full">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover block"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{spotlight.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                  {spotlight.category && (
                    <span
                      className="text-xs py-1"
                      style={{ color: '#f97316' }}
                    >
                      {spotlight.category.title}
                    </span>
                  )}
                </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 my-2">
                    {spotlight.description.split(" ").slice(0, 20).join(" ")}
                    {spotlight.description.split(" ").length > 20 && "..."}
                  </p>

                {spotlight.offerText && (
                  <div className="inline-block px-2 py-1 my-3 sm:px-3 sm:py-1 sm:my-4" style={{ background: '#e6f9ed', color: '#1ca97c', borderRadius: '8px', fontWeight: 300, fontSize: '14px' }}>
                    {spotlight.offerText}
                  </div>
                )}
                <a
                  href={spotlight.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center text-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#f97316] text-white rounded font-semibold text-sm sm:text-base hover:bg-[#ea700a] transition-colors duration-200"
                  style={{ textDecoration: 'none', borderColor: '#f97316', borderWidth: 1, borderStyle: 'solid' }}
                >
                  <span>Visit Website</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {showall ? (
        !allLoaded && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#f97316] text-white rounded font-semibold text-lg flex items-center gap-2 min-w-[180px] justify-center cursor-pointer hover:bg-transparent hover:text-[#f97316] border border-[#f97316] transition-colors duration-200 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isPending ? "Loading..." : "Load More"}
            </button>
          </div>
        )
      ) : (
        <div className="flex justify-center">
          <Link
            href="/local-spotlight"
            className="px-6 py-3 bg-[#f97316] text-white rounded font-semibold text-lg flex items-center gap-2 min-w-[180px] justify-center cursor-pointer hover:bg-transparent hover:text-[#f97316] border border-[#f97316] transition-colors duration-200"
          >
            View All Sportlight
          </Link>
        </div>
      )}
    </>
  );
}
