"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      message: String(form.get("message") ?? "").trim()
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      setStatus("error");
      setMessage(errorText || "Unable to submit your message.");
      return;
    }

    const data = (await response.json()) as { ticketId: string };
    setStatus("success");
    setMessage(`Thank you. Ticket ${data.ticketId} has been received by our concierge team.`);
    event.currentTarget.reset();
  };

  return (
    <section className="section section-top">
      <div className="container split">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h1>Speak with our leather concierge</h1>
          <p className="lead">For product guidance, personalization, gifting, and support.</p>
          <p>
            Email: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <p>
            Phone: <a href={`tel:${siteConfig.contactPhone}`}>{siteConfig.contactPhone}</a>
          </p>
          <p>Address: {siteConfig.contactAddress}</p>
        </div>

        <form className="checkout-form reveal" onSubmit={submit}>
          <h2>Send a message</h2>
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Message
            <textarea rows={6} name="message" required />
          </label>
          <button className="btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
          {message ? <p className={status === "error" ? "error" : "notice"}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
