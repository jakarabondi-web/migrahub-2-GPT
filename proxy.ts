import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const role = token?.role as string | undefined;

  const isCandidateArea = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");
  const isEmployerArea = pathname.startsWith("/employer");
  const isProtected = isCandidateArea || isEmployerArea;
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Each account type has its own portal — keep candidates and employers
  // from wandering into the wrong one rather than showing them a broken UI.
  if (isCandidateArea && role === "employer") {
    const url = request.nextUrl.clone();
    url.pathname = "/employer";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isEmployerArea && role && role !== "employer") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    const url = request.nextUrl.clone();
    url.pathname = role === "employer" ? "/employer" : "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding", "/employer/:path*", "/login", "/register"],
};
