import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register"];

function homeFor(role: string | undefined) {
  if (role === "admin") return "/admin";
  if (role === "employer") return "/employer";
  return "/dashboard";
}

function isOwnArea(pathname: string, role: string | undefined) {
  if (role === "admin") return pathname.startsWith("/admin");
  if (role === "employer") return pathname.startsWith("/employer");
  return pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const role = token?.role as string | undefined;

  const isCandidateArea = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");
  const isEmployerArea = pathname.startsWith("/employer");
  const isAdminArea = pathname.startsWith("/admin");
  const isProtected = isCandidateArea || isEmployerArea || isAdminArea;
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Each account type has its own portal — keep everyone in their own
  // lane rather than showing them a UI built for a different role.
  if (isProtected && token && !isOwnArea(pathname, role)) {
    const url = request.nextUrl.clone();
    url.pathname = homeFor(role);
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    const url = request.nextUrl.clone();
    url.pathname = homeFor(role);
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding", "/employer/:path*", "/admin/:path*", "/login", "/register"],
};
