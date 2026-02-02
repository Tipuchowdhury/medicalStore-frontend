'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react'

const chartData = [
  { name: 'Jan', users: 240, orders: 24, revenue: 2400 },
  { name: 'Feb', users: 321, orders: 26, revenue: 3210 },
  { name: 'Mar', users: 229, orders: 20, revenue: 2290 },
  { name: 'Apr', users: 200, orders: 18, revenue: 2000 },
  { name: 'May', users: 218, orders: 22, revenue: 2181 },
  { name: 'Jun', users: 250, orders: 25, revenue: 2500 },
]

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +45 this month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,392</div>
                  <p className="text-xs text-muted-foreground mt-1">$145,230 revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Total Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">356</div>
                  <p className="text-xs text-muted-foreground mt-1">From 28 sellers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Sellers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground mt-1">3 pending approval</p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="var(--color-primary)" />
                    <Line type="monotone" dataKey="orders" stroke="var(--color-accent)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Aspirin 500mg', sales: 1200 },
                      { name: 'Vitamin C 1000mg', sales: 950 },
                      { name: 'Cough Syrup', sales: 780 },
                      { name: 'Bandage Box', sales: 654 },
                    ].map((product, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{product.name}</span>
                        <span className="font-semibold">{product.sales} sales</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {[
                      'New seller registered: PharmaCare Plus',
                      'Order #ORD-8392 completed',
                      'New product added: Antihistamine',
                      'User reported issue on order #ORD-8388',
                    ].map((activity, idx) => (
                      <div key={idx} className="py-2 border-b last:border-0">
                        <p className="text-muted-foreground">{activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
