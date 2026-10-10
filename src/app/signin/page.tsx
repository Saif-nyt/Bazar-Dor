"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const onGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
    }
  };

  const onGithubSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
    }
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      console.log("user", { email }, data);
      router.push("/");
    }

    if (error) {
      console.log(error);
      toast.error(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#f0f5f0] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-md">
        
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-black tracking-tight text-[#202a22] sm:text-3xl">
            আবার ফিরে আসুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            সাইন ইন করে আজকের বাজারদর দেখুন।
          </p>
        </div>

        
        <div className="rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
           
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
                className="w-full rounded-xl border border-[#dce5dc] bg-transparent px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-green-800/20 transition hover:bg-green-800 active:scale-[0.99]"
            >
              সাইন ইন করুন
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
              <span className="text-base font-bold text-blue-600">G</span>
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
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
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

export default SignInPage;