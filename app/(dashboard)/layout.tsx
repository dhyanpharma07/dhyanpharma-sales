import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 z-20 relative">
        <h2 className="text-xl font-semibold mb-6">Dhyan Pharma</h2>

        <nav className="space-y-3">
          <Link href="/bills/new">
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-700">
              ➕ Add Sales Bill
            </div>
          </Link>

          <Link href="/customers/new">
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-700">
              ➕ Add Customer
            </div>
          </Link>

          <Link href="/bills">
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-700">
              📄 View Sales Bills
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8 relative z-10">{children}</main>
    </div>
  );
}
