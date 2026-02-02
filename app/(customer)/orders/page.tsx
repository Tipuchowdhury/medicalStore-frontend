"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 36.68,
      status: "Delivered",
      items: [
        { name: "Aspirin 500mg", quantity: 2 },
        { name: "Cough Syrup", quantity: 1 },
        { name: "Vitamin C 1000mg", quantity: 1 },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 24.97,
      status: "In Transit",
      items: [
        { name: "Antihistamine", quantity: 2 },
        { name: "Bandage Box", quantity: 1 },
      ],
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      total: 12.99,
      status: "Processing",
      items: [{ name: "Vitamin D 2000IU", quantity: 1 }],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
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
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.date}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Items</p>
                          <ul className="text-sm mt-1 space-y-1">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Total Amount
                          </p>
                          <p className="text-2xl font-bold text-primary mt-1">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Link href={`/orders/${order.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        {order.status === "Delivered" && (
                          <Button size="sm" variant="outline">
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="processing" className="space-y-4 mt-6">
              {orders
                .filter(
                  (o) => o.status === "Processing" || o.status === "In Transit",
                )
                .map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">
                          ${order.total.toFixed(2)}
                        </p>
                        <Link href={`/orders/${order.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Track Order
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-4 mt-6">
              {orders
                .filter((o) => o.status === "Delivered")
                .map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">
                          ${order.total.toFixed(2)}
                        </p>
                        <div className="flex gap-2">
                          <Link href={`/orders/${order.id}`}>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
