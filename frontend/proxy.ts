import {NextRequest, NextResponse} from "next/server";

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const response = await fetch("http://localhost:5000/usedb/checkLogin", {
    headers: { cookie: request.headers.get("cookie") || "" }
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }
}

export const config = {
  matcher: ["/components/:path*"]
}