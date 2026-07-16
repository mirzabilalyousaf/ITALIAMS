"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart, writeCart } from "@/lib/cart-storage";
import { CartItem, CartQuote } from "@/lib/types";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value);
}

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [quote, setQuote] = useState<CartQuote | null>(null);
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    const loadQuote = async () => {
      if (items.length === 0) {
        setQuote(null);
        return;
      }

      setQuoteState("loading");
      setError("");
      const response = await fetch("/api/cart/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            personalization: item.personalization
          }))
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        setQuoteState("error");
        setError(errorText || "Unable to refresh cart pricing.");
        return;
      }

      const nextQuote = (await response.json()) as CartQuote;
      setQuote(nextQuote);
      setQuoteState("idle");
    };

    void loadQuote();
  }, [items]);

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
                <p className="muted">Size: {item.size}</p>
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
          {quoteState === "loading" ? <p className="muted">Refreshing secure pricing...</p> : null}
          {error ? <p className="error">{error}</p> : null}
          <p>
            Subtotal <strong>{formatPrice(quote?.subtotal ?? 0)}</strong>
          </p>
          <p>
            Shipping <strong>{formatPrice(quote?.shipping ?? 0)}</strong>
          </p>
          <p className="total">
            Total <strong>{formatPrice(quote?.total ?? 0)}</strong>
          </p>
          <Link href="/checkout" className="btn">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
