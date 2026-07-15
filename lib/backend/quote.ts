import { getProductById } from "@/lib/backend/catalog";
import { cleanPersonalization } from "@/lib/backend/validation";
import { CartQuote, CheckoutItemInput, QuoteLine } from "@/lib/types";

const BASE_SHIPPING = 450;
const FREE_SHIPPING_THRESHOLD = 90000;

export function quoteCart(inputItems: CheckoutItemInput[]): CartQuote {
  if (!Array.isArray(inputItems) || inputItems.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const lines: QuoteLine[] = inputItems.map((item) => {
    const product = getProductById(item.productId);
    if (!product) {
      throw new Error(`Invalid product: ${item.productId}`);
    }

    if (!item.size || !product.sizes.includes(item.size)) {
      throw new Error(`Invalid size for ${product.name}`);
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error(`Invalid quantity for ${product.name}`);
    }

    const personalization = cleanPersonalization(item.personalization);
    if (personalization && !product.personalizable) {
      throw new Error(`${product.name} does not support personalization.`);
    }
    if (personalization && personalization.length > 12) {
      throw new Error("Personalization must be 12 characters or less.");
    }

    return {
      productId: item.productId,
      size: item.size,
      name: product.name,
      image: product.image,
      quantity,
      unitPrice: product.price,
      personalization,
      lineTotal: product.price * quantity
    };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING;
  return {
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping
  };
}
