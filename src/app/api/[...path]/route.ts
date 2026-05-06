import { NextRequest } from "next/server";

const TARGET = process.env.API_URL ?? "https://lucaus.o-r.kr";

function buildUrl(path: string[], search: string) {
  return `${TARGET}/${path.join("/")}${search}`;
}

function forwardHeaders(request: NextRequest) {
  const headers: Record<string, string> = {};
  const auth = request.headers.get("authorization");
  if (auth) headers["authorization"] = auth;
  return headers;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = buildUrl(path, request.nextUrl.search);

  const res = await fetch(url, {
    cache: "no-store",
    headers: forwardHeaders(request),
  });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = buildUrl(path, request.nextUrl.search);

  const res = await fetch(url, {
    method: "POST",
    headers: forwardHeaders(request),
  });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = buildUrl(path, request.nextUrl.search);

  const res = await fetch(url, {
    method: "DELETE",
    headers: forwardHeaders(request),
  });
  const data = await res.json();

  return Response.json(data, { status: res.status });
}
