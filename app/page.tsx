import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/homepage/hero";
import CategorySection from "@/components/category-section";
import FeatureProduct from "@/components/feature-product";
import Seller from "@/components/homepage/seller";
import { homeService } from "./service/home.service";

export default async function Home() {
  const { data } = await homeService.getCategories();
  const { data: medicine } = await homeService.getMedicines();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <CategorySection data={data?.data} />
        <FeatureProduct medicine={medicine?.data} />
        <Seller />
      </main>
      <Footer />
    </>
  );
}
