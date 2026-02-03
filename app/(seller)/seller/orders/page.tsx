"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useGetOrderForSeller } from "@/app/service/API/shop-page-api/api";

export default function SellerOrdersPage() {
  const { data: ordersData, isLoading } = useGetOrderForSeller();
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-01-15",
      items: 3,
      amount: 45.99,
      status: "Pending",
      medicine: "Aspirin 500mg",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-01-14",
      items: 2,
      amount: 32.5,
      status: "Shipped",
      medicine: "Cough Syrup, Vitamin C",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2024-01-13",
      items: 1,
      amount: 28.99,
      status: "Processing",
      medicine: "Bandage Box",
    },
    {
      id: "ORD-004",
      customer: "Alice Williams",
      date: "2024-01-12",
      items: 4,
      amount: 56.75,
      status: "Delivered",
      medicine: "Multiple items",
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
    toast.success("Order status updated");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="seller" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Orders</h1>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {order.date}
                            </TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell className="font-semibold">
                              ${order.amount}
                            </TableCell>
                            <TableCell>
                              <Select
                                defaultValue={order.status}
                                onValueChange={(value) =>
                                  handleStatusChange(order.id, value)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="Processing">
                                    Processing
                                  </SelectItem>
                                  <SelectItem value="Shipped">
                                    Shipped
                                  </SelectItem>
                                  <SelectItem value="Delivered">
                                    Delivered
                                  </SelectItem>
                                  <SelectItem value="Cancelled">
                                    Cancelled
                                  </SelectItem>
                                </SelectContent>
                              </Select>
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

              {["pending", "processing", "shipped"].map((status) => (
                <TabsContent key={status} value={status} className="mt-6">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders
                            .filter((o) => o.status.toLowerCase() === status)
                            .map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                  {order.id}
                                </TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {order.date}
                                </TableCell>
                                <TableCell className="font-semibold">
                                  ${order.amount}
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
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
