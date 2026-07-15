import { BlogPost, CategorySlug, FaqItem, Product } from "@/lib/types";

export const categoryMeta: Record<
  CategorySlug,
  { title: string; subtitle: string; description: string }
> = {
  belts: {
    title: "Leather Belts",
    subtitle: "Structured elegance",
    description:
      "Hand-cut and edge-finished belts crafted from full-grain hides for timeless wear."
  },
  wallets: {
    title: "Wallets",
    subtitle: "Quiet sophistication",
    description:
      "Slim, functional wallets with artisanal stitching and premium leather aging."
  },
  bags: {
    title: "Bags",
    subtitle: "Travel with distinction",
    description:
      "Luxury carry pieces balancing modern utility with old-world leather craftsmanship."
  },
  rugs: {
    title: "Leather Rugs",
    subtitle: "Tactile interiors",
    description:
      "Statement rugs built from premium leather panels with tailored finishing."
  }
};

export const products: Product[] = [
  {
    id: "belt-aurora-noir",
    slug: "aurora-noir-belt",
    name: "Aurora Noir Belt",
    category: "belts",
    price: 22900,
    originalPrice: 26900,
    shortDescription: "Black full-grain belt with hand-burnished edges.",
    description:
      "The Aurora Noir Belt is made from vegetable-tanned full-grain leather and finished by hand for a rich, lasting patina.",
    material: "Vegetable-tanned full-grain leather",
    craftsmanship: "Hand-stitched keeper loops and polished brass buckle",
    leatherType: "Full-Grain",
    colors: ["Noir Black", "Tobacco Brown"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    image: "/assets/products/belt-1.jpg",
    gallery: ["/assets/products/belt-1.jpg", "/assets/products/belt-2.jpg"],
    featured: true,
    personalizable: true
  },
  {
    id: "belt-siena-classic",
    slug: "siena-classic-belt",
    name: "Siena Classic Belt",
    category: "belts",
    price: 19900,
    shortDescription: "Minimal dress belt in deep walnut leather.",
    description:
      "A refined belt profile designed for formal and smart-casual wardrobes with precision edge painting.",
    material: "Italian top-grain leather",
    craftsmanship: "Hand-cut silhouette with polished buckle finishing",
    leatherType: "Top-Grain",
    colors: ["Walnut", "Midnight"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    image: "/assets/products/belt-3.jpg",
    gallery: ["/assets/products/belt-3.jpg", "/assets/products/belt-4.jpg"],
    personalizable: true
  },
  {
    id: "wallet-milano-slim",
    slug: "milano-slim-wallet",
    name: "Milano Slim Wallet",
    category: "wallets",
    price: 18500,
    shortDescription: "Compact bifold wallet with smart card architecture.",
    description:
      "Designed for slim carry, the Milano wallet combines durability and precision with subtle luxury details.",
    material: "Aniline full-grain leather",
    craftsmanship: "Hand-burnished seams and saddle stitching",
    leatherType: "Full-Grain",
    colors: ["Espresso", "Onyx"],
    sizes: ["One Size"],
    image: "/assets/products/wallet-1.jpg",
    gallery: ["/assets/products/wallet-1.jpg", "/assets/products/wallet-2.jpg"],
    featured: true,
    personalizable: true
  },
  {
    id: "wallet-raven-zip",
    slug: "raven-zip-wallet",
    name: "Raven Zip Wallet",
    category: "wallets",
    price: 21900,
    shortDescription: "Zip-around wallet with premium interior finishing.",
    description:
      "A generous zip wallet with segmented compartments and protective leather lining.",
    material: "Pebbled calf leather",
    craftsmanship: "Precision zipper assembly with hand-finished pull tab",
    leatherType: "Pebbled",
    colors: ["Raven", "Taupe"],
    sizes: ["One Size"],
    image: "/assets/products/wallet-3.jpg",
    gallery: ["/assets/products/wallet-3.jpg", "/assets/products/wallet-4.jpg"],
    personalizable: true
  },
  {
    id: "bag-lusso-weekender",
    slug: "lusso-weekender-bag",
    name: "Lusso Weekender",
    category: "bags",
    price: 78900,
    originalPrice: 85900,
    shortDescription: "Travel-ready luxury duffle with reinforced base.",
    description:
      "Built for discerning travel, Lusso features spacious compartments and hardware made for longevity.",
    material: "Full-grain leather with suede interior",
    craftsmanship: "Hand-stitched handles and reinforced corner binding",
    leatherType: "Full-Grain",
    colors: ["Chestnut", "Noir"],
    sizes: ["One Size"],
    image: "/assets/products/bag-1.jpg",
    gallery: ["/assets/products/bag-1.jpg", "/assets/products/bag-2.jpg"],
    featured: true,
    personalizable: true
  },
  {
    id: "bag-verona-tote",
    slug: "verona-tote-bag",
    name: "Verona Tote",
    category: "bags",
    price: 65900,
    shortDescription: "Structured tote for daily luxury utility.",
    description:
      "The Verona Tote blends understated form with premium carrying comfort and secure pocketing.",
    material: "Soft-grain leather",
    craftsmanship: "Rolled leather handles and lined interior pocketing",
    leatherType: "Soft-Grain",
    colors: ["Tan", "Dark Olive"],
    sizes: ["One Size"],
    image: "/assets/products/bag-3.jpg",
    gallery: ["/assets/products/bag-3.jpg", "/assets/products/bag-4.jpg"],
    personalizable: true
  },
  {
    id: "rug-palazzo-panel",
    slug: "palazzo-panel-rug",
    name: "Palazzo Panel Rug",
    category: "rugs",
    price: 119000,
    shortDescription: "Premium stitched-leather rug with geometric layout.",
    description:
      "A gallery-inspired rug composed of leather panels that add warmth and architectural depth.",
    material: "Premium leather panelwork",
    craftsmanship: "Panel alignment with hand-finished seam treatment",
    leatherType: "Nubuck",
    colors: ["Sandstone", "Charcoal"],
    sizes: ["6x8 ft", "8x10 ft"],
    image: "/assets/products/rug-1.jpg",
    gallery: ["/assets/products/rug-1.jpg", "/assets/products/rug-2.jpg"],
    featured: true,
    personalizable: false
  },
  {
    id: "rug-monaco-hide",
    slug: "monaco-hide-rug",
    name: "Monaco Hide Rug",
    category: "rugs",
    price: 99000,
    shortDescription: "Soft matte leather rug with sculpted border detailing.",
    description:
      "Monaco features carefully selected hides assembled for tonal harmony and refined texture.",
    material: "Natural matte leather hide",
    craftsmanship: "Expert hide matching and contour edge finishing",
    leatherType: "Matte Hide",
    colors: ["Cocoa", "Slate"],
    sizes: ["6x8 ft", "8x10 ft"],
    image: "/assets/products/rug-3.jpg",
    gallery: ["/assets/products/rug-3.jpg", "/assets/products/rug-4.jpg"],
    personalizable: false
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-full-grain-vs-top-grain",
    title: "Understanding Full-Grain vs Top-Grain Leather",
    excerpt:
      "Learn why grain selection changes durability, texture, and long-term character in luxury goods.",
    body: "Full-grain leather preserves the topmost fibers and gains a deep patina over time, while top-grain offers a smoother, more uniform surface. At ITALIAMS, product form, usage, and desired aging profile determine which leather we select.",
    date: "2026-06-22",
    readTime: "6 min",
    tags: ["Leather Types", "Material Science"],
    image: "/assets/blog/blog-1.jpg"
  },
  {
    slug: "care-guide-for-premium-leather",
    title: "Care Guide for Premium Leather Pieces",
    excerpt:
      "A practical care routine to preserve shape, sheen, and softness for years.",
    body: "Avoid prolonged moisture exposure, use a soft microfiber cloth weekly, and condition every 8-12 weeks with pH-balanced cream. Store products in breathable dust bags and keep hardware dry to protect finish.",
    date: "2026-06-29",
    readTime: "5 min",
    tags: ["Leather Care", "Maintenance"],
    image: "/assets/blog/blog-2.jpg"
  },
  {
    slug: "inside-our-craftsmanship-process",
    title: "Inside Our Craftsmanship Process",
    excerpt:
      "From hide selection to final polish, a look at how handmade quality is built.",
    body: "Each ITALIAMS piece starts with curated hides, then progresses through cutting, edge finishing, stitching, hardware fitment, and final inspection. Our workshop blends Italian technique with Pakistani artisan expertise.",
    date: "2026-07-05",
    readTime: "7 min",
    tags: ["Craftsmanship", "Behind the Scenes"],
    image: "/assets/blog/blog-3.jpg"
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "Do you ship all over Pakistan?",
    answer:
      "Yes. We deliver nationwide with tracked shipping and carefully protected packaging."
  },
  {
    question: "Can I personalize my leather item with initials?",
    answer:
      "Yes, eligible products support monogram personalization. Your entered initials are included in the order context."
  },
  {
    question: "How long does handmade production take?",
    answer:
      "Ready designs usually dispatch in 2-4 business days. Personalized pieces can take 5-8 business days."
  },
  {
    question: "How do returns work for personalized products?",
    answer:
      "Personalized products are final sale unless there is a quality concern. We inspect and resolve issues on priority."
  }
];

export const collectionHeroImages: Record<CategorySlug, string> = {
  belts: "/assets/banners/belt-hero.jpg",
  wallets: "/assets/banners/wallet-hero.jpg",
  bags: "/assets/banners/bag-hero.jpg",
  rugs: "/assets/banners/rug-hero.jpg"
};

export const homeHeroSlides = [
  "/assets/banners/hero-main.jpg",
  "/assets/banners/hero-alt-1.jpg",
  "/assets/banners/hero-alt-2.jpg"
];
