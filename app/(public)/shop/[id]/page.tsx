"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useGetMedicineById } from "@/app/service/API/shop-page-api/api";
import { string } from "zod";
import { useCreateOrderMutation } from "@/app/service/API/mutation";
import { createOrder } from "../../../hooks/shop-page/query";

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const createOrderMutation = useCreateOrderMutation();
  const { data: medicineData, isLoading } = useGetMedicineById(id as string);
  console.log(medicineData);
  console.log(id);

  const [quantity, setQuantity] = useState(1);
  // Mock medicine data

  const handleAddToCart = () => {
    // toast.success(`Added ${quantity} ${medicine.name} to cart`);
    console.log(medicineData?.data);
    const _data = createOrderMutation.mutate({
      items: [
        {
          medicineId: medicineData?.data.id || "",
          quantity: quantity,
        },
      ],
    });
    console.log(_data);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">💊</div>
                <p className="text-muted-foreground">
                  {medicineData?.data.name}
                </p>
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  {medicineData?.data.name}
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  {medicineData?.data.category}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    {/* <span className="font-semibold">{medicineData?.data.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({medicineData?.data.reviews} reviews)
                    </span> */}
                  </div>
                </div>

                <Separator className="my-4" />

                <p className="text-2xl font-bold text-primary mb-4">
                  ${medicineData?.data.price}
                </p>
                <p className="text-muted-foreground mb-6">
                  {medicineData?.data.description}
                </p>

                {/* Stock Status */}
                <div className="mb-6">
                  {medicineData?.data.quantity > 0 ? (
                    <p className="text-sm text-green-600 font-medium">
                      ✓ In Stock
                    </p>
                  ) : (
                    <p className="text-sm text-destructive font-medium">
                      ✗ Out of Stock
                    </p>
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
                        onChange={(e) =>
                          setQuantity(Math.max(1, Number(e.target.value)))
                        }
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
                  disabled={!medicineData?.data.quantity}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order Now
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Save for Later
                </Button>

                <Separator className="my-6" />

                {/* Seller Info */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sold by</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{medicine.seller.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm">
                            {medicine.seller.rating}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
