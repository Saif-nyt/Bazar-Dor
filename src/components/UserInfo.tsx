"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

const UserInfo = () => {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    setIsOpen(false);
    window.location.href = "/";
  };

  if (isPending) {
    return (
      <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
    );
  }

  return (
    <div className="relative flex items-center gap-2">
      {user ? (
        <>
    
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-green-50"
            aria-expanded={isOpen}
            aria-label="User menu"
          >
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                {userInitial}
              </span>
            )}

            <span className="hidden max-w-24 truncate text-sm font-semibold text-gray-800 sm:block">
              {user.name}
            </span>

            <span className="text-xs text-gray-500">▾</span>
          </button>

          
          {isOpen && (
            <>
              <button
                aria-label="Close menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                <div className="border-b border-gray-100 px-3 py-3">
                  <p className="truncate font-bold text-gray-900">
                    {user.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  <span>👤</span>
                  আমার প্রোফাইল
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <span>↪</span>
                  সাইন আউট
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;