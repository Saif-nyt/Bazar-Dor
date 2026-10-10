import React from "react";
import NavLinks from "@/components/NavLinks";
import type { Category } from "@/Types/types";

const NavLink = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const categories: Category[] = await res.json();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1">
      {categories.map((category) => (
        <NavLinks key={category.id || category.slug} category={category} />
      ))}
    </div>
  );
};

export default NavLink;