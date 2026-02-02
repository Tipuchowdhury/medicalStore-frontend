'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const order = {
    id: params.id,
    date: '2024-01-15',
    status: 'Delivered',
    total: 36.68,
    subtotal: 33.96,
    tax: 2.72,
    items: [
      { id: 1, name: 'Aspirin 500mg', price: 5.99, quantity: 2, total: 11.98 },
      { id: 2, name: 'Cough Syrup', price: 8.99, quantity: 1, total: 8.99 },
      { id: 3, name: 'Vitamin C 1000mg', price: 12.99, quantity: 1, total: 12.99 },
    ],
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
    },
    tracking: [
      { status: 'Order Placed', date: '2024-01-15', completed: true },
      { status: 'Processing', date: '2024-01-16', completed: true },
      { status: 'Shipped', date: '2024-01-17', completed: true },
      { status: 'Out for Delivery', date: '2024-01-18', completed: true },
      { status: 'Delivered', date: '2024-01-19', completed: true },
    ],
    seller: {
      name: 'PharmaCare Plus',
      rating: 4.6,
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Button>
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground mt-1">{order.date}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 text-base px-4 py-2">
              ✓ {order.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Items */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={item.id}>
                      {idx > 0 && <Separator />}
                      <div className="flex justify-between items-start py-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.tracking.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-green-100' : 'bg-muted'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          {idx < order.tracking.length - 1 && (
                            <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-200' : 'bg-muted'}`} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-semibold">{step.status}</p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                  <p className="pt-2 text-muted-foreground">{order.shippingAddress.phone}</p>
                  <p className="text-muted-foreground">{order.shippingAddress.email}</p>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{order.seller.name}</p>
                      <p className="text-sm text-muted-foreground">⭐ {order.seller.rating}</p>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                {order.status === 'Delivered' && (
                  <>
                    <Button className="w-full bg-transparent" variant="outline">
                      Leave Review
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      Reorder
                    </Button>
                  </>
                )}
                <Button className="w-full bg-transparent" variant="outline">
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
