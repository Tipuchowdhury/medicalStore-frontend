'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Star } from 'lucide-react'

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('popular')

  const medicines = [
    { id: 1, name: 'Aspirin 500mg', price: 5.99, category: 'Pain Relief', manufacturer: 'Generic', rating: 4.5, inStock: true },
    { id: 2, name: 'Ibuprofen 200mg', price: 6.99, category: 'Pain Relief', manufacturer: 'Generic', rating: 4.6, inStock: true },
    { id: 3, name: 'Cough Syrup', price: 8.99, category: 'Cold & Flu', manufacturer: 'Brand X', rating: 4.2, inStock: true },
    { id: 4, name: 'Vitamin C 1000mg', price: 12.99, category: 'Vitamins', manufacturer: 'Brand Y', rating: 4.7, inStock: true },
    { id: 5, name: 'Antihistamine', price: 7.99, category: 'Cold & Flu', manufacturer: 'Generic', rating: 4.3, inStock: false },
    { id: 6, name: 'Bandage Box', price: 4.99, category: 'First Aid', manufacturer: 'Generic', rating: 4.4, inStock: true },
    { id: 7, name: 'Antiseptic Cream', price: 9.99, category: 'Skincare', manufacturer: 'Brand Z', rating: 4.5, inStock: true },
    { id: 8, name: 'Vitamin D 2000IU', price: 11.99, category: 'Vitamins', manufacturer: 'Brand Y', rating: 4.6, inStock: true },
  ]

  const categories = ['Pain Relief', 'Cold & Flu', 'Vitamins', 'First Aid', 'Skincare', 'Digestive']

  const filtered = medicines.filter(m => {
    const matchesCategory = !selectedCategory || m.category === selectedCategory
    const matchesPrice = m.price >= priceRange[0] && m.price <= priceRange[1]
    return matchesCategory && matchesPrice
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Shop Medicines</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Price Filter */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Price Range</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>-</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Category</Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox
                        id="all"
                        checked={!selectedCategory}
                        onCheckedChange={() => setSelectedCategory(null)}
                      />
                      <Label htmlFor="all" className="ml-2 font-normal cursor-pointer">All Categories</Label>
                    </div>
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center">
                        <Checkbox
                          id={cat}
                          checked={selectedCategory === cat}
                          onCheckedChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        />
                        <Label htmlFor={cat} className="ml-2 font-normal cursor-pointer">{cat}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Stock */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Availability</Label>
                  <div className="flex items-center">
                    <Checkbox id="inStock" />
                    <Label htmlFor="inStock" className="ml-2 font-normal cursor-pointer">In Stock Only</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Sort */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">{filtered.length} results</p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((medicine) => (
                  <Link key={medicine.id} href={`/shop/${medicine.id}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{medicine.name}</CardTitle>
                            <CardDescription className="text-xs">{medicine.manufacturer}</CardDescription>
                          </div>
                          {!medicine.inStock && (
                            <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">Out</span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">${medicine.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span className="text-sm">{medicine.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{medicine.category}</p>
                          <Button className="w-full" size="sm" disabled={!medicine.inStock}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
