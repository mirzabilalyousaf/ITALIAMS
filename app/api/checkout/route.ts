import { NextResponse } from "next/server";
import { quoteCart } from "@/lib/backend/quote";
import { appendRecord } from "@/lib/backend/store";
import { isValidEmail } from "@/lib/backend/validation";
import { CheckoutItemInput } from "@/lib/types";

type CheckoutRequest = {
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    notes?: string;
  };
  items?: CheckoutItemInput[];
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

  if (!isValidEmail(payload.customer.email ?? "")) {
    return badRequest("Please provide a valid email address.");
  }

  let quote;
  try {
    quote = quoteCart(payload.items ?? []);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : "Invalid checkout payload.");
  }

  const orderNumber = `ITM-${Date.now().toString().slice(-8)}`;
  await appendRecord("orders", {
    orderNumber,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    customer: {
      fullName: payload.customer.fullName?.trim(),
      email: payload.customer.email?.trim(),
      phone: payload.customer.phone?.trim(),
      address: payload.customer.address?.trim(),
      city: payload.customer.city?.trim(),
      notes: payload.customer.notes?.trim() || undefined
    },
    quote
  });

  return NextResponse.json({
    orderNumber,
    status: "confirmed",
    totals: {
      subtotal: quote.subtotal,
      shipping: quote.shipping,
      total: quote.total
    }
  });
}
