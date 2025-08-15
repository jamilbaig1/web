"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the animation
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-30 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-green-600 transition-all duration-300 transform ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
