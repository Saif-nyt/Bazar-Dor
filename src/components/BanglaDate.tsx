"use client";

import { useState } from "react";

const BanglaDate = () => {
  const [banglaDate] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <p className="text-xs text-gray-500" suppressHydrationWarning>
      {banglaDate}
    </p>
  );
};

export default BanglaDate;
