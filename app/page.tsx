import ScrollWrapper from "@/components/client/ScrollWrapper";
import BestDeals from "@/features/products/components/BestDeals";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/features/products/components/NewArrivals";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Toolbar from "@/components/shared/Toolbar";
import { getAllProducts } from "@/features/products/actions/products";
import { getCategories } from "@/features/categories/actions/categories";
import { getProductsByCategory } from "@/features/products/actions/products";
import CategoryShowcase from "@/features/categories/components/CategoriesSection";

export default async function Home() {
  const [categories, allProducts] = await Promise.all([
    getCategories().catch(() => []),
    getAllProducts().catch(() => []),
  ]);

  const initialCategory = categories[0]?.name || "";
  const categoryProducts = initialCategory
    ? await getProductsByCategory(initialCategory).catch(() => [])
    : [];

  return (
    <ScrollWrapper>
      <div className="m-0 p-0">
        <Navbar categories={categories} products={allProducts} />
      <Toolbar />
      <HeroSection />
      <CategoryShowcase categories={categories} />
      <NewArrivals initialProducts={allProducts} />
      <BestDeals
        initialCategories={categories}
        initialProducts={categoryProducts}
        initialCategory={initialCategory}
      />
      <Footer />
    </div>
    </ScrollWrapper>
  );
}
