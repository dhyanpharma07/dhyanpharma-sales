"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil } from "lucide-react";

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
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sales Bills</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm">
          {/* TABLE HEADER */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left font-semibold">Bill No</th>
              <th className="p-3 text-left font-semibold">Date</th>
              <th className="p-3 text-left font-semibold">Customer</th>
              <th className="p-3 text-right font-semibold">Amount (₹)</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill.id}
                onClick={() => router.push(`/bills/${bill.id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="p-3 font-medium">{bill.billNumber}</td>

                <td className="p-3 text-gray-600">
                  {new Date(bill.billDate).toLocaleDateString("en-IN")}
                </td>

                <td className="p-3">{bill.customer.name}</td>

                <td className="p-3 text-right font-semibold">
                  ₹{" "}
                  {Number(bill.billAmount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td className="p-3 text-center space-x-3">
                  {/* View */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/bills/${bill.id}`);
                    }}
                    title="View Bill"
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(bill.id);
                    }}
                    title="Edit Bill"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {/* TOTAL ROW */}
            {bills.length > 0 && (
              <tr className="border-t bg-gray-100 font-semibold">
                <td className="p-3 text-right" colSpan={3}>
                  Total
                </td>
                <td className="p-3 text-right text-blue-700">
                  ₹{" "}
                  {totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td />
              </tr>
            )}

            {/* EMPTY STATE */}
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
