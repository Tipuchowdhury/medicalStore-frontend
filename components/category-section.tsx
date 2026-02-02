import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface categoryType {
  name: string;
  id: string;
}

const CategorySection = ({ data }: { data: categoryType[] }) => {
  console.log(data);
  const categories = [
    { id: 1, name: "Pain Relief", icon: "💊" },
    { id: 2, name: "Cold & Flu", icon: "🤧" },
    { id: 3, name: "Digestive", icon: "🩹" },
    { id: 4, name: "Vitamins", icon: "💊" },
    { id: 5, name: "First Aid", icon: "🏥" },
    { id: 6, name: "Skincare", icon: "✨" },
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.name}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-2"> 💊</div>
                  <p className="font-medium text-sm">{cat.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
