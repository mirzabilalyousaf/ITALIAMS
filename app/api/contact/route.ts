import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/backend/store";
import { isValidEmail } from "@/lib/backend/validation";

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
};

function badRequest(message: string) {
  return new NextResponse(message, { status: 400 });
}

export async function POST(req: Request) {
  const payload = (await req.json()) as ContactRequest;

  if (!payload.name || payload.name.trim().length < 2) {
    return badRequest("Please provide your name.");
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return badRequest("Please provide a valid email address.");
  }

  if (!payload.message || payload.message.trim().length < 10) {
    return badRequest("Please include a message with at least 10 characters.");
  }

  const ticketId = `CNT-${Date.now().toString().slice(-8)}`;
  await appendRecord("contact-inquiries", {
    ticketId,
    createdAt: new Date().toISOString(),
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim()
  });

  return NextResponse.json({
    status: "received",
    ticketId
  });
}
