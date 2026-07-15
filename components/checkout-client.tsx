"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cartSubtotal, readCart, writeCart } from "@/lib/cart-storage";
import { CartItem } from "@/lib/types";

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
};

export function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const shipping = items.length > 0 ? 450 : 0;
  const total = subtotal + shipping;

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
      items,
      totals: { subtotal, shipping, total }
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
    setMessage(`Order ${data.orderNumber} placed. Our concierge will contact you shortly.`);
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
          <button disabled={state === "submitting"} className="btn" type="submit">
            {state === "submitting" ? "Processing..." : "Place order"}
          </button>
          {message ? <p className={state === "error" ? "error" : "notice"}>{message}</p> : null}
        </form>

        <aside className="cart-summary reveal">
          <h2>Order summary</h2>
          {items.map((item, idx) => (
            <p key={`${item.productId}-${idx}`} className="summary-line">
              <span>
                {item.name} x{item.quantity}
                {item.personalization ? ` (${item.personalization})` : ""}
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </p>
          ))}
          <p>
            Subtotal <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p>
            Shipping <strong>{formatPrice(shipping)}</strong>
          </p>
          <p className="total">
            Total <strong>{formatPrice(total)}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}
