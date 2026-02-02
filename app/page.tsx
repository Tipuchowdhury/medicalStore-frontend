'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShoppingCart, Package, Users, BarChart3 } from 'lucide-react'

export default function Home() {
  const categories = [
    { id: 1, name: 'Pain Relief', icon: '💊' },
    { id: 2, name: 'Cold & Flu', icon: '🤧' },
    { id: 3, name: 'Digestive', icon: '🩹' },
    { id: 4, name: 'Vitamins', icon: '💊' },
    { id: 5, name: 'First Aid', icon: '🏥' },
    { id: 6, name: 'Skincare', icon: '✨' },
  ]

  const featured = [
    { id: 1, name: 'Aspirin 500mg', price: '$5.99', category: 'Pain Relief', rating: 4.5 },
    { id: 2, name: 'Cough Syrup', price: '$8.99', category: 'Cold & Flu', rating: 4.2 },
    { id: 3, name: 'Vitamin C 1000mg', price: '$12.99', category: 'Vitamins', rating: 4.7 },
    { id: 4, name: 'Bandage Box', price: '$4.99', category: 'First Aid', rating: 4.3 },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Health, Our Priority
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Browse and order quality over-the-counter medicines from trusted sellers
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/shop">
                <Button size="lg" variant="secondary">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/shop?category=${cat.name}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <p className="font-medium text-sm">{cat.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        <span className="text-sm text-muted-foreground">⭐ {product.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Sell your medicines to thousands of customers
            </p>
            <Link href="/register?role=seller">
              <Button size="lg" variant="outline">
                Register as Seller
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
