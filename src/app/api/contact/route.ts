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

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!isNonEmptyString(body.name) || !isEmail(body.email) || !isNonEmptyString(body.message)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Name, email, and message are required.",
        },
        { status: 400 },
      );
    }

    const submission = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: isNonEmptyString(body.company) ? body.company.trim() : "",
      budget: isNonEmptyString(body.budget) ? body.budget.trim() : "",
      message: body.message.trim(),
    };

    // Replace this with a transactional email provider before production launch.
    console.info("Contact form submission received", {
      email: submission.email,
      company: submission.company,
      budget: submission.budget,
    });

    return NextResponse.json(
      { ok: true, message: "Brief received. We'll be in touch within 2 business days." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
