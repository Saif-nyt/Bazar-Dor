'use client'


import Link from "next/link";
import logo from '../../assets/bazar-hero.png';
import Image from "next/image";
const Hero = () => {
  const today = new Date();

  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-green-100 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className=" inline-block px-3 py-1 text-[10px] sm:text-sm md:text-base font-semibold text-[#006A35] bg-[#E2F0D9] rounded-full">
            {banglaDate}
          </p>

          <h2 className="text-4xl font-black leading-tight text-green-950 sm:text-5xl">
            আজকের বাজার দর,
            <br />
            এক নজরেই জানুন
          </h2>

          <p className="mt-5 max-w-lg text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সব পণ্য দেখুন →
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="text-center">
             <Image src={logo} alt="alt" width={200} height={200} />
              <p className="mt-3 font-bold text-green-800">বাজার দর</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
