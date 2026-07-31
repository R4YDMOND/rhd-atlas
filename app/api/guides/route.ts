import { NextRequest, NextResponse } from "next/server";
import { listGuides, createGuide, getOrCreateDefaultAuthor } from "@/lib/services/content.service";
import { apiError } from "@/lib/api/errors";

export async function GET() {
  const guides = await listGuides();
  return NextResponse.json(guides);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const author = await getOrCreateDefaultAuthor();
    const guide = await createGuide({ ...body, authorId: author.id });
    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
