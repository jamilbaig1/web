"use client";

import React, { useState } from "react";
import { useCart } from "../components/Context/Context";
import Toast from "./MessageTost";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="main-content mx-auto px-5 py-13 text-black text-center h-screen">
      <h1 className="text-4xl font-bold mb-6 text-orange-500">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
            >
              <div className="flex flex-col items-start space-y-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">Qty: {item.qty}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    showToast("Item removed from cart");
                  }}
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                clearCart();
                showToast("Cart cleared successfully!");
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Clear Cart
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">
                Total: $
                {cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
              </span>
              <button
                onClick={() => setIsModalOpen(true)} // <-- FIX: opens modal
                className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() =>
            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
          }
        />
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
            <p className="mb-6">Are you sure you want to buy these items?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast("Purchase successful!");
                  clearCart();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
