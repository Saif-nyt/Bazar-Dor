import next from "next/dist/types";
import Link from "next/link";
import type { Product } from "@/Types/types";

export default async function Page({
  params,
}: {
  params: Promise<{ Id: string }>
}) {
  const { Id } = await params

  
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${Id}`)
  const data: Product = await res.json()
  console.log('data is ', data)

  return (
    <div>
      <div className="min-h-screen bg-[#f1f3ee] p-4 md:p-8 text-[#1f2937] font-sans antialiased">
        <div className="max-w-5xl mx-auto space-y-6">

          <nav className="text-sm text-gray-600 flex items-center space-x-2 font-medium">
            <Link href="/" className="hover:underline hover:text-gray-900 transition-colors">হোম</Link>
            <span className="text-gray-400">&gt;</span>
            <Link href={`/categories/${data.category}`} className="hover:underline hover:text-gray-900 transition-colors">
              {data.categoryNameBn}
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link href={`/product/${data.slug}`} className="text-gray-900 font-semibold hover:underline">
              {data.nameBn}
            </Link>
          </nav>

          <div className="bg-[#f8f9f6] rounded-2xl p-6 border border-emerald-900/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-[#e2e7dc] rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                {data.image}
              </div>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{data.nameBn}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  প্রতি {data.unit === 'kg' ? 'কেজি' : data.unit} · <span className="font-medium text-gray-800">{data.categoryNameBn}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  গতকালকের তুলনায় আজ দাম{' '}
                  <span className={data.change.dir === 'up' ? 'text-red-600 font-semibold' : 'text-emerald-700 font-semibold'}>
                    {data.change.dir === 'up' ? 'বেড়েছে' : 'কমেছে'} · {Math.abs(data.today - data.yesterday)} টাকা
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-[#e7ebd9] p-4 rounded-2xl text-center min-w-[150px] w-full md:w-auto border border-emerald-900/10">
              <span className="text-xs font-medium text-gray-600 block mb-1">আজকের দাম</span>
              <span className="text-3xl font-black text-gray-900">{data.today}</span>
              <span className="text-xs text-gray-600 block mt-0.5">টাকা / {data.unit}</span>
              
              <div className={`flex items-center justify-center text-xs font-bold mt-1.5 space-x-1 ${
                data.change.dir === 'up' ? 'text-red-600' : 'text-emerald-700'
              }`}>
                <span>{data.change.dir === 'up' ? '▲' : '▼'}</span>
                <span>{data.change.pct}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">দামের সারসংক্ষেপ</h2>
            
            {(() => {
              const minPrice = Math.min(...data.markets.map(m => m.min));
              const maxPrice = Math.max(...data.markets.map(m => m.max));
              const avgPrice = (data.markets.reduce((acc, m) => acc + ((m.min + m.max) / 2), 0) / data.markets.length).toFixed(1);

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#f8f9f6] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">সর্বনিম্ন দাম</span>
                    <span className="text-2xl font-black text-emerald-700 block my-1">{minPrice} টাকা</span>
                    <span className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</span>
                  </div>

                  <div className="bg-[#f8f9f6] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">সর্বোচ্চ দাম</span>
                    <span className="text-2xl font-black text-red-600 block my-1">{maxPrice} টাকা</span>
                    <span className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</span>
                  </div>

                  <div className="bg-[#f8f9f6] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">গড় দাম</span>
                    <span className="text-2xl font-black text-emerald-800 block my-1">{avgPrice} টাকা</span>
                    <span className="text-xs text-gray-500">প্রতি {data.unit}-এর হিসাবে</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="bg-[#f8f9f6] rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">বাজারভিত্তিক আজকের দাম</h2>

            <div className="overflow-x-auto rounded-xl border border-stone-300/60 bg-[#f4f6f0]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eef1e8] text-gray-600 text-sm font-bold border-b border-stone-300">
                    <th className="py-3.5 px-5">বাজার</th>
                    <th className="py-3.5 px-5">বিভাগ</th>
                    <th className="py-3.5 px-5">সর্বনিম্ন</th>
                    <th className="py-3.5 px-5">সর্বাধিক</th>
                    <th className="py-3.5 px-5 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300/70 text-sm text-gray-800 font-medium">
                  {data.markets.map((item, index) => {
                    const avg = ((item.min + item.max) / 2).toFixed(2);
                    return (
                      <tr key={index} className="hover:bg-[#e8ece0] transition-colors">
                        <td className="py-3.5 px-5 font-bold text-gray-900">{item.market}</td>
                        <td className="py-3.5 px-5 text-gray-700">{item.division}</td>
                        <td className="py-3.5 px-5 text-gray-800">{item.min} টাকা</td>
                        <td className="py-3.5 px-5 text-gray-800">{item.max} টাকা</td>
                        <td className="py-3.5 px-5 text-right font-black text-gray-900">{avg} টাকা</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}