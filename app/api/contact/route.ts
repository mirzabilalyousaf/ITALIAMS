import { NextResponse } from "next/server";

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

  if (!payload.email || !payload.email.includes("@")) {
    return badRequest("Please provide a valid email address.");
  }

  if (!payload.message || payload.message.trim().length < 10) {
    return badRequest("Please include a message with at least 10 characters.");
  }

  return NextResponse.json({
    status: "received"
  });
}
