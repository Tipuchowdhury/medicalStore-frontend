"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllUsers } from "@/app/service/API/shop-page-api/api";
import { userType } from "@/types/allTypes";

export default function AdminUsersPage() {
  const { data: allUsers, isLoading } = useGetAllUsers();
  console.log(allUsers);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      joinDate: "2024-01-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Seller",
      joinDate: "2024-01-05",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Customer",
      joinDate: "2024-01-08",
      status: "Active",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Seller",
      joinDate: "2023-12-28",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Customer",
      joinDate: "2024-01-12",
      status: "Active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allUsers?.data.filter(
    (u: userType) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u,
      ),
    );
    toast.success("User status updated");
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.status === "Active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Sellers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.role === "Seller").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered?.map((user: userType) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            {/* <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => toggleUserStatus(user.id)}
                              >
                                {user.status === "Active"
                                  ? "Ban User"
                                  : "Unban User"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteUser(user.id)}
                              >
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent> */}
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
