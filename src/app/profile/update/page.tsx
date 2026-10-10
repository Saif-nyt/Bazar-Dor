"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f7f2] px-4 py-16">
        <div className="mx-auto max-w-2xl animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-48 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f3f7f2] px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">👤</div>

          <h1 className="text-xl font-bold text-gray-900">
            তথ্য হালনাগাদ করতে সাইন ইন করুন
          </h1>

          <Link
            href="/signin"
            className="mt-5 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setIsSaving(true);

    const result = await authClient.updateUser({
      name: newName,
    });

    setIsSaving(false);

    if (result.error) {
      toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
      return;
    }

    toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-[#f3f7f2] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold text-green-700">
            বাজার দর
          </p>

          <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            তথ্য হালনাগাদ করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইলে প্রদর্শিত নাম পরিবর্তন করুন।
          </p>
        </div>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={user.name || "আপনার নাম লিখুন"}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
              </button>

              <Link
                href="/profile"
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                প্রোফাইলে ফিরে যান
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default UpdateProfilePage;
