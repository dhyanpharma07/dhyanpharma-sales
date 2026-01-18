"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Bill = {
  billNumber: string;
  billDate: string;
  billAmount: string;
  customer: {
    name: string;
    phone?: string;
  };
};

export default function BillDetailPage() {
  const { id } = useParams();
  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    fetch(`/api/bills?id=${id}`)
      .then((res) => res.json())
      .then(setBill);
  }, [id]);

  if (!bill) {
    return <div>Loading bill...</div>;
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">
        Bill: {bill.billNumber}
      </h1>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Date:</strong>{" "}
          {new Date(bill.billDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Customer:</strong> {bill.customer.name}
        </p>
        <p>
          <strong>Amount:</strong> ₹{Number(bill.billAmount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
