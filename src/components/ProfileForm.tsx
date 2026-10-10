"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

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

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছেন!");
    router.push("/");
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
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-16 w-16 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-2xl font-bold text-white shadow-sm">
                  {userInitial}
                </div>
              )}

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
              তথ্য হালনাগাদ
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আপনার প্রোফাইলে প্রদর্শিত নাম পরিবর্তন করতে পারেন।
            </p>
          </div>

          <Link
            href="/profile/update"
            className="inline-block rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
          >
            আপডেট ইনফরমেশন
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ProfileForm;