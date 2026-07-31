import { NextRequest, NextResponse } from "next/server";
import { updateBuild, deleteBuild } from "@/lib/services/content.service";
import { apiError } from "@/lib/api/errors";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const build = await updateBuild(id, body);
    return NextResponse.json(build);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await deleteBuild(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiError(error);
  }
}
