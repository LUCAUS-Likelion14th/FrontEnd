import { ApiResponse } from "@/types/home";

const getEnv = (key: string) => {
  const val = process.env[key];
  if (!val || val === "undefined" || val === "null" || val.trim() === "")
    return null;
  return val;
};

const resolveBaseUrl = () => {
  const nextPublicUrl = getEnv("NEXT_PUBLIC_API_URL");
  if (typeof window !== "undefined") {
    return nextPublicUrl || "/api";
  }
  const apiUrl = getEnv("API_URL");
  return apiUrl || nextPublicUrl || "https://lucaus.o-r.kr";
};
const BASE_URL = resolveBaseUrl();

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

function clearAuthAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("nickname");
  window.location.replace("/login");
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
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`);
  }
}

export async function fetcher<T>(
  endpoint: string,
  options?: { revalidate?: number }
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
      localStorage.removeItem("accessToken");
    }
    throw new Error("Unauthorized");
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
  const token = getToken();

  const isFormData = body instanceof FormData;

  const res = await fetch(url, {
    method,
    cache: "no-store",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    ...(body !== undefined && {
      body: isFormData ? body : JSON.stringify(body),
    }),
  });

  if (method === "DELETE" && res.status === 204) {
    return undefined as T;
  }

  // 인증 실패 (401/403) 시 명확한 에러 메시지
  if (res.status === 401 || res.status === 403) {
    const text = await res.text();
    let message = "로그인이 필요합니다.";
    try {
      const json = JSON.parse(text);
      if (json.message) message = json.message;
    } catch {}
    throw new Error(message);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response:", text);
    throw new Error("Invalid response (not JSON)");
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`);
  }

  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
