import { NextResponse } from "next/server";
import { quoteCart } from "@/lib/backend/quote";
import { CheckoutItemInput } from "@/lib/types";

type QuoteRequest = {
  items?: CheckoutItemInput[];
};

function badRequest(message: string) {
  return new NextResponse(message, { status: 400 });
}

export async function POST(req: Request) {
  const payload = (await req.json()) as QuoteRequest;
  try {
    const quote = quoteCart(payload.items ?? []);
    return NextResponse.json(quote);
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : "Unable to quote cart.");
  }
}
