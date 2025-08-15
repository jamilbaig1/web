"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "../../../types/event";

type Category = {
  _id: string;
  title: string;
};

export default function EventListWithLoadMore({ allEvents, categories = [] }: { allEvents: EventItem[], categories?: Category[] }) {
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

  // Filter events by search and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || (event.categories ?? []).some(cat => cat._id === selectedCategory);
    return matchesSearch && matchesCategory;
  });
  const events = filteredEvents.slice(0, visibleCount);
  const allLoaded = visibleCount >= filteredEvents.length;

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
            placeholder="Search Events"
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
            <span style={{display: 'inline'}}>
              Filter by Category
            </span>
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
      <div style={{ marginTop: '32px' }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {events.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">No Event Found</div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-white shadow rounded overflow-hidden flex flex-col h-full">
              {event.image && (
                <Image
                  src={event.image}
                  alt={event.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(event.categories?.length ?? 0) > 0 &&
                    (event.categories ?? []).map((cat) => (
                      <span
                        key={cat._id}
                        className="text-xs py-1"
                        style={{ color: '#f97316' }}
                      >
                        {cat.title}
                      </span>
                    ))}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">
                  {new Date(event.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-xs md:text-sm text-gray-700 my-4">
                  {event.description ?? ''}
                </p>
                <Link
                  href={event.slug?.current ? `/event/${event.slug.current}` : '#'}
                  className="hover:underline text-xs md:text-sm mb-2 inline-block"
                  style={{ color: '#f97316' }}
                  prefetch={false}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      {!allLoaded && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-[#f97316] text-white rounded font-semibold text-lg flex items-center gap-2 min-w-[180px] justify-center cursor-pointer hover:bg-transparent hover:text-[#f97316] border border-[#f97316] transition-colors duration-200"
            disabled={isPending}
          >
            {isPending && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {isPending ? 'Loading...' : 'Load More Events'}
          </button>
        </div>
      )}
    </>
  );
}
