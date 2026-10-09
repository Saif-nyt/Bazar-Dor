


import React from "react";
import Link from "next/link";

import NavLink from "@/components/NavLink";
import Marquee from "@/components/Marquee";

const Navbar = () => {
  const today = new Date();

  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-green-100 bg-white">
      <div className="mx-auto max-w-7xl px-4">

        
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-2xl">
              🛒
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500" suppressHydrationWarning>
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Categories */}
        
        <NavLink/>
        <Marquee/>
      </div>
    </header>
  );
};

export default Navbar;

