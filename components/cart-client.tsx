"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cartSubtotal, readCart, writeCart } from "@/lib/cart-storage";
import { CartItem } from "@/lib/types";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value);
}

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const shipping = items.length > 0 ? 450 : 0;
  const total = subtotal + shipping;

  const updateQty = (index: number, qty: number) => {
    const next = [...items];
    next[index].quantity = Math.max(1, qty);
    setItems(next);
    writeCart(next);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    writeCart(next);
  };

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container narrow">
          <h1>Your cart is empty</h1>
          <p className="muted">Explore handcrafted pieces and add your favorites.</p>
          <Link href="/collections" className="btn">
            Browse collections
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cart-layout">
        <div className="cart-items reveal">
          <h1>Shopping cart</h1>
          {items.map((item, idx) => (
            <article key={`${item.productId}-${idx}`} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.personalization ? (
                  <p className="muted">Monogram: {item.personalization}</p>
                ) : null}
                <p>{formatPrice(item.price)}</p>
                <div className="cart-controls">
                  <label>
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQty(idx, Number(event.target.value) || 1)}
                    />
                  </label>
                  <button type="button" className="text-link" onClick={() => removeItem(idx)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary reveal">
          <h2>Order summary</h2>
          <p>
            Subtotal <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p>
            Shipping <strong>{formatPrice(shipping)}</strong>
          </p>
          <p className="total">
            Total <strong>{formatPrice(total)}</strong>
          </p>
          <Link href="/checkout" className="btn">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
