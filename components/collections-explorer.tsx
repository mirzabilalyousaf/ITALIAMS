"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export function CollectionsExplorer({
  products,
  fixedCategoryLabel
}: {
  products: Product[];
  fixedCategoryLabel?: string;
}) {
  const [leatherType, setLeatherType] = useState("all");
  const [priceBand, setPriceBand] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const leatherOptions = useMemo(
    () => ["all", ...new Set(products.map((product) => product.leatherType))],
    [products]
  );

  const filtered = useMemo(() => {
    const byLeather =
      leatherType === "all"
        ? products
        : products.filter((product) => product.leatherType === leatherType);

    const byPrice =
      priceBand === "all"
        ? byLeather
        : byLeather.filter((product) => {
            if (priceBand === "entry") return product.price < 25000;
            if (priceBand === "mid") return product.price >= 25000 && product.price < 70000;
            return product.price >= 70000;
          });

    const sorted = [...byPrice];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured")
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return sorted;
  }, [products, leatherType, priceBand, sort]);

  return (
    <section className="section">
      <div className="container">
        <div className="filters reveal">
          <div>
            <label htmlFor="leather-filter">Leather</label>
            <select
              id="leather-filter"
              value={leatherType}
              onChange={(event) => setLeatherType(event.target.value)}
            >
              {leatherOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All Leather Types" : option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price-filter">Classification</label>
            <select
              id="price-filter"
              value={priceBand}
              onChange={(event) => setPriceBand(event.target.value)}
            >
              <option value="all">All Price Tiers</option>
              <option value="entry">Classic Tier (Below PKR 25K)</option>
              <option value="mid">Signature Tier (PKR 25K - 70K)</option>
              <option value="premium">Collector Tier (Above PKR 70K)</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-filter">Sort</label>
            <select id="sort-filter" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        {fixedCategoryLabel ? (
          <p className="muted section-inline-note">Showing: {fixedCategoryLabel}</p>
        ) : null}

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="empty-state">No products match the selected classifications.</p>
        ) : null}
      </div>
    </section>
  );
}
