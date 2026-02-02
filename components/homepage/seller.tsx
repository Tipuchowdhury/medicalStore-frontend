import Link from "next/link";
import { Button } from "../ui/button";

const Seller = () => {
  return (
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
  );
};

export default Seller;
