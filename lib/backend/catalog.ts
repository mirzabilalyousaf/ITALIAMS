import { products } from "@/lib/data";
import { Product } from "@/lib/types";

export function listProducts() {
  return products;
}

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}
