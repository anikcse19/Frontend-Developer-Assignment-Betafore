import BestDealsPage from "@/features/products/components/BestDeals";
import CategoriesSectionWrapper from "@/features/categories/components/CategoriesSectionWrapper";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/features/products/components/NewArrivals";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Toolbar from "@/components/shared/Toolbar";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <Toolbar />
      <HeroSection />
      <CategoriesSectionWrapper />
      <NewArrivals />
      <BestDealsPage />
      <Footer />
    </div>
  );
}
