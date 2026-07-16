import { homeHeroSlides } from "@/lib/data";

export default function AboutPage() {
  return (
    <section className="section section-top">
      <div className="container split">
        <div className="reveal">
          <p className="eyebrow">About ITALIAMS</p>
          <h1>Where Italian design heritage meets Pakistani craftsmanship</h1>
          <p className="lead">
            ITALIAMS was founded to create heirloom-quality leather pieces with elevated design,
            material integrity, and artisanal construction.
          </p>
          <p>
            Our workshop combines traditional hand-finishing methods, precision patterning, and
            modern quality standards. Every product is crafted for longevity, comfort, and
            understated luxury.
          </p>
          <p>
            We partner with expert artisans and source premium leather selected for texture,
            resilience, and graceful aging. The result is a collection that feels timeless from
            the first touch.
          </p>
        </div>
        <img src={homeHeroSlides[2]} alt="ITALIAMS workshop craft process" className="split-image reveal" />
      </div>
    </section>
  );
}
