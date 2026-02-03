import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "./app/constants/roles";
import { userService } from "./app/service/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  const sellerBlockedRoutes = ["/cart", "/shop", "/checkout", "/profile"];
  const customerBlockedRoutes = [
    "/admin/categories",
    "/admin/orders",
    "/admin/users",
    "/seller/dashboard",
    "/seller/medicines",
    "/seller/orders",
    "/admin",
  ];
  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isSeller = data.user.role === Roles.seller;
    isCustomer = data.user.role === Roles.customer;
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
  if (isAuthenticated && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isAuthenticated && pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    isSeller &&
    sellerBlockedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  }
  if (
    isCustomer &&
    customerBlockedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/seller/dashboard",
    "/seller/dashboard/:path*",
    "/cart",
    "/shop",
    "/checkout",
    "/profile",
    "/admin/categories",
    "/admin/orders",
    "/admin/users",
    "/seller/dashboard",
    "/seller/medicines",
    "/seller/orders",
    "/admin",
  ],
};
