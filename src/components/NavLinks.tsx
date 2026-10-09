"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/Types/types";

const NavLinks = ({ category }: { category: Category }) => {
  const pathname = usePathname();
  const href = category.slug?.startsWith("/") ? category.slug : `/categories/${category.slug}`;
  const isActive = pathname === href || pathname === `/category/${category.slug}`;

  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
        isActive
          ? "border-green-600 bg-green-600 text-white shadow-sm font-semibold"
          : "border-gray-50 bg-gray-50 text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      {category.icon}
      {category.nameBn}
    </Link>
  );
};

export default NavLinks;