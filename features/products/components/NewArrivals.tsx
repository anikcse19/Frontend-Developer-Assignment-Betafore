import ProductCard from "@/components/product/ProductCard";
import { Product } from "../types/products";

interface NewArrivalsProps {
  initialProducts: Product[];
}

const NewArrivals = ({ initialProducts }: NewArrivalsProps) => {
  return (
    <div className="container mx-auto mt-8 sm:mt-12 md:mt-18 px-4">
      <h1 className="ml-0 sm:ml-7.5 text-xl sm:text-2xl md:text-[28px]">
        <span className="text-[#0AAEB9] inline">New</span> Arrivals
      </h1>
      {initialProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No new arrivals at the moment. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mt-6">
          {initialProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
