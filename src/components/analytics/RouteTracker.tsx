"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

/**
 * Tracks the previous pathname across client-side navigations and stores it in
 * sessionStorage under the key "prevPath". The booth detail page reads this to
 * populate the `referral` field of view events.
 *
 * Writes happen synchronously during render so that child pages mounting on a
 * route change can read the previous path inside their mount effects — child
 * effects fire before parent effects, so an effect-based write would be too late.
 */
export default function RouteTracker() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  if (
    typeof window !== "undefined" &&
    previousPathname.current !== pathname
  ) {
    if (previousPathname.current !== null) {
      try {
        sessionStorage.setItem("prevPath", previousPathname.current);
      } catch {
      }
    }
    previousPathname.current = pathname;
  }

  return null;
}
