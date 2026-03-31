import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/shared/LoadingSkeleton";
import { getAllProducts } from "../actions/products";
import { Suspense } from "react";
import { Product } from "../types/products";

function NewArrivalsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mt-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function NewArrivalsContent() {
  let products: Product[] = [];
  let error = false;

  try {
    products = await getAllProducts();
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 mt-6">
        <p className="text-yellow-800 font-medium">
          Failed to load new arrivals
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          Please refresh the page to try again.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No new arrivals at the moment. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mt-6">
      {products.slice(0, 10).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const NewArrivals = () => {
  return (
    <div className="container mx-auto mt-18">
      <h1 className="ml-7.5 text-[28px]">
        <p className="text-[#0AAEB9] inline">New</p> Arrivals
      </h1>
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivalsContent />
      </Suspense>
    </div>
  );
};

export default NewArrivals;
