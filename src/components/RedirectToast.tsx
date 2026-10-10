"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const RedirectToast = () => {
  const searchParams = useSearchParams();
  const protectedRedirect = searchParams.get("protected");
  const authError = searchParams.get("error");

  useEffect(() => {
    if (protectedRedirect === "1") {
      toast("এই পেজে যেতে আপনাকে সাইন ইন করতে হবে।", {
        icon: "🔒",
      });
    }

    if (authError) {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  }, [protectedRedirect, authError]);

  return null;
};

export default RedirectToast;
