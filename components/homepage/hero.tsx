import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Your Health, Our Priority
        </h1>
        <p className="text-lg mb-8 opacity-90">
          Browse and order quality over-the-counter medicines from trusted
          sellers
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/shop">
            <Button size="lg" variant="secondary">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
