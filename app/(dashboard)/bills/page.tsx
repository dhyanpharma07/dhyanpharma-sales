"use client";

import { useEffect, useState } from "react";
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

export default function SalesBillListPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/bills")
      .then((res) => res.json())
      .then(setBills);
  }, []);

  function handleEdit(billId: string) {
    const ok = window.confirm("Are you sure you want to edit this bill?");
    if (ok) {
      router.push(`/bills/${billId}/edit`);
    }
  }

  const totalAmount = bills.reduce(
    (sum, bill) => sum + Number(bill.billAmount),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Sales Bills
        </h1>

        <Link
          href="/bills/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Sales Bill
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Bill No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-right">Amount (₹)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/bills/${bill.id}`)}
              >
                <td className="p-3 font-medium">
                  {bill.billNumber}
                </td>
                <td className="p-3">
                  {new Date(bill.billDate).toLocaleDateString()}
                </td>
                <td className="p-3">{bill.customer.name}</td>
                <td className="p-3 text-right">
                  ₹{Number(bill.billAmount).toFixed(2)}
                </td>
                <td
                  className="p-3 text-center space-x-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* View */}
                  <button
                    title="View Bill"
                    onClick={() =>
                      router.push(`/bills/${bill.id}`)
                    }
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    title="Edit Bill"
                    onClick={() => handleEdit(bill.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            {bills.length > 0 && (
              <tr className="bg-gray-100 font-semibold border-t">
                <td className="p-3" colSpan={3}>
                  Total
                </td>
                <td className="p-3 text-right">
                  ₹{totalAmount.toFixed(2)}
                </td>
                <td />
              </tr>
            )}

            {/* Empty State */}
            {bills.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No sales bills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
