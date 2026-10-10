import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/Types/types";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBanglaNumber = (number: number | null | undefined): string => {
  if (number === null || number === undefined) {
    return "";
  }

  const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  const absoluteNumber = Math.abs(number);

  return absoluteNumber.toString().replace(/\d/g, (num: string) => {
    const mapped = banglaNumbers[Number(num)];
    return mapped ?? num;
  });
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );
  const data: Product[] = await res.json();

  return (
    <div className="border-t border-green-100 bg-green-50/60">
      <MarqueeText
        className="marquee"
        duration={25}
        direction="right"
        textSpacing="0px"
        pauseOnHover
      >
        {data.map((p) => {
          const isUp = p.change?.dir === "up";
          const isDown = p.change?.dir === "down";

          return (
            <div
              key={p.id}

              className="flex  items-center gap-1 border-r border-green-100 px-6 py-2 text-center"
            >
              <span className="text-lg leading-none">
                {p.image || p.categoryIcon}
              </span>

              <span className="text-sm font-semibold text-gray-900">
                {p.nameBn}
              </span>

              <span className="whitespace-nowrap text-xs text-gray-500">
                {toBanglaNumber(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
              </span>

              <span
                className={`text-xs font-bold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-emerald-600"
                      : "text-gray-400"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {toBanglaNumber(p.change?.pct)}%
              </span>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
