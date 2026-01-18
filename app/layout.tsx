import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhyan Pharma",
  description: "Sales & Receivables Management System",
  icons: {
    icon: "/assets/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen
          bg-gray-100 
          text-gray-900
          dark:bg-gray-950 
          dark:text-gray-100
          transition-colors duration-200
        `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
