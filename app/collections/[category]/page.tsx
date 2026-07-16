import { notFound } from "next/navigation";
import { CollectionsExplorer } from "@/components/collections-explorer";
import { categoryMeta, collectionHeroImages, products } from "@/lib/data";
import { CategorySlug } from "@/lib/types";

type Props = {
  params: { category: string };
};

export default function CategoryPage({ params }: Props) {
  const category = params.category as CategorySlug;
  const meta = categoryMeta[category];
  if (!meta) {
    notFound();
  }

  const scopedProducts = products.filter((product) => product.category === category);

  return (
    <>
      <section className="category-hero">
        <img src={collectionHeroImages[category]} alt={meta.title} className="category-hero-media" />
        <div className="category-hero-overlay" />
        <div className="container category-hero-content reveal">
          <p className="eyebrow">{meta.subtitle}</p>
          <h1>{meta.title}</h1>
          <p className="lead">{meta.description}</p>
        </div>
      </section>
      <CollectionsExplorer products={scopedProducts} fixedCategoryLabel={meta.title} />
    </>
  );
}
