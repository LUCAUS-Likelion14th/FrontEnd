"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const exp = getTokenExpiry(token);
  if (!exp) return false;
  return exp * 1000 > Date.now() + 10_000;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("adminDenied") === "1") {
      alert("관리자만 접근할 수 있습니다.");
      const url = new URL(window.location.href);
      url.searchParams.delete("adminDenied");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      fetch("/api/auth/admin", { method: "DELETE" }).catch(() => {});
      if (window.location.pathname.startsWith("/admin")) {
        window.location.replace("/");
      }
      setInitialized();
      return;
    }

    const existingToken = localStorage.getItem("accessToken");

    // accessToken이 아직 유효하면 reissue 없이 바로 사용
    if (existingToken && isTokenValid(existingToken)) {
      setAccessToken(existingToken);
      setInitialized();
      return;
    }

    fetch("/api/auth/reissue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const token = data?.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
          setAccessToken(token);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }
        } else if (existingToken) {
          setAccessToken(existingToken);
        } else {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("nickname");
          fetch("/api/auth/admin", { method: "DELETE" });
          if (window.location.pathname !== "/login") {
            window.location.replace("/login");
          }
        }
      })
      .catch(() => {
        if (existingToken) {
          setAccessToken(existingToken);
        }
      })
      .finally(() => {
        setInitialized();
      });
  }, [setAccessToken, setInitialized]);

  return <>{children}</>;
}
