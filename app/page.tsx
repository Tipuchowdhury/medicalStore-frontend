"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/homepage/hero";
import CategorySection from "@/components/category-section";
import FeatureProduct from "@/components/feature-product";
import Seller from "@/components/homepage/seller";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <CategorySection />
        <FeatureProduct />
        <Seller />
      </main>
      <Footer />
    </>
  );
}
