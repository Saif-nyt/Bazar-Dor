import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-10 text-center shadow-sm">
        <p className="text-6xl font-black text-green-700">404</p>

        <h1 className="mt-4 text-2xl font-black text-gray-900">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-green-800/20 transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
