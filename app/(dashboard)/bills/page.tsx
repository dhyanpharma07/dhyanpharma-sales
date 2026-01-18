"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Pencil, Plus } from "lucide-react";

type Bill = {
  id: string;
  billNumber: string;
  billDate: string;
  billAmount: string;
  customer: {
    name: string;
  };
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SalesBillListPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [month, setMonth] = useState<string>("all");
  const [year, setYear] = useState<string>("all");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/bills")
      .then((res) => res.json())
      .then(setBills);
  }, []);

  function handleEdit(billId: string) {
    const ok = window.confirm("Are you sure you want to edit this bill?");
    if (ok) router.push(`/bills/${billId}/edit`);
  }

  /* ------------------ FILTER LOGIC ------------------ */
  const years = useMemo(() => {
    const ys = bills.map((b) =>
      new Date(b.billDate).getFullYear().toString()
    );
    return Array.from(new Set(ys)).sort();
  }, [bills]);

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const date = new Date(bill.billDate);
      const billMonth = date.getMonth().toString();
      const billYear = date.getFullYear().toString();

      return (
        (month === "all" || billMonth === month) &&
        (year === "all" || billYear === year)
      );
    });
  }, [bills, month, year]);

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + Number(bill.billAmount),
    0
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Sales Bills
      </h1>

      {/* Filters + Add */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center gap-3">
          {/* Month */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Months</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i.toString()}>
                {m}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/bills/new"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Sales Bill
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Bill No
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Customer
              </th>
              <th className="px-4 py-3 text-right font-medium">
                Amount (₹)
              </th>
              <th className="px-4 py-3 text-center font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredBills.map((bill) => (
              <tr
                key={bill.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={() => router.push(`/bills/${bill.id}`)}
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {bill.billNumber}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {new Date(bill.billDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {bill.customer.name}
                </td>
                <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-200">
                  ₹{Number(bill.billAmount).toFixed(2)}
                </td>
                <td
                  className="px-4 py-3 text-center space-x-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    title="View Bill"
                    onClick={() => router.push(`/bills/${bill.id}`)}
                    className="text-green-600 hover:text-green-700 dark:text-green-400"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    title="Edit Bill"
                    onClick={() => handleEdit(bill.id)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredBills.length > 0 && (
              <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                <td className="px-4 py-3" colSpan={3}>
                  Total
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{totalAmount.toFixed(2)}
                </td>
                <td />
              </tr>
            )}

            {filteredBills.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No bills found for selected period
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
