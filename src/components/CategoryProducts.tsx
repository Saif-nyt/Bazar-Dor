"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/Types/types";

type CategoryProductsProps = {
  products: Product[];
};

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sortOrder, setSortOrder] = useState("default");

  
  const sortedProducts = [...products];

  if (sortOrder === "low-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortOrder === "high-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div>
      
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-bold text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

  
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <div className="mb-4 text-5xl">🛒</div>

          <h2 className="text-xl font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;