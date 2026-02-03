"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const role = (session?.user as any)?.role ?? "CUSTOMER";
  const isLoggedIn = Boolean(session?.user);

  console.log(role, isLoggedIn);
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              💊
            </div>
            <span className="hidden sm:inline">MediStore</span>
          </Link>

          {/* Search - Desktop */}
          {role === "CUSTOMER" ? (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  className="pl-10 bg-muted"
                />
              </div>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* {role === "CUSTOMER" ? (
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
            ) : null} */}

            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {role === "CUSTOMER" ? (
                    <Link href="/shop" className="font-medium">
                      Shop
                    </Link>
                  ) : (
                    ""
                  )}

                  {role === "SELLER" ? (
                    <>
                      <Link href="/seller/dashboard" className="font-medium">
                        Seller Dashboard
                      </Link>
                    </>
                  ) : (
                    <Link href="/admin" className="font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                  {isLoggedIn ? (
                    <>
                      <Link href="/orders" className="font-medium">
                        Orders
                      </Link>
                      <Link href="/profile" className="font-medium">
                        Profile
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="font-medium">
                        Login
                      </Link>
                      <Link href="/register" className="font-medium">
                        Register
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Menu */}

            <div className="hidden md:flex items-center gap-2">
              {role === "CUSTOMER" ? (
                <Link href="/shop">
                  <Button variant="ghost">Shop</Button>
                </Link>
              ) : null}

              {role === "SELLER" ? (
                <>
                  <Link href="/seller/dashboard" className="font-medium">
                    Seller Dashboard
                  </Link>
                </>
              ) : (
                <Link href="/admin" className="font-medium">
                  Admin Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem disabled className="font-medium">
                      {role === "seller" ? "Seller Dashboard" : "Customer"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {role === "seller" ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/medicines">Inventory</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/orders">Orders</Link>
                        </DropdownMenuItem>
                      </>
                    ) : role === "admin" ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/admin/users">Users</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/admin/orders">Orders</Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/orders">My Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              className="pl-10 bg-muted"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
