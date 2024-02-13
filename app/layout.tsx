"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setIsDarkMode(storedMode === "true");
    }
  }, []);

  const handleToggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          isDarkMode
            ? "bg-neutral-200 text-slate-800"
            : "bg-neutral-800 text-white"
        }`}>
        <SessionProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar isDarkMode={isDarkMode} handleToggleMode={handleToggleMode} />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
        </SessionProvider>
      </body>
    </html>
  );
}