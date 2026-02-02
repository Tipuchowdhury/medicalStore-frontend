import "better-auth/client";

declare module "better-auth/client" {
  interface User {
    role: "SELLER" | "CUSTOMER" | "ADMIN";
    status: "ACTIVE" | "INACTIVE";
    phone: string | null;
  }

  interface Session {
    user: User;
  }
}
