"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";

const ProfileForm = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f7f2] px-4 py-16">
        <div className="mx-auto max-w-2xl animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-28 rounded-2xl bg-white" />
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
            আপনার প্রোফাইল দেখতে সাইন ইন করুন
          </h1>

          <a
            href="/signin"
            className="mt-5 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন
          </a>
        </div>
      </main>
    );
  }

  const userInitial = user.name?.charAt(0).toUpperCase() || "U";

  const handleUpdateName = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const newName = name.trim();

    if (!newName) {
      setMessage("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: newName,
      });

      if (result.error) {
        setMessage(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      setName("");
    } catch {
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <main className="min-h-screen bg-[#f3f7f2] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold text-green-700">
            বাজার দর
          </p>

          <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিবর্তন করুন।
          </p>
        </div>

        <section className="mb-5 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-2xl font-bold text-white shadow-sm">
                {userInitial}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  সক্রিয় অ্যাকাউন্ট
                </span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              ↪ সাইন আউট
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              নাম হালনাগাদ করুন
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আপনার প্রোফাইলে প্রদর্শিত নাম পরিবর্তন করতে পারেন।
            </p>
          </div>

          <form onSubmit={handleUpdateName}>
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

            <button
              type="submit"
              disabled={isSaving}
              className="mt-4 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "আপডেট হচ্ছে..." : "নাম হালনাগাদ করুন"}
            </button>

            {message && (
              <p
                aria-live="polite"
                className={`mt-4 text-sm ${
                  message.includes("সফলভাবে")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfileForm;