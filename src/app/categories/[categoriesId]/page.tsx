import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { Category, Product } from "../../../Types/types";

type CategoryPageProps = {
  params: Promise<{
    categoriesId: string;
  }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  
  const { categoriesId } = await params;

  
  const categoryResponse = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/categories/${categoriesId}`,
   
  );

  if (!categoryResponse.ok) {
    notFound();
  }

  const category: Category = await categoryResponse.json();

 
  const productsResponse = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoriesId}`,
   
  );

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await productsResponse.json();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="mb-6 text-sm">
          <Link
            href="/"
            className="font-medium text-green-700 transition hover:text-green-800"
          >
            হোম পেজ
          </Link>

          <span className="mx-2 text-gray-400">/</span>

          <span className="text-gray-500">
            {category.nameBn}
          </span>
        </div>

        <section className="mb-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category.icon || "🛒"}
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold text-green-700">
                বাজার দর · ক্যাটাগরি
              </p>

              <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
             {products.length} পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

       
        <section>
          

          <CategoryProducts products={products} />
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;