"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  activePattern?: RegExp;
}

interface SidebarProps {
  role: "seller" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const sellerNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/seller/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Medicines",
      href: "/seller/medicines",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Orders",
      href: "/seller/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/seller/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const adminNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const navItems = role === "seller" ? sellerNav : adminNav;

  return (
    <div className="w-64 border-r bg-muted min-h-screen p-6 sticky top-16">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-primary text-primary-foreground",
              )}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
}
