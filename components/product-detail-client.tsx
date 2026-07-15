"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { readCart, writeCart } from "@/lib/cart-storage";
import { Product } from "@/lib/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(price);
}

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] ?? product.image);
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [notice, setNotice] = useState("");

  const personalizationValue = useMemo(() => personalization.trim().toUpperCase(), [personalization]);

  const addItem = () => {
    const cart = readCart();
    const key = `${product.id}:${size}-${personalizationValue}`;
    const idx = cart.findIndex(
      (item) =>
        `${item.productId}:${item.size}-${item.personalization ?? ""}` === key
    );

    if (idx >= 0) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        size,
        slug: product.slug,
        name: `${product.name} (${size})`,
        image: product.image,
        price: product.price,
        quantity,
        personalization: personalizationValue || undefined
      });
    }
    writeCart(cart);
    setNotice("Added to cart.");
  };

  const buyNow = () => {
    addItem();
    router.push("/checkout");
  };

  return (
    <div className="product-detail section">
      <div className="container product-layout">
        <div className="gallery reveal">
          <img src={selectedImage} alt={product.name} className="detail-main-image" />
          <div className="thumb-row">
            {product.gallery.map((img) => (
              <button
                key={img}
                type="button"
                className={img === selectedImage ? "thumb active" : "thumb"}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`${product.name} view`} />
              </button>
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow">{product.leatherType}</p>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p className="price-large">{formatPrice(product.price)}</p>
          <div className="info-list">
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Craftsmanship:</strong> {product.craftsmanship}
            </p>
          </div>

          <div className="detail-actions">
            <label>
              Size
              <select value={size} onChange={(event) => setSize(event.target.value)}>
                {product.sizes.map((itemSize) => (
                  <option key={itemSize} value={itemSize}>
                    {itemSize}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantity
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              />
            </label>
            {product.personalizable ? (
              <label>
                Monogram (up to 12 characters)
                <input
                  type="text"
                  maxLength={12}
                  value={personalization}
                  onChange={(event) => setPersonalization(event.target.value)}
                  placeholder="e.g. MY"
                />
              </label>
            ) : null}
          </div>

          <div className="cta-row">
            <button type="button" className="btn btn-ghost" onClick={addItem}>
              Add to cart
            </button>
            <button type="button" className="btn" onClick={buyNow}>
              Buy now
            </button>
          </div>
          {notice ? <p className="notice">{notice}</p> : null}
        </div>
      </div>
    </div>
  );
}
