import Link from "next/link";

const ProductCard = ({ product }) => {
  // Convert English numbers to Bangla numbers
  const toBanglaNumber = (number) => {
    if (number === null || number === undefined) {
      return "";
    }

    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return number.toString().replace(/\d/g, (number) => {
      return banglaNumbers[Number(number)];
    });
  };

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex h-full cursor-pointer flex-col justify-between rounded-xl bg-white p-4 shadow-sm transition duration-200 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100/80 p-1 text-xl shadow-inner">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0 flex-1">
            <span className="hidden">{product.categoryNameBn}</span>

            <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {product.nameBn}
            </h3>

            <p className="text-xs text-gray-400">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between pt-0">
          <div>
            <p className="text-xs leading-none text-gray-400">আজকের দাম</p>

            <p className="mt-1 text-base font-black leading-none text-gray-900 sm:text-lg">
              {toBanglaNumber(product.today)} টাকা
            </p>
          </div>

          <div
            className={`flex items-center gap-1 bg-transparent p-0 text-xs font-bold ${
              isUp
                ? "text-red-500"
                : isDown
                  ? "text-emerald-600"
                  : "text-gray-400"
            }`}
          >
            {isUp && "▲ "}
            {isDown && "▼ "}
            {toBanglaNumber(product.change?.pct)}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
