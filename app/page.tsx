import Link from "next/link";
import { OfferCountdown } from "@/components/offer-countdown";
import { ProductCard } from "@/components/product-card";
import { homeHeroSlides, products } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const featured = products.filter((product) => product.featured).slice(0, 4);

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img src={homeHeroSlides[0]} alt="ITALIAMS luxury leather craftsmanship" />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content reveal">
          <p className="eyebrow">Handmade Luxury</p>
          <h1>{siteConfig.brandName}</h1>
          <p className="lead">
            Premium leather belts, wallets, bags, and rugs inspired by Italian craftsmanship
            and handcrafted in Pakistan.
          </p>
          <div className="cta-row">
            <Link href="/collections" className="btn">
              Explore Collections
            </Link>
            <Link href="/about" className="btn btn-ghost">
              Our Craft Story
            </Link>
          </div>
        </div>
      </section>

      <OfferCountdown deadlineIso={siteConfig.offerDeadlineIso} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Featured Pieces</p>
            <h2>Curated signatures of the house</h2>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container split">
          <div className="reveal">
            <p className="eyebrow">Made for discerning clients</p>
            <h2>Personalization and concierge service</h2>
            <p>
              Add monograms on eligible items and receive direct support from our client
              concierge for gifting, styling, and custom guidance.
            </p>
            <Link href="/contact" className="btn">
              Speak to Concierge
            </Link>
          </div>
          <img
            src={homeHeroSlides[1]}
            alt="Luxury leather product close-up"
            className="split-image reveal"
          />
        </div>
      </section>
    </>
  );
}
