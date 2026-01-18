"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";

type Customer = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  gstNumber?: string;
  drugLicense?: string;
  panNumber?: string;
  createdAt: string;
};

type Bill = {
  id: string;
  billNumber: string;
  billDate: string;
  billAmount: string;
};

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const customerRes = await fetch(
        `/api/customers/${customerId}`
      );
      const billsRes = await fetch(
        `/api/bills?customerId=${customerId}`
      );

      const customerData = await customerRes.json();
      const billsData = await billsRes.json();

      setCustomer(customerData);
      setBills(billsData);
      setLoading(false);
    }

    load();
  }, [customerId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading…</p>;
  }

  if (!customer) {
    return <p className="p-6 text-red-600">Customer not found</p>;
  }

  const totalSales = bills.reduce(
    (sum, b) => sum + Number(b.billAmount),
    0
  );

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/customers")}
          className="p-2 rounded hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold">{customer.name}</h1>
          <p className="text-sm text-gray-500">
            Customer since{" "}
            {new Date(customer.createdAt).toLocaleDateString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      {/* CUSTOMER INFO */}
      <div className="bg-white rounded-lg shadow border p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="Phone" value={customer.phone} />
        <Info label="PAN" value={customer.panNumber} />
        <Info label="GST" value={customer.gstNumber} />
        <Info label="Drug License" value={customer.drugLicense} />
        <Info label="Address" value={customer.address} full />
      </div>

      {/* SALES SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Sales" value={`₹ ${totalSales.toLocaleString("en-IN")}`} />
        <Stat title="Total Bills" value={String(bills.length)} />
        <Stat title="Outstanding" value="₹ —" />
      </div>

      {/* CUSTOMER SALES BILLS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Sales Bills
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg border shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Bill No</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-right">Amount (₹)</th>
                <th className="p-3 text-center">View</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/bills/${b.id}`)}
                >
                  <td className="p-3 font-medium">
                    {b.billNumber}
                  </td>
                  <td className="p-3">
                    {new Date(b.billDate).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>
                  <td className="p-3 text-right font-semibold">
                    ₹{" "}
                    {Number(b.billAmount).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <Eye size={16} className="inline text-blue-600" />
                  </td>
                </tr>
              ))}

              {bills.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500"
                  >
                    No sales bills for this customer
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* -------- Helpers -------- */

function Info({
  label,
  value,
  full,
}: {
  label: string;
  value?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium mt-1">
        {value || <span className="text-gray-400">—</span>}
      </p>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 border rounded-lg p-5">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
