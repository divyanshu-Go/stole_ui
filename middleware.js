import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/token";

export async function middleware(request) {
  const protectedPaths = ["/add-component", "/profile", "/admin-profile"];
  const adminOnlyPaths = ["/admin-profile"];
  const guestOnlyPaths = ["/login", "/signup"];

  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAdminPath = adminOnlyPaths.some(path => pathname.startsWith(path));
  const isGuestPath = guestOnlyPaths.some(path => pathname.startsWith(path));

  const token = request.cookies.get("auth_token")?.value;

  // 🚫 Redirect logged-in users away from guest-only paths (login/signup)
  if (token && isGuestPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Allow access if path is not protected
  if (!isProtectedPath) return NextResponse.next();

  // 🔐 Redirect to login if accessing a protected route without a token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🛡️ Verify token and check role
  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = payload.user?.role || payload.role;

    // 🚫 Block non-admins from admin-only paths
    if (isAdminPath && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
