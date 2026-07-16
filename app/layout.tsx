import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/faq-section";
import { Navbar } from "@/components/navbar";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITALIAMS | Luxury Leather Craft",
  description:
    "Luxury handmade leather products by ITALIAMS, inspired by Italian craftsmanship and crafted in Pakistan."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <FAQSection />
        <Footer />
        <WhatsAppFloat />
        <div className="sr-only" aria-hidden>
          {siteConfig.brandTagline}
        </div>
      </body>
    </html>
  );
}
