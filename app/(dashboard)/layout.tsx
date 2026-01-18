"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Sales Bills", href: "/bills", icon: FileText },
    { label: "Customers", href: "/customers", icon: Users },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu size={20} />
        </button>

        <span className="font-semibold tracking-tight text-gray-900 dark:text-white">
          Dhyan Pharma
        </span>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          shadow-xl
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <Image
            src="/assets/final-logo.png"
            alt="Dhyan Pharma"
            width={36}
            height={36}
            priority
          />

          <div className="flex-1 leading-tight">
            <p className="font-bold text-gray-900 dark:text-white">
              Dhyan Pharma
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sales Dashboard
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
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
                onClick={() => setOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-4 py-2.5 rounded-md
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600" />
                )}

                <Icon
                  size={18}
                  className={`
                    transition-transform
                    group-hover:scale-110
                    ${isActive ? "text-blue-600" : ""}
                  `}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="p-6">{children}</main>
    </div>
  );
}
