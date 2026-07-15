import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { products } from "@/lib/data";

type Props = {
  params: { slug: string };
};

export default function ProductPage({ params }: Props) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
