import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface medicineType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
}

const FeatureProduct = ({ medicine }: { medicine: medicineType[] }) => {
  const featured = [
    {
      id: 1,
      name: "Aspirin 500mg",
      price: "$5.99",
      category: "Pain Relief",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Cough Syrup",
      price: "$8.99",
      category: "Cold & Flu",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Vitamin C 1000mg",
      price: "$12.99",
      category: "Vitamins",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Bandage Box",
      price: "$4.99",
      category: "First Aid",
      rating: 4.3,
    },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicine.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {product.price} tk
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
