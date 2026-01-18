"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Users,
  PlusCircle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Sales Bills",
      href: "/bills",
      icon: FileText,
    },
    {
      label: "Customers",
      href: "/customers",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <Image
            src="/assets/final-logo.png"
            alt="Dhyan Pharma"
            width={36}
            height={36}
          />
          <div>
            <p className="font-bold text-gray-800">Dhyan Pharma</p>
            <p className="text-xs text-gray-500">Sales Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
