import { NextRequest } from "next/server";

const TARGET = process.env.API_URL ?? "https://lucaus.o-r.kr";

async function proxyRequest(request: NextRequest, path: string[], method: string) {
  const search = request.nextUrl.search;
  const url = `${TARGET}/${path.join("/")}${search}`;

  const res = await fetch(url, {
    method,
    cache: "no-store",
    headers: {
      Authorization: request.headers.get("authorization") ?? "",
      "Content-Type": "application/json",
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "POST");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "DELETE");
}
