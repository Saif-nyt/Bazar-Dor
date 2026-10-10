


import React, { Suspense } from "react";
import Link from "next/link";

import NavLink from "@/components/NavLink";
import Marquee from "@/components/Marquee";
import UserInfo from "@/components/UserInfo";
import BanglaDate from "@/components/BanglaDate";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white">
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

              <BanglaDate />
            </div>
          </Link>

          {/* Auth */}
          <UserInfo/>
        </div>

        {/* Categories */}
        
        <Suspense fallback={<div className="h-10 animate-pulse rounded-xl bg-gray-100" />}>
          <NavLink/>
        </Suspense>
        
      </div>
      <Suspense fallback={<div className="h-10 animate-pulse bg-green-50" />}>
        <Marquee/>
      </Suspense>
    </header>
  );
};

export default Navbar;
