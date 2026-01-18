"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Plus } from "lucide-react";

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Customers
        </h1>

        <button
          onClick={() => router.push("/customers/new")}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium">
                GST
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Drug License
              </th>
              <th className="px-4 py-3 text-center font-medium">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => router.push(`/customers/${c.id}`)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {c.name}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {c.phone || "—"}
                </td>

                <td className="px-4 py-3">
                  {c.gstNumber ? (
                    <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                      Available
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {c.drugLicense ? (
                    <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                      Available
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td
                  className="px-4 py-3 text-center space-x-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* View */}
                  <button
                    onClick={() => router.push(`/customers/${c.id}`)}
                    title="View Customer"
                    className="text-green-600 hover:text-green-700 dark:text-green-400"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(c.id)}
                    title="Edit Customer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
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
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
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
