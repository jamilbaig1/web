"use client";

import React, { useEffect, useState } from "react";
import { fetchShopItems } from "@/lib/fetchShopItem";
import type { ShopItem } from "@/lib/fetchShopItem";
import { useCart } from "../components/Context/Context";
import { FiShoppingCart, FiBox, FiLock, FiMail } from "react-icons/fi";
import Toast from "./MessageTost";
import Link from "next/link";

export default function ShopCards() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const { addToCart } = useCart();

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchShopItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch shop items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
          <div className="w-15 h-15 border-4 border-orange-400 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>

    );
  }

  return (
    <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <FiBox className="h-15 w-15 text-orange-500" />
        </div>
        <h2 className="text-4xl font-bold text-orange-500">
          The Local Loop Shop
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Support The Local Loop FL and show your Winter Garden pride with our
          exclusive merchandise. More items coming soon!
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div
              className={`h-48 w-full ${
                item.imageUrl ? "" : "bg-gray-200 flex items-center justify-center"
              }`}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiBox className="text-gray-400 w-10 h-10" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-orange-600 font-semibold mb-3">
                {item.category}
              </p>
              <p className="text-gray-600 flex-grow mb-4">{item.desc}</p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-green-700">
                  {!item.comingsoon && `$${item.price.toFixed(2)}`}
                </span>
                <button
                  disabled={item.comingsoon}
                  onClick={() => {
                    addToCart({
                      id: item._id,
                      name: item.title,
                      price: item.price,
                      qty: 1,
                    });
                    showToast(`${item.title} added to cart!`);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-white font-semibold text-sm transition
                    ${
                      item.comingsoon
                        ? "bg-orange-300 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    }
                  `}
                >
                  {item.comingsoon ? (
                    <>
                      <FiLock /> Coming Soon
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}

      {/* Stay Tuned */}
      <div className="bg-gradient-to-r from-yellow-100 via-white to-orange-100 rounded-lg shadow p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiMail className="h-10 w-10 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Stay Tuned for More!</h3>
        <p className="text-gray-600 mb-4 max-w-xl mx-auto">
          We’re always brewing up new ideas for The Local Loop Shop. Sign up for
          our newsletter to be the first to know about new arrivals and special
          offers.
        </p>
        <Link href='/newsletter' className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded">
          Subscribe for Updates
        </Link>
      </div>
    </div>
  );
}
