"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdOutlineVerified } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useCart } from "../components/Context/Context";


<div className="mt-12 flex justify-center">
  <Link
    href="/"
    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium 
               rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg 
               transition-all duration-200"
  >
    <IoArrowBack className="text-lg" /> 
    Back to Home
  </Link>
</div>

import type Stripe from "stripe";
import Link from "next/link";

type InvoiceSession = Stripe.Checkout.Session & {
  line_items?: {
    data: Stripe.LineItem[];
  };
};

export default function SuccessInvoice() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [invoice, setInvoice] = useState<InvoiceSession | null>(null);

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);


  useEffect(() => {
    if (sessionId) {
      fetch(`/api/invoice?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setInvoice(data as InvoiceSession));
    }
  }, [sessionId]);

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-orange-500 animate-pulse">Loading invoice...</p>
      </div>
    );
  }

  return (
    <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl flex flex-col items-center">
      {/* ✅ Success Banner */}
        <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <MdOutlineVerified className="h-16 w-16 text-orange-500" />
            </div>
            <h2 className="text-4xl font-bold text-orange-500">
                Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Thank you for your purchase. Your payment has been successfully confirmed.
            </p>
        </div>

      {/* Invoice */}
        <div className="bg-gray-50 shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-xl p-6 sm:p-8 text-sm">
        {/* Header */}
        <div className=" border-b pb-4 mb-4">
            
            <h1 className="text-2xl font-bold tracking-widest text-center text-orange-500">
                INVOICE
            </h1>
        </div>

        {/* Bill To */}
        <div className="mb-4 pt-4 flex justify-between flex-col md:flex-row gap-1">
            <div>
                <h3 className="font-semibold text-gray-700">Bill To</h3>
                <p className="text-gray-800 text-sm sm:text-base">
                {invoice.customer_details?.name || "Customer Name"}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                {invoice.customer_details?.email}
                </p>
           </div>
            <div className="mt-1 text-xs sm:text-sm text-gray-600 space-y-1">
                <p>
                <span className="font-semibold">Invoice #:</span> 0000
                {invoice.id.slice(-4)}
                </p>
                <p>
                <span className="font-semibold">Invoice Date:</span>{" "}
                {new Date(invoice.created * 1000).toLocaleDateString()}
                </p>
            </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto pt-4">
            <table className="w-full border-collapse mb-4 text-xs sm:text-sm">
            <thead>
                <tr className="bg-orange-100 text-orange-500 rounded-2xl">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-right">Unit Price</th>
                <th className="py-2 px-4 text-left">QTY</th>
                <th className="py-2 px-4 text-right">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {invoice.line_items?.data.map((item , index) => (
                
                <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                >
                    <td className="py-2 px-4">{index+1}</td>
                    <td className="py-2 px-4">{item.description}</td>
                    <td className="py-2 px-4 text-right">$
                    {((item.price?.unit_amount ?? 0) / 100).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4 text-right">
                    ${(item.amount_total! / 100).toFixed(2)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-4">
            <div className="w-full sm:w-2/3 md:w-1/2">
            <div className="flex justify-between py-1 text-xs sm:text-sm">
                <span>Subtotal</span>
                <span>
                $
                {(
                    (invoice.amount_subtotal || invoice.amount_total || 0) / 100
                ).toFixed(2)}
                </span>
            </div>
            
            <div className="flex justify-between py-2 font-bold border-t mt-2 border-black text-orange-600 text-sm sm:text-base">
                <span>Total</span>
                <span>${(invoice.amount_total! / 100).toFixed(2)}</span>
            </div>
            </div>
        </div>
        </div>
        <div className="mt-12 flex justify-center">
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium 
                        rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg 
                        transition-all duration-200"
            >
                <IoArrowBack className="text-lg" /> 
                Back to Home
            </Link>
        </div>
    </div>
  );
}
