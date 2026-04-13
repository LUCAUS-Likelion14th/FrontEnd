import { ApiResponse } from "@/types/home";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log("fetching:", url);

  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${endpoint}`);
  }
  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message);
  }

  return json.data;
}
