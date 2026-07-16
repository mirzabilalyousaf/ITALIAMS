"use client";

import { useEffect, useState } from "react";

function parseRemaining(deadlineIso: string) {
  const target = new Date(deadlineIso).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, ended: diff === 0 };
}

export function OfferCountdown({ deadlineIso }: { deadlineIso: string }) {
  const [remaining, setRemaining] = useState(() => parseRemaining(deadlineIso));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(parseRemaining(deadlineIso));
    }, 60000);
    return () => window.clearInterval(timer);
  }, [deadlineIso]);

  return (
    <section className="offer-banner reveal">
      <div className="container offer-inner">
        <div>
          <p className="eyebrow">Limited Offer Timeline</p>
          <h3>Complimentary Monogram on Selected Pieces</h3>
          <p className="muted">
            Final day:{" "}
            {new Date(deadlineIso).toLocaleDateString("en-PK", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </p>
        </div>
        {remaining.ended ? (
          <strong>Offer has ended</strong>
        ) : (
          <div className="offer-time" aria-live="polite">
            <span>{remaining.days}d</span>
            <span>{remaining.hours}h</span>
            <span>{remaining.minutes}m</span>
          </div>
        )}
      </div>
    </section>
  );
}
