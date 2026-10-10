import React from "react";
import NavLinks from "@/components/NavLinks";
import type { Category } from "@/Types/types";
import { fetchJson } from "@/lib/api";

const NavLink = async () => {
  let categories: Category[] = [];
  try {
    categories = await fetchJson<Category[]>("/categories");
  } catch {
    categories = [];
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1">
      {categories.map((category) => (
        <NavLinks key={category.id || category.slug} category={category} />
      ))}
    </div>
  );
};

export default NavLink;