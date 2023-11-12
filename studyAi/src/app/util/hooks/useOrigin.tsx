"use client"; // this is Next 13 App Router stuff

import { useEffect, useState } from "react";

export default function useOrigin() {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return origin;
}
