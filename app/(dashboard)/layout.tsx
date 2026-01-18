"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, FileText, Users } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Sales Bills", href: "/bills", icon: FileText },
    { label: "Customers", href: "/customers", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <Image
            src="/assets/final-logo.png"
            alt="Dhyan Pharma"
            width={40}
            height={40}
            priority
          />

          <div className="leading-tight">
            <p className="font-bold text-gray-900 dark:text-white">
              Dhyan Pharma
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sales Dashboard
            </p>
          </div>
        </div>

        {/* Theme toggle row */}
        {/* <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Theme
          </span>
          <ThemeToggle />
        </div> */}

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
