'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, ShoppingCart, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function MedicineDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  // Mock medicine data
  const medicine = {
    id: params.id,
    name: 'Aspirin 500mg',
    price: 5.99,
    category: 'Pain Relief',
    manufacturer: 'Generic',
    rating: 4.5,
    reviews: 127,
    description: 'Effective pain reliever and fever reducer. Fast-acting formula.',
    specifications: {
      active_ingredient: 'Acetylsalicylic Acid 500mg',
      form: 'Tablet',
      count: '30 tablets',
      usage: 'Take 1-2 tablets every 4-6 hours as needed',
    },
    seller: {
      name: 'PharmaCare Plus',
      rating: 4.6,
    },
    inStock: true,
    reviews_list: [
      { user: 'John D.', rating: 5, text: 'Great product, fast delivery' },
      { user: 'Sarah M.', rating: 4, text: 'Good quality, reasonable price' },
    ]
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${medicine.name} to cart`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">💊</div>
                <p className="text-muted-foreground">{medicine.name}</p>
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
                <p className="text-muted-foreground text-lg mb-4">{medicine.category}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold">{medicine.rating}</span>
                    <span className="text-muted-foreground text-sm">({medicine.reviews} reviews)</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <p className="text-2xl font-bold text-primary mb-4">${medicine.price}</p>
                <p className="text-muted-foreground mb-6">{medicine.description}</p>

                {/* Stock Status */}
                <div className="mb-6">
                  {medicine.inStock ? (
                    <p className="text-sm text-green-600 font-medium">✓ In Stock</p>
                  ) : (
                    <p className="text-sm text-destructive font-medium">✗ Out of Stock</p>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="mb-6">
                  <Label className="mb-2 block">Quantity</Label>
                  <div className="flex gap-4 items-center">
                    <div className="flex border rounded-lg bg-muted">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="border-0 bg-transparent text-center max-w-20"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-4"
                  disabled={!medicine.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  Save for Later
                </Button>

                <Separator className="my-6" />

                {/* Seller Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sold by</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{medicine.seller.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm">{medicine.seller.rating}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="specifications" className="mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {Object.entries(medicine.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <p className="font-semibold text-muted-foreground capitalize">{key.replace('_', ' ')}</p>
                        <p className="col-span-2">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">How to Use</h3>
                  <p className="text-muted-foreground">{medicine.specifications.usage}</p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm"><span className="font-semibold">Warning:</span> Consult a healthcare provider before use if pregnant or nursing.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {medicine.reviews_list.map((review, idx) => (
                      <div key={idx} className="pb-4 border-b last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
