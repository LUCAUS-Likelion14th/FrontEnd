/**
 * Reads the previous pathname stored by RouteTracker and maps it to one of the
 * spec's referral values: "home_top3" | "all_list" | "stamp" | "my" | "direct".
 *
 * Safe to call from any client component — returns "direct" on SSR or when no
 * previous path is recorded (first page load, hard refresh, external referrer).
 */
export function getReferralFromPrevPath(): string {
  if (typeof window === "undefined") return "direct";
  let prev: string | null = null;
  try {
    prev = sessionStorage.getItem("prevPath");
  } catch {
    return "direct";
  }
  if (!prev) return "direct";

  if (prev === "/") return "home_top3";
  if (prev === "/booth" || prev.startsWith("/booth?")) return "all_list";
  if (prev === "/stamp" || prev.startsWith("/stamp/") || prev.startsWith("/stamp?")) return "stamp";
  if (prev.startsWith("/mypage/likes")) return "my";
  return "other";
}
