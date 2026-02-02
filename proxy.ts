import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./app/constants/roles";
import { userService } from "./app/service/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }
  console.log(data);
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdmin && pathname.startsWith("/seller/dashboard")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (!isAdmin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/seller/dashboard",
    "/seller/dashboard/:path*",
  ],
};
