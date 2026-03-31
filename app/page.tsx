import BestDealsPage from "@/components/home/BestDeals";
import CategoryShowcase from "@/components/home/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Toolbar from "@/components/shared/Toolbar";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <Toolbar />
      <HeroSection />
      <CategoryShowcase />
      <NewArrivals />
      <BestDealsPage />
      <Footer />
    </div>
  );
}
