import { NextRequest, NextResponse } from "next/server";
import { listNews, createNews, getOrCreateDefaultAuthor } from "@/lib/services/content.service";
import { apiError } from "@/lib/api/errors";

export async function GET() {
  const news = await listNews();
  return NextResponse.json(news);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const author = await getOrCreateDefaultAuthor();
    const news = await createNews({ ...body, authorId: author.id });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
