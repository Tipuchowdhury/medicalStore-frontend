'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, ShoppingCart, Package, AlertCircle } from 'lucide-react'

const chartData = [
  { name: 'Jan', sales: 2400, orders: 24 },
  { name: 'Feb', sales: 3210, orders: 26 },
  { name: 'Mar', sales: 2290, orders: 20 },
  { name: 'Apr', sales: 2000, orders: 18 },
  { name: 'May', sales: 2181, orders: 22 },
  { name: 'Jun', sales: 2500, orders: 25 },
]

export default function SellerDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="seller" />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$14,581</div>
                  <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145</div>
                  <p className="text-xs text-muted-foreground mt-1">28 pending delivery</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">3 low stock</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground mt-1">From 256 reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sales & Orders Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="var(--color-primary)" />
                    <Bar dataKey="orders" fill="var(--color-accent)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'ORD-001', customer: 'John Doe', amount: '$45.99', status: 'Shipped' },
                    { id: 'ORD-002', customer: 'Jane Smith', amount: '$32.50', status: 'Processing' },
                    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$28.99', status: 'Pending' },
                    { id: 'ORD-004', customer: 'Alice Williams', amount: '$56.75', status: 'Delivered' },
                  ].map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="font-semibold">{order.amount}</span>
                        <Badge variant={
                          order.status === 'Delivered' ? 'default' :
                          order.status === 'Shipped' ? 'secondary' :
                          'outline'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
