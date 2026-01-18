"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="
        inline-flex items-center justify-center
        w-9 h-9 rounded-md
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        hover:bg-gray-200 dark:hover:bg-gray-700
        ring-1 ring-gray-200 dark:ring-gray-700
        transition-all duration-200
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
