import { NextRequest, NextResponse } from "next/server";
import { listBuilds, createBuild, getOrCreateDefaultAuthor } from "@/lib/services/content.service";
import { apiError } from "@/lib/api/errors";

export async function GET() {
  const builds = await listBuilds();
  return NextResponse.json(builds);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const author = await getOrCreateDefaultAuthor();
    const build = await createBuild({ ...body, authorId: author.id });
    return NextResponse.json(build, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
