import { NextResponse } from "next/server";
import { CartItem } from "@/lib/types";

type CheckoutRequest = {
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    notes?: string;
  };
  items?: CartItem[];
  totals?: {
    subtotal?: number;
    shipping?: number;
    total?: number;
  };
};

function badRequest(message: string) {
  return new NextResponse(message, { status: 400 });
}

export async function POST(req: Request) {
  const payload = (await req.json()) as CheckoutRequest;

  if (!payload.customer) {
    return badRequest("Missing customer information.");
  }

  const required = ["fullName", "email", "phone", "address", "city"] as const;
  for (const field of required) {
    if (!payload.customer[field] || payload.customer[field]?.trim().length === 0) {
      return badRequest(`Missing required field: ${field}`);
    }
  }

  if (!payload.items || payload.items.length === 0) {
    return badRequest("Your cart is empty.");
  }

  for (const item of payload.items) {
    if (!item.productId || item.quantity < 1 || item.price < 1) {
      return badRequest("Invalid cart item payload.");
    }
    if (item.personalization && item.personalization.length > 12) {
      return badRequest("Personalization must be 12 characters or less.");
    }
  }

  const orderNumber = `ITM-${Date.now().toString().slice(-8)}`;
  return NextResponse.json({
    orderNumber,
    status: "confirmed"
  });
}
