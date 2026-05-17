import { NextRequest } from "next/server";

const TARGET = process.env.API_URL ?? "https://lucaus.o-r.kr";

async function proxyRequest(request: NextRequest, path: string[]) {
  const search = request.nextUrl.search;
  const url = `${TARGET}/${path.join("/")}${search}`;

  const contentType = request.headers.get("content-type") ?? "";
  const isFormData = contentType.includes("multipart/form-data");

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : isFormData
        ? await request.formData()
        : await request.text();

  const authorization = request.headers.get("authorization");
  const res = await fetch(url, {
    method: request.method,
    cache: "no-store",
    redirect: "manual",
    headers: {
      ...(authorization && { Authorization: authorization }),
      ...(!isFormData && body !== undefined && { "Content-Type": "application/json" }),
    },
    ...(body !== undefined && { body: body as BodyInit }),
  });

  // 백엔드가 302 리다이렉트(인증 필요)를 반환하면 JSON 에러 응답으로 변환
  if (res.status >= 300 && res.status < 400) {
    return new Response(
      JSON.stringify({ success: false, data: null, message: "로그인이 필요합니다." }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const text = await res.text();

  const responseHeaders: Record<string, string> = {
    "Content-Type": res.headers.get("content-type") ?? "application/json",
  };

  if (request.method === "GET") {
    if (authorization) {
      responseHeaders["Cache-Control"] = "private, no-store";
    } else {
      responseHeaders["Cache-Control"] = "no-store";
    }
  }

  return new Response(text || null, {
    status: res.status,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path);
}
