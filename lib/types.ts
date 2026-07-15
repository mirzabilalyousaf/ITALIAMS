export type CategorySlug = "belts" | "wallets" | "bags" | "rugs";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  material: string;
  craftsmanship: string;
  leatherType: string;
  colors: string[];
  sizes: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
  personalizable: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  personalization?: string;
};
