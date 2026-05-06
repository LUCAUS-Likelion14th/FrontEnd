import { NextRequest } from "next/server";

const TARGET = process.env.API_URL ?? "https://lucaus.o-r.kr";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const search = request.nextUrl.search;
  const url = `${TARGET}/${path.join("/")}${search}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: request.headers.get("authorization") ?? "",
    },
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}