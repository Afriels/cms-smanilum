import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
