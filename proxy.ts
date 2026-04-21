import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const hiddenUrl = request.nextUrl.clone();
    hiddenUrl.pathname = pathname.replace(/^\/admin/, "/adminku");
    hiddenUrl.search = search;
    return NextResponse.redirect(hiddenUrl);
  }

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    const hiddenUrl = request.nextUrl.clone();
    hiddenUrl.pathname = pathname.replace(/^\/dashboard/, "/adminku");
    hiddenUrl.search = search;
    return NextResponse.redirect(hiddenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
