"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  zipCode: z.string().min(5, "Zip code required"),
  paymentMethod: z.enum(["cod", "card"]),
});

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = 33.96;
  const tax = 2.72;
  const total = 36.68;

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      paymentMethod: "cod" as const,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Order placed successfully!");
        router.push("/orders");
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form.Field
                      name="fullName"
                      validators={{ onChange: checkoutSchema.shape.fullName }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            disabled={isLoading}
                          />
                          {field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-destructive mt-1">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <form.Field
                        name="email"
                        validators={{ onChange: checkoutSchema.shape.email }}
                        children={(field) => (
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              disabled={isLoading}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-destructive mt-1">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <form.Field
                        name="phone"
                        validators={{ onChange: checkoutSchema.shape.phone }}
                        children={(field) => (
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              disabled={isLoading}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-destructive mt-1">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    <form.Field
                      name="address"
                      validators={{ onChange: checkoutSchema.shape.address }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            disabled={isLoading}
                          />
                          {field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-destructive mt-1">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <form.Field
                        name="city"
                        validators={{ onChange: checkoutSchema.shape.city }}
                        children={(field) => (
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              disabled={isLoading}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-destructive mt-1">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <form.Field
                        name="zipCode"
                        validators={{ onChange: checkoutSchema.shape.zipCode }}
                        children={(field) => (
                          <div>
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input
                              id="zipCode"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              disabled={isLoading}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-destructive mt-1">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form.Field
                      name="paymentMethod"
                      children={(field) => (
                        <RadioGroup
                          value={field.state.value}
                          onValueChange={(val) =>
                            field.handleChange(val as "cod" | "card")
                          }
                        >
                          <div className="flex items-center space-x-2 mb-4 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label
                              htmlFor="cod"
                              className="font-normal cursor-pointer flex-1"
                            >
                              <p className="font-semibold">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">
                                Pay when you receive your order
                              </p>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted opacity-50 cursor-not-allowed">
                            <RadioGroupItem value="card" id="card" disabled />
                            <Label
                              htmlFor="card"
                              className="font-normal cursor-not-allowed flex-1"
                            >
                              <p className="font-semibold">Credit/Debit Card</p>
                              <p className="text-sm text-muted-foreground">
                                Coming soon
                              </p>
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Aspirin 500mg (x2)</span>
                      <span>$11.98</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cough Syrup (x1)</span>
                      <span>$8.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitamin C 1000mg (x1)</span>
                      <span>$12.99</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
