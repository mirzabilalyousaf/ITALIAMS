import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact ITALIAMS on WhatsApp"
      className="wa-float"
    >
      <span>WhatsApp Concierge</span>
    </a>
  );
}
