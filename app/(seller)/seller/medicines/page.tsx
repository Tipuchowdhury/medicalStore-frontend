"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Aspirin 500mg",
      price: 5.99,
      stock: 150,
      category: "Pain Relief",
      rating: 4.5,
      sales: 1200,
    },
    {
      id: 2,
      name: "Cough Syrup",
      price: 8.99,
      stock: 45,
      category: "Cold & Flu",
      rating: 4.2,
      sales: 890,
    },
    {
      id: 3,
      name: "Vitamin C 1000mg",
      price: 12.99,
      stock: 8,
      category: "Vitamins",
      rating: 4.7,
      sales: 2100,
    },
    {
      id: 4,
      name: "Bandage Box",
      price: 4.99,
      stock: 250,
      category: "First Aid",
      rating: 4.4,
      sales: 1500,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMedicine = () => {
    toast.success("Medicine added successfully!");
    setFormData({ name: "", price: "", stock: "", category: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteMedicine = (id: number) => {
    setMedicines(medicines.filter((m) => m.id !== id));
    toast.success("Medicine deleted");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="seller" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="max-w-7xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Inventory</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medicine
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Medicine</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Medicine Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g., Aspirin 500mg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          placeholder="9.99"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                          }
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="Pain Relief"
                      />
                    </div>
                    <Button onClick={handleAddMedicine} className="w-full">
                      Add Medicine
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell className="font-medium">
                          {medicine.name}
                        </TableCell>
                        <TableCell>{medicine.category}</TableCell>
                        <TableCell>${medicine.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              medicine.stock < 20 ? "destructive" : "secondary"
                            }
                          >
                            {medicine.stock} units
                          </Badge>
                        </TableCell>
                        <TableCell>⭐ {medicine.rating}</TableCell>
                        <TableCell>{medicine.sales}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMedicine(medicine.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
