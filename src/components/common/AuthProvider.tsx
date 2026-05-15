"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

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
        const token = data?.data?.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
          setAccessToken(token);
          if (data.data.refreshToken && data.data.refreshToken !== token) {
            localStorage.setItem("refreshToken", data.data.refreshToken);
          }
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("nickname");
          fetch("/api/auth/admin", { method: "DELETE" });
          if (window.location.pathname !== "/login") {
            window.location.replace("/login");
          }
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("nickname");
        fetch("/api/auth/admin", { method: "DELETE" });
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      })
      .finally(() => {
        setInitialized();
      });
  }, [setAccessToken, setInitialized]);

  return <>{children}</>;
}
