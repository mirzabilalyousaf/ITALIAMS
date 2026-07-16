"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { readCart, writeCart } from "@/lib/cart-storage";
import { CartItem, CartQuote } from "@/lib/types";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value);
}

type CheckoutResponse = {
  orderNumber: string;
  status: string;
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

export function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [quote, setQuote] = useState<CartQuote | null>(null);
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

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
        setQuoteState("error");
        setMessage("Unable to refresh pricing right now.");
        return;
      }

      const nextQuote = (await response.json()) as CartQuote;
      setQuote(nextQuote);
      setQuoteState("idle");
    };

    void loadQuote();
  }, [items]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      customer: {
        fullName: String(form.get("fullName") ?? "").trim(),
        email: String(form.get("email") ?? "").trim(),
        phone: String(form.get("phone") ?? "").trim(),
        address: String(form.get("address") ?? "").trim(),
        city: String(form.get("city") ?? "").trim(),
        notes: String(form.get("notes") ?? "").trim()
      },
      items: items.map((item) => ({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        personalization: item.personalization
      }))
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      setState("error");
      setMessage(errorText || "Checkout failed. Please try again.");
      return;
    }

    const data = (await response.json()) as CheckoutResponse;
    writeCart([]);
    setItems([]);
    setState("success");
    setQuote(null);
    setMessage(
      `Order ${data.orderNumber} placed. Total ${formatPrice(data.totals.total)}. Our concierge will contact you shortly.`
    );
  };

  if (items.length === 0 && state !== "success") {
    return (
      <section className="section">
        <div className="container narrow">
          <h1>Checkout</h1>
          <p className="muted">Your cart is empty. Add products to continue.</p>
          <Link href="/collections" className="btn">
            Shop now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cart-layout">
        <form className="checkout-form reveal" onSubmit={submit}>
          <h1>Checkout</h1>
          <div className="input-grid">
            <label>
              Full name
              <input name="fullName" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Phone
              <input name="phone" required />
            </label>
            <label>
              City
              <input name="city" required />
            </label>
            <label className="span-2">
              Address
              <input name="address" required />
            </label>
            <label className="span-2">
              Order notes
              <textarea name="notes" rows={4} />
            </label>
          </div>
          <button
            disabled={state === "submitting" || quoteState === "loading" || !quote}
            className="btn"
            type="submit"
          >
            {state === "submitting" ? "Processing..." : "Place order"}
          </button>
          {message ? <p className={state === "error" ? "error" : "notice"}>{message}</p> : null}
        </form>

        <aside className="cart-summary reveal">
          <h2>Order summary</h2>
          {(quote?.lines ?? []).map((line, idx) => (
            <p key={`${line.productId}-${idx}`} className="summary-line">
              <span>
                {line.name} ({line.size}) x{line.quantity}
                {line.personalization ? ` (${line.personalization})` : ""}
              </span>
              <strong>{formatPrice(line.lineTotal)}</strong>
            </p>
          ))}
          {quoteState === "loading" ? <p className="muted">Refreshing secure pricing...</p> : null}
          <p>
            Subtotal <strong>{formatPrice(quote?.subtotal ?? 0)}</strong>
          </p>
          <p>
            Shipping <strong>{formatPrice(quote?.shipping ?? 0)}</strong>
          </p>
          <p className="total">
            Total <strong>{formatPrice(quote?.total ?? 0)}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}
