"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";
import {
  useGetAllCategory,
  useGetMedicines,
} from "@/app/service/API/shop-page-api/api";
import { medicineTypes } from "@/types/allTypes";

export default function ShopPage() {
  let maxPriceOfMed = 0;
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, maxPriceOfMed]);
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading } = useGetMedicines({
    category: selectedCategory || null,
    maxPrice: priceRange[1].toString(),
  });
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategory();

  const categoriesList = categories?.data;
  maxPriceOfMed = data?.data?.reduce((max: number, med: medicineTypes) => {
    return med.price > max ? med.price : max;
  }, 0);
  const filtered = data?.data?.filter((medicine: medicineTypes) => {
    const matchesCategory =
      !selectedCategory || medicine.category.name === selectedCategory;
    // const matchesPrice =
    //   medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
    return matchesCategory;
  });

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
                  <Label className="text-base font-semibold mb-4 block">
                    Price Range
                  </Label>
                  <Input
                    type="range"
                    min="0"
                    max={maxPriceOfMed || 100}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2 text-sm">
                    <span>tk {priceRange[0]}</span>
                    <span>-</span>
                    <span>tk {maxPriceOfMed}</span>
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Category
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox
                        id="all"
                        checked={!selectedCategory}
                        onCheckedChange={() => setSelectedCategory(null)}
                      />
                      <Label
                        htmlFor="all"
                        className="ml-2 font-normal cursor-pointer"
                      >
                        All Categories
                      </Label>
                    </div>
                    {categories?.data.map((cat: any) => (
                      <div key={cat.id} className="flex items-center">
                        <Checkbox
                          id={cat}
                          checked={selectedCategory === cat.name}
                          onCheckedChange={() =>
                            setSelectedCategory(
                              selectedCategory === cat.name ? null : cat.name,
                            )
                          }
                        />
                        <Label
                          htmlFor={cat}
                          className="ml-2 font-normal cursor-pointer"
                        >
                          {cat.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Stock */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Availability
                  </Label>
                  <div className="flex items-center">
                    <Checkbox id="inStock" />
                    <Label
                      htmlFor="inStock"
                      className="ml-2 font-normal cursor-pointer"
                    >
                      In Stock Only
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Sort */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  {filtered?.length} results
                </p>
                {/* <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered?.map((medicine: medicineTypes) => (
                  <Link key={medicine.id} href={`/shop/${medicine.id}`}>
                    <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {medicine.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {medicine.description}
                            </CardDescription>
                          </div>
                          {medicine.quantity === 0 && (
                            <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                              Out
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">
                              ${medicine.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              {/* <span className="text-sm">{medicine.rating}</span> */}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {medicine.category.name}
                          </p>
                          <Button
                            className="w-full"
                            size="sm"
                            disabled={medicine.quantity === 0}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {medicine.quantity === 0
                              ? "Out of Stock"
                              : "Add to Cart"}
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
  );
}
