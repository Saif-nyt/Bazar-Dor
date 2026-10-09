import ProductCard from "@/components/ProductCard";
import type { Product } from "@/Types/types";

const HomePage = async () => {
  const response = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const products: Product[] = await response.json();


  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0)) 
    .slice(0, 6);


  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0)) 
    .slice(0, 6);

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8">
        
       
        {risers.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-red-600">
                আজ সবচেয়ে বেশি দাম বেড়েছে ▲
              </h2>
              <p className="text-sm text-gray-500">
                যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে
              </p>
            </div>

            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        
        {fallers.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-green-600">
                আজ সবচেয়ে বেশি দাম কমেছে ▼
              </h2>
              <p className="text-sm text-gray-500">
                যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে
              </p>
            </div>

            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        
        <section id="সব-পণ্য">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-800">সব পণ্য</h2>
            <p className="text-sm text-gray-500">
              আজকের বাজারের সকল পণ্যের তালিকা
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;