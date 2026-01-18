"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";

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
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");

  const router = useRouter();

  function loadBills() {
    fetch("/api/bills")
      .then((res) => res.json())
      .then(setBills);
  }

  useEffect(() => {
    loadBills();
  }, []);

  function handleEdit(billId: string) {
    const ok = window.confirm("Are you sure you want to edit this bill?");
    if (ok) router.push(`/bills/${billId}/edit`);
  }

  async function handleDelete(billId: string) {
    const ok = window.confirm(
      "This will permanently delete the bill. Continue?"
    );
    if (!ok) return;

    const res = await fetch(`/api/bills/${billId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadBills();
    } else {
      alert("Failed to delete bill");
    }
  }

  /* ------------------ FILTER + SORT ------------------ */
  const years = useMemo(() => {
    const ys = bills.map((b) =>
      new Date(b.billDate).getFullYear().toString()
    );
    return Array.from(new Set(ys)).sort();
  }, [bills]);

  const filteredBills = useMemo(() => {
    return bills
      .filter((bill) => {
        const date = new Date(bill.billDate);
        const billMonth = date.getMonth().toString();
        const billYear = date.getFullYear().toString();

        return (
          (month === "all" || billMonth === month) &&
          (year === "all" || billYear === year)
        );
      })
      .sort((a, b) => {
        const diff =
          new Date(a.billDate).getTime() -
          new Date(b.billDate).getTime();
        return dateSort === "asc" ? diff : -diff;
      });
  }, [bills, month, year, dateSort]);

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + Number(bill.billAmount),
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Sales Bills
      </h1>

      {/* Filters + Add */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="all">All Months</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i.toString()}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
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
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Sales Bill
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Bill No</th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() =>
                  setDateSort((p) => (p === "asc" ? "desc" : "asc"))
                }
              >
                <span className="inline-flex items-center gap-1">
                  Date
                  {dateSort === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )}
                </span>
              </th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-right">Amount (₹)</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredBills.map((bill) => (
              <tr
                key={bill.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => router.push(`/bills/${bill.id}`)}
              >
                <td className="px-4 py-3 font-medium">
                  {bill.billNumber}
                </td>
                <td className="px-4 py-3">
                  {new Date(bill.billDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {bill.customer.name}
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{Number(bill.billAmount).toFixed(2)}
                </td>

                <td
                  className="px-4 py-3 text-center space-x-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    title="View"
                    onClick={() => router.push(`/bills/${bill.id}`)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    title="Edit"
                    onClick={() => handleEdit(bill.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => handleDelete(bill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredBills.length > 0 && (
              <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                <td colSpan={3} className="px-4 py-3">
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
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No bills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
