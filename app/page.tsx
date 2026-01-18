"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setTotalSales(data.totalSales || 0);
        setTotalBills(data.totalBills || 0);
      });
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-800">
          Dhyan Pharma
        </h1>
        <p className="text-gray-600 mt-1">
          Sales & Receivables Management System
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Internal dashboard to track sales, customers, and outstanding payments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Current Month Sales</p>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            ₹ {totalSales.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            GST inclusive
          </p>
        </div>

        <div className="bg-green-50 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Bills This Month</p>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {totalBills}
          </p>
        </div>

        <div className="bg-yellow-50 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Outstanding Amount</p>
          <p className="text-2xl font-bold text-yellow-700 mt-2">
            ₹ —
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Coming soon
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/bills/new"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            ➕ Add Sales Bill
          </Link>

          <Link
            href="/customers/new"
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
          >
            ➕ Add Customer
          </Link>

          <Link
            href="/bills"
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
          >
            📄 View Sales Bills
          </Link>
        </div>
      </div>
    </div>
  );
}
