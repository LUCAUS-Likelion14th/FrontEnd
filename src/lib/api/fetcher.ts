import { ApiResponse } from "@/types/home";

const BASE_URL =
  typeof window === "undefined"
    ? process.env.API_URL
    : "/api";

export async function fetcher<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log("fetching:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

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

  if (!json.success) {
    throw new Error(json.message);
  }

  return json.data;
}
