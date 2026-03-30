import CategoryShowcase from "@/components/CategoriesSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/shared/Navbar";
import Toolbar from "@/components/shared/Toolbar";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <Toolbar />
      <HeroSection />
      <CategoryShowcase />
    </div>
  );
}
