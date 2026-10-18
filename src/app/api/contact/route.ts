import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  budget?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  company: 160,
  budget: 80,
  message: 4000,
} as const;

function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= MAX_LENGTHS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isWithinLength(value: unknown, max: number): value is string {
  return isNonEmptyString(value) && value.trim().length <= max;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (
      !isWithinLength(body.name, MAX_LENGTHS.name) ||
      !isEmail(body.email) ||
      !isWithinLength(body.message, MAX_LENGTHS.message) ||
      (isNonEmptyString(body.company) && body.company.trim().length > MAX_LENGTHS.company) ||
      (isNonEmptyString(body.budget) && body.budget.trim().length > MAX_LENGTHS.budget)
    ) {
      return NextResponse.json(
        { ok: false, message: "Please check the required fields and try again." },
        { status: 400 },
      );
    }

    // No delivery or persistence integration is configured, so never claim that
    // a brief was received. The UI offers a direct email fallback instead.
    return NextResponse.json(
      { ok: false, message: "Contact delivery is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 400 },
    );
  }
}
