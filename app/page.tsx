"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SalesChart from "./components/SalesChart";
import Image from "next/image";

type ChartType = "monthly" | "quarterly" | "yearly";

export default function Home() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);
  const [chartData, setChartData] = useState<
    { label: string; total: number }[]
  >([]);
  const [chartType, setChartType] = useState<ChartType>("monthly");

  /* Load dashboard stats */
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setTotalSales(data.totalSales || 0);
        setTotalBills(data.totalBills || 0);
      });
  }, []);

  /* Load chart data whenever type changes */
  useEffect(() => {
    fetch(`/api/dashboard/sales-chart?type=${chartType}`)
      .then((res) => res.json())
      .then(setChartData);
  }, [chartType]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex items-center gap-4">
        <Image
          src="/assets/final-logo.png"
          alt="Dhyan Pharma"
          width={100}
          height={56}
          className="rounded"
          priority
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dhyan Pharma
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sales & Receivables Management System
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Internal dashboard to track sales, customers, and payments.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-950 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current Month Sales
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">
            ₹ {totalSales.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-500 mt-1">GST inclusive</p>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bills This Month
          </p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {totalBills}
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Outstanding Amount
          </p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mt-2">
            ₹ —
          </p>
          <p className="text-xs text-gray-500 mt-1">Coming soon</p>
        </div>
      </div>

      {/* Sales Chart */}
      <SalesChart
        data={chartData}
        type={chartType}
        onChangeType={setChartType}
      />

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow">
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
            className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ➕ Add Customer
          </Link>

          <Link
            href="/bills"
            className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            📄 View Sales Bills
          </Link>
        </div>
      </div>
    </div>
  );
}
