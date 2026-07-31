import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "validation_error", issues: error.issues },
      { status: 400 }
    );
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2025"
  ) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  ) {
    return NextResponse.json(
      { error: "slug_conflict", message: "Такой slug уже используется" },
      { status: 409 }
    );
  }

  console.error(error);
  return NextResponse.json({ error: "internal_error" }, { status: 500 });
}
