import Link from "next/link";
import { Product } from "@/lib/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card reveal">
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-body">
        <p className="badge">{product.leatherType}</p>
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="muted">{product.shortDescription}</p>
        <div className="product-meta">
          <strong>{formatPrice(product.price)}</strong>
          <Link href={`/products/${product.slug}`} className="text-link">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
