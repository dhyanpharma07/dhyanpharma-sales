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
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    fetch("/api/bills")
      .then((res) => res.json())
      .then(setBills);
  }, []);

  const router = useRouter();

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
    <div>
      <h1 className="text-2xl font-semibold mb-6">Sales Bills</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Bill No</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border text-right">Amount (₹)</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td
                  className="p-3 border cursor-pointer"
                  onClick={() => router.push(`/bills/${bill.id}`)}
                >
                  {bill.billNumber}
                </td>
                <td className="p-3 border">
                  {new Date(bill.billDate).toLocaleDateString()}
                </td>
                <td className="p-3 border">{bill.customer.name}</td>
                <td className="p-3 border text-right">
                  ₹{Number(bill.billAmount).toFixed(2)}
                </td>
                <td className="p-3 border space-x-4">
                  {/* View */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 👈 important
                      router.push(`/bills/${bill.id}`);
                    }}
                    title="View Bill"
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit with confirmation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(bill.id);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {bills.length > 0 && (
              <tr className="bg-gray-100 font-semibold">
                <td className="p-3 border" colSpan={3}>
                  Total
                </td>
                <td className="p-3 border text-right">
                  ₹{totalAmount.toFixed(2)}
                </td>
              </tr>
            )}

            {bills.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
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
