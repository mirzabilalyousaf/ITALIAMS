import { NextResponse } from "next/server";
import { listProducts } from "@/lib/backend/catalog";

export async function GET() {
  return NextResponse.json({
    products: listProducts()
  });
}
