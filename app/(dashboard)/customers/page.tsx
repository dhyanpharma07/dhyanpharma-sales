"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil } from "lucide-react";

type Customer = {
  id: string;
  name: string;
  phone?: string;
  gstNumber?: string;
  drugLicense?: string;
  panNumber?: string;
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  }, []);

  function handleEdit(customerId: string) {
    const ok = window.confirm(
      "Are you sure you want to edit this customer?"
    );
    if (ok) {
      router.push(`/customers/${customerId}/edit`);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>

        <button
          onClick={() => router.push("/customers/new")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Customer
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Phone</th>
              <th className="p-3 text-left font-semibold">GST</th>
              <th className="p-3 text-left font-semibold">Drug License</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => router.push(`/customers/${c.id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="p-3 font-medium">{c.name}</td>

                <td className="p-3 text-gray-600">
                  {c.phone || "—"}
                </td>

                <td className="p-3">
                  {c.gstNumber ? (
                    <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="p-3">
                  {c.drugLicense ? (
                    <span className="inline-block px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                      Available
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="p-3 text-center space-x-3">
                  {/* View */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/customers/${c.id}`);
                    }}
                    title="View Customer"
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(c.id);
                    }}
                    title="Edit Customer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
