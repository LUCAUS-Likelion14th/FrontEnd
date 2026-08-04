import { ApiResponse } from "@/types/home";

const getEnv = (key: string) => {
  const val = process.env[key];
  if (!val || val === "undefined" || val === "null" || val.trim() === "")
    return null;
  return val;
};

const resolveBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  const apiUrl = getEnv("API_URL");
  const nextPublicUrl = getEnv("NEXT_PUBLIC_API_URL");
  return apiUrl || nextPublicUrl || "https://lucaus.o-r.kr";
};
const BASE_URL = resolveBaseUrl();

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

function clearAuthTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("nickname");
}

function clearAuthAndRedirect() {
  clearAuthTokens();
  window.location.replace("/login");
}

// 동시에 여러 401이 발생해도 refresh 요청은 한 번만 보내도록 singleton 관리
let refreshPromise: Promise<string | null> | null = null;

async function _doRefresh(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const r = await fetch("/api/auth/reissue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    const newToken = data?.accessToken;
    if (!newToken) return null;
    localStorage.setItem("accessToken", newToken);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return newToken;
  } catch {
    return null;
  }
}

async function tryRefreshToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = _doRefresh().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

export async function mutate(
  endpoint: string,
  method: "POST" | "DELETE",
): Promise<void> {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 401) {
    const newToken = await tryRefreshToken();
    if (newToken) {
      const retryRes = await fetch(`/api${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
      });
      if (retryRes.status === 401) {
        clearAuthAndRedirect();
        throw new Error("Unauthorized");
      }
      if (!retryRes.ok) {
        throw new Error(`API error: ${retryRes.status} ${endpoint}`);
      }
      return;
    } else {
      clearAuthAndRedirect();
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`);
  }
}

export async function fetcher<T>(
  endpoint: string,
  // suppressAuthRedirect: 401을 호출부에서 직접 처리하고 싶을 때(예: 로그인 안내 UI를 인라인으로 보여주는 경우) 전역 리다이렉트를 건너뜀
  options?: { revalidate?: number; suppressAuthRedirect?: boolean },
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  const isServer = typeof window === "undefined";

  const init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (isServer && options?.revalidate !== undefined) {
    (init as any).next = { revalidate: options.revalidate };
  } else {
    init.cache = "no-store";
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (error: any) {
    throw new Error(`Fetch failed for URL: "${url}". Cause: ${error.message}`);
  }

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      const newToken = await tryRefreshToken();
      if (newToken) {
        const retryInit: RequestInit = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          cache: "no-store",
        };
        const retryRes = await fetch(url, retryInit);
        if (retryRes.status === 401) {
          if (options?.suppressAuthRedirect) {
            clearAuthTokens();
          } else {
            clearAuthAndRedirect();
          }
          throw new Error("Unauthorized");
        }
        res = retryRes;
      } else {
        if (options?.suppressAuthRedirect) {
          clearAuthTokens();
        } else {
          clearAuthAndRedirect();
        }
        throw new Error("Unauthorized");
      }
    } else {
      throw new Error("Unauthorized");
    }
  }

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response:", text);
    throw new Error(`Invalid response (not JSON) from ${url}`);
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`);
  }

  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function authFetcher<T>(
  endpoint: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  let token = getToken(); // 재할당 가능하도록 let으로 변경

  const isFormData = body instanceof FormData;

  // 재요청 시에도 동일한 설정(헤더, 바디)을 사용하기 위해 함수로 분리
  const createInit = (currentToken: string | null): RequestInit => ({
    method,
    cache: "no-store",
    headers: {
      ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    ...(body !== undefined && {
      body: isFormData ? body : JSON.stringify(body),
    }),
  });

  let res = await fetch(url, createInit(token));

  // --- 추가된 부분: 401(토큰 만료) 발생 시 재발급 및 재요청 로직 ---
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      const newToken = await tryRefreshToken();
      if (newToken) {
        const retryRes = await fetch(url, createInit(newToken));
        if (retryRes.status === 401) {
          clearAuthAndRedirect();
          throw new Error("Unauthorized");
        }
        res = retryRes;
      } else {
        clearAuthAndRedirect();
        throw new Error("Unauthorized");
      }
    } else {
      throw new Error("Unauthorized");
    }
  }
  // -----------------------------------------------------------------

  if (method === "DELETE" && res.status === 204) {
    return undefined as T;
  }

  // 403 에러 처리 (401은 위에서 처리함)
  if (res.status === 403) {
    const text = await res.text();
    let message = "권한이 없습니다.";
    try {
      const json = JSON.parse(text);
      if (json.message) message = json.message;
    } catch {}
    throw new Error(message);
  }

  const text = await res.text();

  if (!res.ok) {
    let message = `오류가 발생했습니다. (${res.status})`;
    try {
      const errJson = JSON.parse(text);
      message = errJson.message || errJson.error || message;
    } catch {}
    throw new Error(message);
  }

  const json: ApiResponse<T> = JSON.parse(text);
  if (!json.success) throw new Error(json.message);
  return json.data;
}
