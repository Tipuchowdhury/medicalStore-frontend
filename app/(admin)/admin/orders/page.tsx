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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      seller: "PharmaCare Plus",
      date: "2024-01-15",
      amount: 45.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      seller: "HealthFirst Pharmacy",
      date: "2024-01-14",
      amount: 32.5,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      seller: "PharmaCare Plus",
      date: "2024-01-13",
      amount: 28.99,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Alice Williams",
      seller: "MediCare Shop",
      date: "2024-01-12",
      amount: 56.75,
      status: "Delivered",
      items: 4,
    },
    {
      id: "ORD-005",
      customer: "Charlie Brown",
      seller: "HealthFirst Pharmacy",
      date: "2024-01-11",
      amount: 23.45,
      status: "Cancelled",
      items: 2,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">All Orders</h1>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Delivered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "Delivered").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cancelled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "Cancelled").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Seller</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="text-sm">
                              {order.seller}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {order.date}
                            </TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell className="font-semibold">
                              ${order.amount}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {["processing", "shipped", "delivered", "cancelled"].map(
                (status) => (
                  <TabsContent key={status} value={status} className="mt-6">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Seller</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filtered
                              .filter((o) => o.status.toLowerCase() === status)
                              .map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="font-medium">
                                    {order.id}
                                  </TableCell>
                                  <TableCell>{order.customer}</TableCell>
                                  <TableCell className="text-sm">
                                    {order.seller}
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    ${order.amount}
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {order.date}
                                  </TableCell>
                                  <TableCell>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ),
              )}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
