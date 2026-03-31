import { getCategories } from "@/actions/products";
import BestDealsClient from "./BestDealsClient";

const BestDeals = async () => {
  const categories = await getCategories();

  return <BestDealsClient categories={categories} />;
};

export default BestDeals;
