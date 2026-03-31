import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/actions/products";

const NewArrivals = async () => {
  const products = await getAllProducts();

  return (
    <div className="mt-18">
      <h1 className="ml-26.25 text-[28px]">
        <p className="text-[#0AAEB9] inline">New</p> Arrivals
      </h1>
      {/* products */}
      <div className="grid grid-cols-6 gap-3 mt-6 px-18.75">
        {/* Map through the products and display them here */}
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
