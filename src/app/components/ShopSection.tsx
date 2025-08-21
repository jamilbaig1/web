"use client";

import React, { useState } from "react";
import { useCart } from "../components/Context/Context";
import { FiShoppingCart, FiBox, FiLock, FiMail } from "react-icons/fi";
import Toast from "./MessageTost";
import Link from "next/link";

type ShopItem = {
  _id: string;
  title: string;
  price: number;
  desc: string;
  category: string;
  comingsoon: boolean;
  imageUrl?: string;
};

interface ShopSectionProps {
  shopItems: ShopItem[];
}

export default function ShopSection({ shopItems }: ShopSectionProps) {
  const [toasts, setToasts] = useState<{ id: number; message: string ; type: string }[]>([]);
  const { addToCart } = useCart();

  const showToast = (message: string, type : string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message , type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <FiBox className="h-16 w-16 text-orange-500" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
        {shopItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition duration-200"
          >
            {/* Image */}
            <div
              className={`h-44 w-full ${
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
                <FiBox className="text-gray-400 w-12 h-12" />
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Category */}
              <p className="text-sm text-orange-500 font-medium mb-2">
                {item.category}
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 flex-grow mb-4 line-clamp-3">
                {item.desc}
              </p>

              <div className="flex items-center justify-between mt-auto">
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
                    showToast(`${item.title} added to cart!`, 'success');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold text-sm transition
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
          type={toast.type}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}

      {/* Stay Tuned */}
      <div className="bg-gradient-to-r from-yellow-100 via-white to-orange-100 rounded-2xl shadow p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiMail className="h-10 w-10 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Stay Tuned for More!</h3>
        <p className="text-gray-600 mb-4 max-w-xl mx-auto">
          We’re always brewing up new ideas for The Local Loop Shop. Sign up for
          our newsletter to be the first to know about new arrivals and special
          offers.
        </p>
        <Link
          href="./newsletter"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Subscribe for Updates
        </Link>
      </div>
    </div>
  );
}
