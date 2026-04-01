import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/features/products/actions/products";
import ProductDetails from "@/components/product/ProductDetails";
import { ArrowLeft } from "lucide-react";

/**
 * Product Details Page — Server Component
 * Fetches product data via Server Action and renders ProductDetails component
 * Route: /products/[id]
 */

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  // Validate ID
  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  // Fetch product via Server Action
  let product = null;
  try {
    product = await getProductById(productId);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  // Handle not found
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#03484D] py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-[#12b1c1] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </div>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | E-Commerce`,
    description: product.title,
  };
}