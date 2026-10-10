"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();

  const onGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন আপ করা যায়নি।");
    }
  };

  const onGithubSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন আপ করা যায়নি।");
    }
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email,
      name,
      password,
    });

    if (data) {
      router.push("/");
      console.log("user", { email, name }, data, error);
    }

    if (error) {
      console.log(error);
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f0f5f0] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-md">
       
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-black tracking-tight text-[#202a22] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="name"
              >
                নাম
              </label>

              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-xl border border-[#dce5dc] bg-transparent px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="যেমন: রহিম উদ্দিন"
                required
              />
            </div>

            
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                ইমেইল
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-xl border border-[#dce5dc] bg-transparent px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="you@example.com"
                required
              />
            </div>

            
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                id="password"
                name="password"
                minLength={8}
                className="w-full rounded-xl border border-[#dce5dc] bg-transparent px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
              />
            </div>

            
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="confirmPassword"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                minLength={8}
                className="w-full rounded-xl border border-[#dce5dc] bg-transparent px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="আবার লিখুন"
                required
              />
            </div>

            
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-green-800/20 transition hover:bg-green-800 active:scale-[0.99]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onGoogleSignIn}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50"
            >
              <span className="font-bold text-base text-blue-600">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={onGithubSignIn}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#dce5dc] px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50"
            >
              <span className="text-base">◉</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

      
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;