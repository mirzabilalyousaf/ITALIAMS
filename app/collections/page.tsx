import { CollectionsExplorer } from "@/components/collections-explorer";
import { categoryMeta, products } from "@/lib/data";

export default function CollectionsPage() {
  return (
    <>
      <section className="section section-top">
        <div className="container">
          <p className="eyebrow">Collections</p>
          <h1>Crafted categories for every lifestyle</h1>
          <p className="lead">
            Explore leather belts, wallets, bags, and rugs with professional classification
            filters for leather type, tier, and sorting.
          </p>
          <div className="pill-row">
            {Object.values(categoryMeta).map((category) => (
              <span key={category.title} className="pill">
                {category.title}
              </span>
            ))}
          </div>
        </div>
      </section>
      <CollectionsExplorer products={products} />
    </>
  );
}
